import { NextResponse } from "next/server";
import { adminApiGuard } from "@/lib/admin/api";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024;

function safeSlug(raw: string) {
  return (
    raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

function extFromFile(file: File) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".png")) return "png";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "jpg";
  if (name.endsWith(".webp")) return "webp";
  if (file.type === "image/png") return "png";
  if (file.type === "image/jpeg") return "jpg";
  return "webp";
}

export async function POST(req: Request) {
  const guard = await adminApiGuard("catalogue");
  if (!guard.ok) return guard.response;

  const form = await req.formData();
  const file = form.get("file");
  const ref = String(form.get("ref") || form.get("productRef") || "product");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "not_image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 400 });
  }

  const slug = safeSlug(ref);
  const ext = extFromFile(file);
  const storagePath = `${slug}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (isSupabaseConfigured()) {
    const service = createServiceClient();
    if (!service) {
      return NextResponse.json({ error: "no_service_role" }, { status: 503 });
    }

    const { data: buckets } = await service.storage.listBuckets();
    if (!buckets?.some((b) => b.name === BUCKET)) {
      await service.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: MAX_BYTES,
      });
    }

    const { error } = await service.storage.from(BUCKET).upload(storagePath, bytes, {
      contentType: file.type || `image/${ext}`,
      upsert: true,
    });
    if (error) {
      console.error("[products/upload]", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: pub } = service.storage.from(BUCKET).getPublicUrl(storagePath);
    return NextResponse.json({ ok: true, url: pub.publicUrl, path: pub.publicUrl });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "supabase_required" }, { status: 503 });
  }

  const dir = path.join(process.cwd(), "public", "products");
  await mkdir(dir, { recursive: true });
  const localName = `${slug}.${ext}`;
  await writeFile(path.join(dir, localName), bytes);
  const publicPath = `/products/${localName}`;
  return NextResponse.json({ ok: true, url: publicPath, path: publicPath });
}

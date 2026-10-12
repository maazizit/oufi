import { ensureAdminPage } from "@/lib/admin/guard";
import { getProducts } from "@/lib/data/repository";
import { CATS } from "@/lib/data/constants";
import { AdminCatalogClient } from "@/components/admin/AdminCatalogClient";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminCatalogPage() {
  await ensureAdminPage("catalogue");
  const products = await getProducts(false);
  return (
    <>
      <AdminTopbar titleKey="adm_page_catalogue" />
      <div className="content">
        <AdminCatalogClient
          products={products}
          categories={CATS.map((c) => ({ id: c.id, label: c.fr }))}
        />
      </div>
    </>
  );
}

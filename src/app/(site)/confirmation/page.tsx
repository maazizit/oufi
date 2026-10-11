import { Suspense } from "react";
import { ConfirmClient } from "@/components/site/ConfirmClient";
import { getRequest, getSettings } from "@/lib/data/repository";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Confirmation",
  description: "Confirmation de votre demande AMANPLANET.",
  path: "/confirmation",
  noIndex: true,
});

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const sp = await searchParams;
  const ref = sp.ref?.trim() || "";
  const [settings, request] = await Promise.all([
    getSettings(),
    ref ? getRequest(ref) : Promise.resolve(null),
  ]);
  return (
    <Suspense>
      <ConfirmClient settings={settings} request={request} refParam={ref || undefined} />
    </Suspense>
  );
}

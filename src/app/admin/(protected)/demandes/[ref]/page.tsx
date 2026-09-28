import { getProducts, getRequest, getSettings, getTeam } from "@/lib/data/repository";
import { DemandeDetailClient } from "@/components/admin/DemandeDetailClient";

export default async function DemandeDetailPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const [request, products, team, settings] = await Promise.all([
    getRequest(ref),
    getProducts(false),
    getTeam(false),
    getSettings(),
  ]);

  return (
    <DemandeDetailClient
      refId={ref}
      initial={request}
      products={products}
      team={team}
      settings={settings}
    />
  );
}

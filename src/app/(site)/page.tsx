import { getProducts, getSettings, getTeam } from "@/lib/data/repository";
import { BRANDS, SECTORS, SVCS } from "@/lib/data/constants";
import { HomeClient } from "@/components/site/HomeClient";
import { JsonLd } from "@/components/site/JsonLd";
import { localBusinessJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Installation caméras & réseau à Casablanca",
  description:
    "AMANPLANET installe caméras, réseau, domotique et alarmes à Casablanca. Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite.",
  path: "/",
});

export default async function HomePage() {
  const [settings, products, team] = await Promise.all([
    getSettings(),
    getProducts(true),
    getTeam(true),
  ]);
  const featured = products.slice().sort((a, b) => b.pop - a.pop).slice(0, 4);
  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      <HomeClient
        settings={settings}
        featured={featured}
        team={team}
        brands={BRANDS}
        sectors={SECTORS}
        services={SVCS.map((s) => ({ ...s, anchor: s.id }))}
      />
    </>
  );
}

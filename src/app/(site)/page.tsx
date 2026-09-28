import { getProducts, getSettings, getTeam } from "@/lib/data/repository";
import { BRANDS, SECTORS, SVCS } from "@/lib/data/constants";
import { HomeClient } from "@/components/site/HomeClient";

export default async function HomePage() {
  const [settings, products, team] = await Promise.all([
    getSettings(),
    getProducts(true),
    getTeam(true),
  ]);
  const featured = products.slice().sort((a, b) => b.pop - a.pop).slice(0, 4);
  return (
    <HomeClient
      settings={settings}
      featured={featured}
      team={team}
      brands={BRANDS}
      sectors={SECTORS}
      services={SVCS}
    />
  );
}

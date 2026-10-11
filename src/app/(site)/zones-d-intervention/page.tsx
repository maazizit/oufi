import Link from "next/link";
import { CITY_PAGES } from "@/lib/seo/cities";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, SeoCta } from "@/components/site/SeoArticleLayout";

export const metadata = pageMeta({
  title: "Zones d’intervention — tout le Maroc",
  description:
    "AMANPLANET intervient dans tout le Maroc depuis Marrakech : Casa, Rabat, Tanger, Agadir, Fès et plus. Voir les pages villes.",
  path: "/zones-d-intervention",
});

export default function ZonesPage() {
  const p1 = CITY_PAGES.filter((c) => c.priority === 1);
  const p2 = CITY_PAGES.filter((c) => c.priority === 2);
  const p3 = CITY_PAGES.filter((c) => c.priority === 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Zones d’intervention", path: "/zones-d-intervention" },
        ])}
      />
      <section className="sec wrap" style={{ maxWidth: 900 }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Accueil" },
            { href: "/zones-d-intervention", label: "Zones" },
          ]}
        />
        <h1>Zones d’intervention — tout le Maroc</h1>
        <p className="lead" style={{ marginTop: 12, lineHeight: 1.65 }}>
          Siège à Marrakech. Nous planifions les tournées vers les grandes villes et
          le reste du territoire. Chaque page ville détaille le contexte local — pas
          de contenu dupliqué.
        </p>
        <Group title="Siège" cities={p1} />
        <Group title="Grandes villes" cities={p2} />
        <Group title="Autres villes desservies" cities={p3} />
        <SeoCta />
      </section>
    </>
  );
}

function Group({
  title,
  cities,
}: {
  title: string;
  cities: typeof CITY_PAGES;
}) {
  return (
    <div style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 18 }}>{title}</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 8,
          listStyle: "none",
          padding: 0,
          marginTop: 12,
        }}
      >
        {cities.map((c) => (
          <li key={c.slug}>
            <Link className="li" href={`/villes/${c.slug}`}>
              {c.name.fr}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

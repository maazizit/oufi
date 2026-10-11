import { notFound } from "next/navigation";
import Link from "next/link";
import { CITY_PAGES, getCity } from "@/lib/seo/cities";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMeta,
  serviceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, SeoCta } from "@/components/site/SeoArticleLayout";

type Props = { params: Promise<{ ville: string }> };

export function generateStaticParams() {
  return CITY_PAGES.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) return {};
  return pageMeta({
    title: city.metaTitle.fr,
    description: city.metaDesc.fr,
    path: `/villes/${city.slug}`,
  });
}

export default async function CityPage({ params }: Props) {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) notFound();

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Installation caméras à ${city.name.fr}`,
          description: city.metaDesc.fr,
          path: `/villes/${city.slug}`,
        })}
      />
      <JsonLd
        data={faqJsonLd(city.faq.map((f) => ({ q: f.q.fr, a: f.a.fr })))}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Zones", path: "/zones-d-intervention" },
          { name: city.name.fr, path: `/villes/${city.slug}` },
        ])}
      />
      <article className="sec wrap" style={{ maxWidth: 820 }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Accueil" },
            { href: "/zones-d-intervention", label: "Zones" },
            { href: `/villes/${city.slug}`, label: city.name.fr },
          ]}
        />
        <h1>{city.h1.fr}</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          {city.lead.fr}
        </p>
        {city.paragraphs.fr.map((p) => (
          <p key={p.slice(0, 28)} style={{ marginTop: 14, lineHeight: 1.65 }}>
            {p}
          </p>
        ))}
        <h2 style={{ marginTop: 28, fontSize: 20 }}>Spécificités locales</h2>
        <ul style={{ marginTop: 10, paddingInlineStart: 20, lineHeight: 1.7 }}>
          {city.localAngles.fr.map((a) => (
            <li key={a.slice(0, 20)}>{a}</li>
          ))}
        </ul>
        <h2 style={{ marginTop: 28, fontSize: 20 }}>FAQ {city.name.fr}</h2>
        <dl style={{ marginTop: 10 }}>
          {city.faq.map((f) => (
            <div key={f.q.fr} style={{ marginBottom: 14 }}>
              <dt style={{ fontWeight: 650 }}>{f.q.fr}</dt>
              <dd className="muted" style={{ marginTop: 4 }}>
                {f.a.fr}
              </dd>
            </div>
          ))}
        </dl>
        <SeoCta />
        <p className="sm muted" style={{ marginTop: 20 }}>
          <Link href="/installation-camera-surveillance">Caméras</Link> ·{" "}
          <Link href="/reseau-informatique">Réseau</Link> ·{" "}
          <Link href="/zones-d-intervention">Toutes les villes</Link>
        </p>
      </article>
    </>
  );
}

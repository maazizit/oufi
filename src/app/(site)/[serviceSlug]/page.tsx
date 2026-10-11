import { notFound } from "next/navigation";
import Link from "next/link";
import { getService, SERVICE_PAGES } from "@/lib/seo/services";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMeta,
  serviceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, SeoCta } from "@/components/site/SeoArticleLayout";
import { money } from "@/lib/data/i18n";

type Props = { params: Promise<{ serviceSlug: string }> };

const SLUGS = new Set(SERVICE_PAGES.map((s) => s.slug));

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug } = await params;
  const svc = getService(serviceSlug);
  if (!svc) return {};
  return pageMeta({
    title: svc.metaTitle.fr,
    description: svc.metaDesc.fr,
    path: `/${svc.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  if (!SLUGS.has(serviceSlug)) notFound();
  const svc = getService(serviceSlug)!;
  const lang = "fr" as const;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: svc.title.fr,
          description: svc.metaDesc.fr,
          path: `/${svc.slug}`,
          priceFrom: svc.priceFrom,
        })}
      />
      <JsonLd
        data={faqJsonLd(
          svc.faq.map((f) => ({ q: f.q.fr, a: f.a.fr })),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: svc.title.fr, path: `/${svc.slug}` },
        ])}
      />
      <article className="sec wrap" style={{ maxWidth: 820 }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Accueil" },
            { href: "/services", label: "Services" },
            { href: `/${svc.slug}`, label: svc.title.fr },
          ]}
        />
        <h1>{svc.h1.fr}</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          {svc.intro.fr}
        </p>
        <p className="sm muted" style={{ marginTop: 8 }}>
          À partir de {money(lang, svc.priceFrom)} TTC (indicatif, hors contraintes site)
        </p>
        {svc.body.fr.map((p) => (
          <p key={p.slice(0, 24)} style={{ marginTop: 14, lineHeight: 1.65 }}>
            {p}
          </p>
        ))}
        <h2 style={{ marginTop: 28, fontSize: 20 }}>Étapes</h2>
        <ol style={{ marginTop: 10, paddingInlineStart: 20, lineHeight: 1.7 }}>
          {svc.steps.map((s) => (
            <li key={s.fr}>{s.fr}</li>
          ))}
        </ol>
        <h2 style={{ marginTop: 28, fontSize: 20 }}>FAQ</h2>
        <dl style={{ marginTop: 10 }}>
          {svc.faq.map((f) => (
            <div key={f.q.fr} style={{ marginBottom: 14 }}>
              <dt style={{ fontWeight: 650 }}>{f.q.fr}</dt>
              <dd className="muted" style={{ marginTop: 4, lineHeight: 1.55 }}>
                {f.a.fr}
              </dd>
            </div>
          ))}
        </dl>
        <SeoCta />
        <p className="sm muted" style={{ marginTop: 20 }}>
          Voir aussi :{" "}
          <Link href="/zones-d-intervention">zones d’intervention</Link> ·{" "}
          <Link href="/villes/marrakech">Marrakech</Link> ·{" "}
          <Link href="/catalogue">catalogue</Link>
        </p>
      </article>
    </>
  );
}

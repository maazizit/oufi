import Link from "next/link";
import { BLOG_POSTS, BLOG_TOPICS_PROPOSED } from "@/lib/seo/blog";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/site/SeoArticleLayout";

export const metadata = pageMeta({
  title: "Blog sécurité & réseau — AMANPLANET",
  description:
    "Guides pratiques : prix caméras 2026, IP vs analogique, dimensionnement villa/riad Marrakech. Conseils AMANPLANET.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <section className="sec wrap" style={{ maxWidth: 820 }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Accueil" },
            { href: "/blog", label: "Blog" },
          ]}
        />
        <h1>Blog — sécurité, réseau, installation</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          Articles utiles pour préparer votre projet au Maroc (FR + AR sur les
          contenus publiés).
        </p>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
          {BLOG_POSTS.map((p) => (
            <li
              key={p.slug}
              style={{
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--line, #e5e5e5)",
              }}
            >
              <Link href={`/blog/${p.slug}`} style={{ fontWeight: 650, fontSize: 18 }}>
                {p.title.fr}
              </Link>
              <p className="sm muted" style={{ marginTop: 6 }}>
                {p.date} — {p.excerpt.fr}
              </p>
            </li>
          ))}
        </ul>
        <h2 style={{ fontSize: 18, marginTop: 36 }}>Sujets à venir</h2>
        <ol style={{ marginTop: 10, lineHeight: 1.7 }}>
          {BLOG_TOPICS_PROPOSED.slice(3).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>
    </>
  );
}

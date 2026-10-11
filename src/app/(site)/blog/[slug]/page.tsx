import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/seo/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, SeoCta } from "@/components/site/SeoArticleLayout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title.fr,
    description: post.metaDesc.fr,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title.fr, path: `/blog/${post.slug}` },
        ])}
      />
      <article className="sec wrap" style={{ maxWidth: 760 }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Accueil" },
            { href: "/blog", label: "Blog" },
            { href: `/blog/${post.slug}`, label: post.title.fr },
          ]}
        />
        <p className="sm muted">{post.date}</p>
        <h1 style={{ marginTop: 8 }}>{post.title.fr}</h1>
        {post.body.fr.map((p) => (
          <p key={p.slice(0, 30)} style={{ marginTop: 14, lineHeight: 1.7 }}>
            {p}
          </p>
        ))}
        <h2 style={{ marginTop: 32, fontSize: 18 }} lang="ar" dir="rtl">
          {post.title.ar}
        </h2>
        {post.body.ar.map((p) => (
          <p
            key={p.slice(0, 30)}
            lang="ar"
            dir="rtl"
            style={{ marginTop: 12, lineHeight: 1.85 }}
          >
            {p}
          </p>
        ))}
        <SeoCta />
      </article>
    </>
  );
}

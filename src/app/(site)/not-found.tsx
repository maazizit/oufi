import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sec wrap" style={{ maxWidth: 560, textAlign: "center" }}>
      <h1>Page introuvable</h1>
      <p className="muted" style={{ marginTop: 12 }}>
        Cette adresse n’existe pas ou a été déplacée.
      </p>
      <div className="cta" style={{ marginTop: 24, justifyContent: "center" }}>
        <Link href="/" className="btn btn-pri">
          Accueil
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact
        </Link>
      </div>
    </section>
  );
}

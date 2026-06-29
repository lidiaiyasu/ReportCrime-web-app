import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-6)",
        background: "var(--color-bg)",
      }}
    >
      <h1 style={{ fontSize: "2.4rem", color: "var(--color-navy-700)" }}>
        404
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#444", margin: "12px 0 24px" }}>
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link href="/" className="cta-button">
        Back to Home
      </Link>
    </main>
  );
}

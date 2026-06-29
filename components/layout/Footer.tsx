import Image from "next/image";
import Link from "next/link";

export default function Footer({ active }: { active?: "about" }) {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <Image
            src="/images/logo.png"
            alt="Ethiopian Federal Police Logo"
            style={{ width: 48, verticalAlign: "middle" }}
            width={48}
            height={45}
          />
          <span
            style={{
              color: "rgb(225, 209, 169)",
              fontWeight: "bold",
              marginLeft: 8,
            }}
          >
            Ethiopian Federal Police
          </span>
        </div>
        <div className="footer-links" style={{ margin: 12, color: "#ffe066" }}>
          <Link href="/">Home</Link> | <Link href="/report">Report Crime</Link>{" "}
          | <Link href="/police-dashboard">Police Portal</Link> |{" "}
          <Link href="/about" className={active === "about" ? "active" : ""}>
            About
          </Link>
        </div>
        <div
          className="footer-contact"
          style={{ fontSize: "0.98rem", color: "#ffe066" }}
        >
          Emergency? Call <strong>991</strong> &nbsp;|&nbsp; Email:{" "}
          <a href="mailto:info@fedpolice.et" style={{ color: "#ffe066" }}>
            info@fedpolice.et
          </a>
        </div>
        <div
          className="footer-copy"
          style={{ marginTop: 10, fontSize: "0.95rem" }}
        >
          &copy; {new Date().getFullYear()} Ethiopian Federal Police - All
          Rights Reserved
        </div>
      </div>
    </footer>
  );
}

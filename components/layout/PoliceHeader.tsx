"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SessionUser } from "@/lib/types";

export default function PoliceHeader({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <header className="header">
      <div className="logo-cont">
        <Image
          src="/images/logo.png"
          alt="Ethiopian Federal Police logo"
          className="logo"
          width={82}
          height={77}
          style={{ width: 50, height: 50 }}
        />
        <span className="institute-name" style={{ fontSize: "1rem" }}>
          የኢትዮጵያ ፌደራል ፖሊስ <br />
          Ethiopian Federal Police
        </span>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="officer-nav"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
      </button>

      <nav
        id="officer-nav"
        className={`nav-links site-nav ${isOpen ? "is-open" : ""}`}
        style={{ display: "flex", alignItems: "center", gap: 20 }}
      >
        <Link href="/police-dashboard">Dashboard</Link>
        <Link href="/register-crime">Register Crime</Link>
        <Link href="/search-reports">Search / Reports</Link>
        <span style={{ marginLeft: 10, fontSize: "0.9rem", opacity: 0.85 }}>
          {user.name} · {user.role}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.5)",
            color: "white",
            borderRadius: 5,
            padding: "6px 14px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </header>
  );
}

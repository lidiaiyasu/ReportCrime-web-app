"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavKey = "home" | "report" | "police" | "about";

export default function Header({ active }: { active?: NavKey }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="logo-cont">
        <Image
          src="/images/logo.png"
          alt="Ethiopian Federal Police logo"
          className="logo"
          width={82}
          height={77}
        />
        <span className="institute-name">
          የኢትዮጵያ ፌደራል ፖሊስ <br />
          Ethiopian Federal Police
        </span>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
      </button>

      <nav
        id="site-nav"
        className={`site-nav ${isOpen ? "is-open" : ""}`}
      >
        <ul className="nav links">
          <li>
            <Link href="/" className={active === "home" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/report"
              className={active === "report" ? "active" : ""}
            >
              Report Crime
            </Link>
          </li>
          <li>
            <Link
              href="/police-dashboard"
              className={active === "police" ? "active" : ""}
            >
              Police Portal
            </Link>
          </li>
          <li>
            <Link href="/about" className={active === "about" ? "active" : ""}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

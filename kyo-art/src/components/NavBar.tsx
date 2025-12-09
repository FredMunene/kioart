"use client";

import Link from "next/link";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Browse" },
  { href: "/dashboard", label: "Dashboard" }
];

export function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <Image
          src="/kioart-white.png"
          alt="kyo-art logo"
          className="site-logo site-logo--circle"
          width={40}
          height={40}
          priority
        />
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </div>
      <AuthButton />
    </nav>
  );
}

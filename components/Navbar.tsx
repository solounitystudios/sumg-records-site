"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Artists", href: "/artists" },
  { label: "Producers", href: "/producers" },
  { label: "Merch", href: "/merch" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fafaf8] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium text-black group-hover:opacity-60 transition-opacity duration-200">
            SUMG
          </span>
          <span className="text-[9px] tracking-[0.28em] uppercase text-neutral-400 group-hover:opacity-60 transition-opacity duration-200">
            Records
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 -mr-1"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-5 bg-black transition-transform duration-200 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-black transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-black transition-transform duration-200 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-[#fafaf8]">
          <nav
            aria-label="Mobile navigation"
            className="max-w-7xl mx-auto px-6 py-7 flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

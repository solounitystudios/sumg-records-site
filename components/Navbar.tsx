"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks } from "@/data/navigation";

const storefrontNavLinks = [
  { label: "Hub", href: "/merch" },
  { label: "Woronoff", href: "/merch/woronoff" },
  { label: "Unity Supply", href: "/merch/unity-supply" },
  { label: "Moon Spell", href: "/merch/moon-spell" },
  { label: "Concrete Borough", href: "/merch/concrete-borough" },
  { label: "Salt Current", href: "/merch/salt-current" },
  { label: "Cart", href: "/merch/cart" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inMerchStorefront = pathname.startsWith("/merch");

  useEffect(() => {
    if (!panelRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.killTweensOf(panelRef.current);
    gsap.to(panelRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (pathname.startsWith(`${href}/`) && href !== "/");
  const visibleNavLinks = inMerchStorefront ? storefrontNavLinks : navLinks;

  return (
    <header className="sticky top-0 z-50 bg-[#0f1012]/90 backdrop-blur border-b border-neutral-700/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="group flex flex-col leading-none">
          {inMerchStorefront ? (
            <>
              <span className="text-[11px] tracking-[0.28em] uppercase font-medium text-white group-hover:opacity-75 transition-opacity duration-200">
                Storefronts
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-neutral-500 group-hover:opacity-70 transition-opacity duration-200">
                Fashion
              </span>
            </>
          ) : (
            <>
              <span className="text-[11px] tracking-[0.28em] uppercase font-medium text-white group-hover:opacity-75 transition-opacity duration-200">
                SUMG
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-neutral-500 group-hover:opacity-70 transition-opacity duration-200">
                Records
              </span>
            </>
          )}
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-10">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-white"
                  : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1 -mr-1"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-5 bg-white transition-transform duration-200 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-transform duration-200 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        ref={panelRef}
        className="md:hidden border-t border-neutral-700/40 bg-[#0f1012] overflow-hidden h-0 opacity-0"
      >
        <nav aria-label="Mobile navigation" className="max-w-7xl mx-auto px-6 py-7 flex flex-col gap-5">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-white"
                  : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

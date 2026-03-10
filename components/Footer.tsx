"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerUtilityLinks, navLinks } from "@/data/navigation";
import { labelProfile } from "@/data/label";
import { toDisplayLabel } from "@/lib/text";

const storefrontFooterLinks = [
  { label: "Hub", href: "/merch" },
  { label: "Woronoff", href: "/merch/woronoff" },
  { label: "Unity Standard", href: "/merch/unity-standard" },
  { label: "Moon Spell", href: "/merch/moon-spell" },
  { label: "Concrete Borough", href: "/merch/concrete-borough" },
  { label: "Salt Current", href: "/merch/salt-current" },
  { label: "Cart", href: "/merch/cart" },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const inMerchStorefront = pathname.startsWith("/merch");
  const footerLinks = inMerchStorefront ? storefrontFooterLinks : [...navLinks, ...footerUtilityLinks];

  return (
    <footer className="bg-[#090a0b] text-white border-t border-neutral-800/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-10 pb-10 border-b border-neutral-800/70">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase font-medium">
              {inMerchStorefront ? "Fashion Storefronts" : labelProfile.name}
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mt-1.5">
              {inMerchStorefront ? "Independent labels" : "Solounity Music Group"}
            </p>
            <p className="mt-5 text-sm text-neutral-400 leading-relaxed max-w-sm">
              {inMerchStorefront
                ? "Multi-brand storefront platform with standalone catalogs, variant selection, and cart-ready purchasing."
                : labelProfile.shortStatement}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3 content-start">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
              {inMerchStorefront ? "Explore" : "Follow"}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {inMerchStorefront ? (
                <>
                  <Link
                    href="/merch"
                    className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800 px-3 py-2 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors duration-200"
                  >
                    Brand hub
                  </Link>
                  <Link
                    href="/merch/cart"
                    className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800 px-3 py-2 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors duration-200"
                  >
                    Cart
                  </Link>
                </>
              ) : (
                Object.entries(labelProfile.socials).map(([platform, href]) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800 px-3 py-2 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors duration-200"
                  >
                    {toDisplayLabel(platform)}
                  </a>
                ))
              )}
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              {inMerchStorefront
                ? "Checkout flow can be connected to Shopify Storefront API."
                : "Newsletter signup available on homepage and contact."}
            </p>
          </div>
        </div>

        <p className="text-[10px] text-neutral-700 tracking-wider mt-6">
          {inMerchStorefront
            ? `© ${year} Storefront platform. All rights reserved.`
            : `© ${year} SUMG Records. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}

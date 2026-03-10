import Link from "next/link";
import { footerUtilityLinks, navLinks } from "@/data/navigation";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#090a0b] text-white border-t border-neutral-800/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-10 pb-10 border-b border-neutral-800/70">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase font-medium">
              SUMG Records
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mt-1.5">
              Solounity Music Group
            </p>
            <p className="mt-5 text-sm text-neutral-400 leading-relaxed max-w-sm">
              Record label, creative studio, and future-facing cultural platform.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3 content-start">
            {[...navLinks, ...footerUtilityLinks].map((link) => (
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
              Follow
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800 px-3 py-2 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              Newsletter signup available on homepage and contact.
            </p>
          </div>
        </div>

        <p className="text-[10px] text-neutral-700 tracking-wider mt-6">
          &copy; {year} SUMG Records. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

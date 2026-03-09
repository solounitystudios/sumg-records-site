import Link from "next/link";

const footerLinks = [
  { label: "Artists", href: "/artists" },
  { label: "Producers", href: "/producers" },
  { label: "Merch", href: "/merch" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-neutral-800">
          {/* Brand */}
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase font-medium text-white">
              SUMG Records
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-600 mt-1.5">
              Solounity Music Group
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
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
        </div>

        <p className="text-[10px] text-neutral-700 tracking-wider mt-6">
          &copy; {year} SUMG Records. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

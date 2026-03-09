import Link from "next/link";

const footerLinks = [
  { label: "Artists", href: "/artists" },
  { label: "Producers", href: "/producers" },
  { label: "Merch", href: "/merch" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-black">
            SUMG Records
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Solounity Music Group
          </p>
        </div>

        <ul className="flex flex-wrap gap-6">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-medium tracking-widest uppercase text-neutral-500 hover:text-black transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} SUMG Records. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";

const NAV_LINKS = [
  { label: "Conversion Architecture", href: "/#conversion-architecture" },
  { label: "Customer Generation", href: "/#customer-generation" },
  { label: "Revenue Generation", href: "/#revenue-generation" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
        >
          oonee
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#cta"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent hover:text-white"
        >
          Scopri il potenziale →
        </Link>
      </div>
    </header>
  );
}

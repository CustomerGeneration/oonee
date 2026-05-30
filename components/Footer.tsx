import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
          >
            oonee
          </Link>
          <p className="mt-4 text-sm text-white/40">
            © 2026 Oonee. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/60 md:items-end">
          <a
            href="mailto:info@customergeneration.it"
            className="transition-colors hover:text-white"
          >
            info@customergeneration.it
          </a>
          {/* TODO: inserire la P.IVA reale di Ad Maiora SRLS */}
          <p className="text-white/40">P.IVA Ad Maiora SRLS — [da inserire]</p>
        </div>
      </Container>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "blog oonee — idee per chi vende online",
  description:
    "Articoli su Conversion Architecture, Customer Generation, ecommerce e iper-personalizzazione. Idee concrete per chi vende online davvero.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title: "blog oonee",
    description: "Idee per chi vende online davvero.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          blog oonee
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Idee per chi vende online davvero.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60">
          Conversion Architecture, Customer Generation, ecommerce e
          iper-personalizzazione. Analisi e dati, senza fuffa.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:border-accent/40 hover:shadow-[0_0_50px_-20px_rgba(0,153,204,0.5)]"
            >
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-white/5">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold leading-snug tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-accent">
                  Leggi l&apos;articolo →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

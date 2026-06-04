import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getLatestPosts } from "@/lib/blog";

/**
 * Sezione Blog in home: ultimi articoli + link al blog.
 */
export default function ServiziSecondari() {
  const posts = getLatestPosts(3);

  return (
    <section className="border-t border-white/5 bg-[#050810] py-16 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                blog oonee
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/60">
                Idee per chi vende online davvero.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-base font-semibold text-accent underline-offset-8 transition-colors hover:underline"
            >
              Vai al blog →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:border-accent/40 hover:shadow-[0_0_50px_-20px_rgba(0,153,204,0.5)]"
              >
                <div className="relative aspect-[1200/630] w-full overflow-hidden bg-white/5">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold leading-snug tracking-tight">
                    {post.title}
                  </h3>
                  <span className="mt-4 text-sm font-semibold text-accent">
                    Leggi →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

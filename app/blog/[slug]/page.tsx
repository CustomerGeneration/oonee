import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { formatDate, getAllSlugs, getPostBySlug } from "@/lib/blog";

const SITE = "https://www.oonee.it";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE}${encodeURI(post.cover)}`,
    ...(post.date
      ? { datePublished: post.date, dateModified: post.date }
      : {}),
    author: { "@type": "Organization", name: "oonee", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "oonee",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "blog", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE}/blog/${slug}`,
      },
    ],
  };

  return (
    <article className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-white/50 transition-colors hover:text-white"
        >
          ← blog oonee
        </Link>

        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-white/40">
          di {post.author}
          {post.date && (
            <>
              {" · "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </>
          )}
        </p>

        <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className="blog-content mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* CTA finale */}
        <div className="mt-14 rounded-2xl border border-accent/30 bg-white/[0.02] p-8 text-center shadow-[0_0_70px_-30px_rgba(0,153,204,0.6)]">
          <p className="text-lg font-semibold">
            Vuoi capire se la Conversion Architecture può funzionare per te?
          </p>
          <Link
            href="/survey"
            className="mt-5 inline-flex min-h-[48px] items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.98]"
          >
            Inizia l&apos;analisi →
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />
    </article>
  );
}

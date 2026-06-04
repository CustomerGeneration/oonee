import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogMeta = {
  slug: string;
  title: string;
  description: string; // meta_description
  cover: string; // /blog/cover-<slug>.jpg
  date: string; // ISO YYYY-MM-DD (stringa vuota se assente)
  focusKeyword?: string;
  relatedQueries: string[];
  author: string;
  order: number; // dall'ordine del file (articolo-N)
};

/** Data formattata in italiano, es. "28 maggio 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export type BlogPost = BlogMeta & { html: string };

function fileOrder(filename: string): number {
  const m = filename.match(/articolo-(\d+)/);
  return m ? parseInt(m[1], 10) : 999;
}

function listFiles(): string[] {
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function parseFile(filename: string): { meta: BlogMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = String(data.slug ?? "").trim();
  return {
    meta: {
      slug,
      title: String(data.title ?? ""),
      description: String(data.meta_description ?? ""),
      // le cover reali sono nominate cover-<slug>.jpg (il cover_image del frontmatter è impreciso)
      cover: `/blog/cover-${slug}.jpg`,
      date: data.date ? String(data.date) : "",
      focusKeyword: data.focus_keyword
        ? String(data.focus_keyword)
        : undefined,
      relatedQueries: Array.isArray(data.related_queries)
        ? data.related_queries.map(String)
        : [],
      author: String(data.author ?? "oonee"),
      order: fileOrder(filename),
    },
    content,
  };
}

export function getAllPosts(): BlogMeta[] {
  return listFiles()
    .map((f) => parseFile(f).meta)
    .sort(
      (a, b) =>
        // più recenti prima (per data), fallback all'ordine del file
        b.date.localeCompare(a.date) || a.order - b.order,
    );
}

export function getLatestPosts(n: number): BlogMeta[] {
  return getAllPosts().slice(0, n);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = listFiles().find((f) => parseFile(f).meta.slug === slug);
  if (!file) return null;
  const { meta, content } = parseFile(file);
  // rimuovo il primo H1 del corpo (è il duplicato del title, che renderizziamo a parte)
  const body = content.replace(/^\s*#\s+.*(\r?\n)+/, "");
  const html = marked.parse(body, { async: false }) as string;
  return { ...meta, html };
}

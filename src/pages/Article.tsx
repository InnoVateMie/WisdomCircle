import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Share2, BookmarkPlus, Clock, Quote } from "lucide-react";
import { useGetContent } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = {
  life: "bg-violet-100 text-violet-700",
  career: "bg-blue-100 text-blue-700",
  academics: "bg-emerald-100 text-emerald-700",
  relationships: "bg-pink-100 text-pink-700",
  marriage: "bg-red-100 text-red-700",
  spiritual_growth: "bg-amber-100 text-amber-700",
};

export default function Article() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const { data: article, isLoading, error } = useGetContent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary h-72" />
        <div className="mx-auto max-w-3xl px-4 -mt-20 relative z-10 pb-24">
          <div className="bg-card rounded-3xl shadow-xl border border-border p-10 space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-5 w-1/3" />
            <div className="pt-8 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className={`h-4 ${i === 3 ? "w-5/6" : "w-full"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📄</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">This article may have been removed or the link is broken.</p>
          <Link href="/content">
            <Button className="rounded-full bg-primary text-white gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Content Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = article.body.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden pt-20 pb-40">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/6 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/content">
              <div className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm font-medium mb-8 group cursor-pointer">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Content Hub
              </div>
            </Link>

            <Badge className={`${categoryColors[article.category] || "bg-white/20 text-white"} border-0 font-bold uppercase tracking-widest px-4 py-1.5 text-xs rounded-full mb-6 inline-block`}>
              {article.category.replace("_", " ")}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-white font-bold border border-white/20">
                  {article.authorName.charAt(0)}
                </div>
                <span className="text-white/80 font-medium">{article.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <time>{format(new Date(article.createdAt), "MMMM d, yyyy")}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Card */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="bg-card rounded-3xl shadow-2xl border border-border/40 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-border/40">
            <p className="text-xs text-muted-foreground font-medium">{wordCount} words · {readTime} min read</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-primary gap-1.5 text-xs h-8 px-3">
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-primary gap-1.5 text-xs h-8 px-3">
                <BookmarkPlus className="h-3.5 w-3.5" /> Save
              </Button>
            </div>
          </div>

          <div className="px-8 md:px-12 py-10">
            {/* Excerpt / Pull quote */}
            <div className="relative pl-6 mb-10 border-l-4 border-secondary">
              <Quote className="absolute -left-1 -top-1 h-5 w-5 text-secondary/50" />
              <p className="text-lg text-muted-foreground font-medium italic leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Body */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-primary prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-secondary prose-strong:text-primary prose-li:text-foreground/80">
              <div className="whitespace-pre-wrap text-base leading-8 text-foreground/80">
                {article.body}
              </div>
            </div>
          </div>

          {/* Author card */}
          <div className="mx-8 md:mx-12 mb-10 p-6 rounded-2xl bg-primary/4 border border-border/40">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-primary">{article.authorName}</p>
                <p className="text-sm text-muted-foreground">Author · The Wisdom Circle</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to hub */}
        <div className="mt-8 text-center">
          <Link href="/content">
            <Button variant="outline" className="rounded-full gap-2 border-border/60 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4" /> Back to Content Hub
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

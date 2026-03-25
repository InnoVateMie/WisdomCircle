import { useState } from "react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { BookOpen, ChevronRight, Search, Sparkles, Briefcase, GraduationCap, Heart, Users, Star } from "lucide-react";
import { useListContent } from "@/lib/mock-api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: "all", label: "All", icon: Star },
  { id: "life", label: "Life", icon: Sparkles },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "relationships", label: "Relationships", icon: Heart },
  { id: "marriage", label: "Marriage", icon: Users },
  { id: "spiritual_growth", label: "Spiritual Growth", icon: BookOpen },
];

const categoryColors: Record<string, string> = {
  life: "bg-violet-100 text-violet-700",
  career: "bg-blue-100 text-blue-700",
  academics: "bg-emerald-100 text-emerald-700",
  relationships: "bg-pink-100 text-pink-700",
  marriage: "bg-red-100 text-red-700",
  spiritual_growth: "bg-amber-100 text-amber-700",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContentHub() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useListContent();

  const filtered = data?.items.filter((item) =>
    searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative bg-primary overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/6 blur-3xl -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-medium mb-4 sm:mb-6 backdrop-blur-sm">
              <BookOpen className="h-3 w-3 text-secondary" />
              Faith-based articles & teachings
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-5 tracking-tight">
              Content <span className="italic text-gold-gradient">Hub</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Explore articles, teachings, and practical wisdom carefully curated to guide you through every season of life.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 pb-4 pt-0">
          <div className="bg-card rounded-2xl shadow-lg border border-border/60 px-4 py-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max py-0.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-muted/60 text-muted-foreground hover:bg-secondary/10 hover:text-primary"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-secondary" : ""}`} />
                      {cat.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-9 rounded-full border-border/50 bg-muted/40 focus-visible:ring-secondary h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-8 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 sm:py-24 bg-card rounded-3xl border border-border">
            <p className="text-destructive font-medium text-sm sm:text-base">Failed to load content. Please try again later.</p>
          </div>
        ) : !filtered?.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 sm:py-32 bg-card rounded-3xl border border-dashed border-border/80"
          >
            <BookOpen className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/30 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-primary">No content found</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Try a different category or search term.</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            >
              {filtered?.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link href={`/content/${item.id}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.99 }}
                      className="group flex flex-col h-full bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary/25 transition-all duration-300 cursor-pointer"
                    >
                      {/* Color accent bar */}
                      <div className={`h-1.5 w-full ${
                        item.category === "life" ? "bg-violet-400" :
                        item.category === "career" ? "bg-blue-400" :
                        item.category === "academics" ? "bg-emerald-400" :
                        item.category === "relationships" ? "bg-pink-400" :
                        item.category === "marriage" ? "bg-red-400" :
                        "bg-amber-400"
                      }`} />

                      <div className="p-4 sm:p-7 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3 sm:mb-5">
                          <Badge className={`${categoryColors[item.category] || "bg-muted text-muted-foreground"} border-0 font-semibold uppercase tracking-wider text-xs px-2 py-1 rounded-full`}>
                            {item.category.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-medium">
                            {format(new Date(item.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors duration-200 line-clamp-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed flex-1">
                          {item.excerpt}
                        </p>

                        <div className="mt-auto pt-3 sm:pt-5 border-t border-border/40 flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-2.5">
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-background">
                              {item.authorName.charAt(0)}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-foreground/80">{item.authorName}</span>
                          </div>
                          <motion.div
                            whileHover={{ x: 3 }}
                            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/6 group-hover:bg-primary flex items-center justify-center transition-colors duration-200"
                          >
                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary group-hover:text-white transition-colors" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

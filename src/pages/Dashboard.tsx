import { useAuth } from "@/lib/mock-auth";
import { Link, useLocation } from "wouter";
import { useListContent, useListPosts } from "@/lib/mock-api";
import { motion } from "framer-motion";
import {
  BookOpen, MessageCircle, Heart, Calendar,
  Sparkles, Briefcase, GraduationCap, Users,
  ArrowRight, Clock, TrendingUp, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const lifeAreas = [
  { id: "life", title: "Life", icon: Sparkles },
  { id: "career", title: "Career", icon: Briefcase },
  { id: "academics", title: "Academics", icon: GraduationCap },
  { id: "relationships", title: "Relationships", icon: Users },
  { id: "marriage", title: "Marriage", icon: Heart },
  { id: "spiritual_growth", title: "Spiritual Growth", icon: BookOpen },
];

const quickActions = [
  { label: "Content Hub", icon: BookOpen, href: "/content", color: "from-blue-500/15 to-blue-600/5", iconColor: "text-blue-600", border: "border-blue-200/50" },
  { label: "Community", icon: MessageCircle, href: "/community", color: "from-emerald-500/15 to-emerald-600/5", iconColor: "text-emerald-600", border: "border-emerald-200/50" },
  { label: "Events", icon: Calendar, href: "/events", color: "from-violet-500/15 to-violet-600/5", iconColor: "text-violet-600", border: "border-violet-200/50" },
  { label: "Counselling", icon: Users, href: "/counselling", color: "from-amber-500/15 to-amber-600/5", iconColor: "text-amber-600", border: "border-amber-200/50" },
  { label: "Prayer Request", icon: Heart, href: "/prayer-requests?new=true", color: "from-pink-500/15 to-pink-600/5", iconColor: "text-pink-600", border: "border-pink-200/50" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: contentData } = useListContent();
  const { data: postsData } = useListPosts();

  if (!isLoading && !isAuthenticated) {
    setLocation("/sign-in");
    return null;
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-3 border-secondary border-t-transparent"
        />
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="relative bg-primary overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-32">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-32 -mt-32" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="text-white/50 text-xs sm:text-sm mb-2 font-medium">{greeting},</p>
            <div className="flex items-center gap-3 sm:gap-5">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-3 sm:border-4 border-secondary/40 shadow-xl" />
              ) : (
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-extrabold text-xl sm:text-2xl border-3 sm:border-4 border-secondary/30">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white">{user.name}</h1>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5 flex items-center gap-1 sm:gap-1.5">
                  <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-secondary" />
                  Your faith journey continues
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10 pb-16 sm:pb-24">

        {/* Faith Journey Progress */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="bg-card rounded-3xl border border-border/50 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8"
        >
          <h2 className="text-base sm:text-lg font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
            Your Faith Journey
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Community Engagement</span>
                <span className="text-xs sm:text-sm font-bold text-primary">Active</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 sm:h-3">
                <div className="bg-gradient-to-r from-primary to-primary/80 h-2 sm:h-3 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Daily Devotion</span>
                <span className="text-xs sm:text-sm font-bold text-secondary">7 day streak!</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 sm:h-3">
                <div className="bg-gradient-to-r from-secondary to-secondary/80 h-2 sm:h-3 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {quickActions.map((action) => (
            <motion.div key={action.label} variants={itemVariants}>
              <Link href={action.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br ${action.color} rounded-3xl border ${action.border} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                >
                  <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white shadow-sm mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <action.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${action.iconColor}`} />
                  </div>
                  <span className="font-semibold text-primary text-xs sm:text-sm">{action.label}</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* Latest Teachings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-3xl border border-border/50 p-4 sm:p-7 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary flex items-center gap-2">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                  Latest Teachings
                </h2>
                <Link href="/content">
                  <div className="text-xs sm:text-sm font-semibold text-secondary hover:underline flex items-center gap-1 cursor-pointer">
                    View All <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </div>
                </Link>
              </div>
              <div className="space-y-3">
                {contentData?.items?.length ? (
                  contentData.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                    >
                      <Link href={`/content/${item.id}`}>
                        <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-primary/4 transition-colors cursor-pointer border border-transparent hover:border-border/60">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-primary group-hover:text-secondary transition-colors text-xs sm:text-sm line-clamp-1">{item.title}</h3>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.excerpt}</p>
                          </div>
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-secondary transition-colors shrink-0 mt-0.5" />
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-xs sm:text-sm py-3 sm:py-4 text-center">No recent teachings.</p>
                )}
              </div>
            </motion.section>

            {/* Active Discussions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-3xl border border-border/50 p-4 sm:p-7 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                  Active Discussions
                </h2>
                <Link href="/community">
                  <div className="text-xs sm:text-sm font-semibold text-secondary hover:underline flex items-center gap-1 cursor-pointer">
                    View All <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </div>
                </Link>
              </div>
              <div className="space-y-3">
                {postsData?.items?.length ? (
                  postsData.items.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                    >
                      <Link href={`/community/${post.id}`}>
                        <div className="group p-3 sm:p-4 rounded-2xl hover:bg-primary/4 transition-colors cursor-pointer border border-transparent hover:border-border/60">
                          <h3 className="font-semibold text-primary group-hover:text-secondary transition-colors text-xs sm:text-sm line-clamp-1 mb-1 sm:mb-1.5">{post.title}</h3>
                          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 sm:gap-1.5">
                              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold" style={{ fontSize: "8px sm:9px" }}>
                                {post.authorName.charAt(0)}
                              </div>
                              {post.authorName}
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{format(new Date(post.createdAt), 'MMM d')}</span>
                              <span className="flex items-center gap-1"><MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{post.replyCount || 0}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-xs sm:text-sm py-3 sm:py-4 text-center">No recent discussions.</p>
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Journey Areas */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card rounded-3xl border border-border/50 p-4 sm:p-7 shadow-sm"
            >
              <h2 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-5">Your Journey</h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {lifeAreas.map((area) => (
                  <Link key={area.id} href={`/content?category=${area.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 border-border/60 hover:bg-primary hover:text-white hover:border-primary transition-all text-[10px] sm:text-xs font-semibold cursor-pointer">
                        <area.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {area.title}
                      </Button>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* Daily Verse */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative bg-primary text-white rounded-3xl p-4 sm:p-7 overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-24 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-secondary/20 blur-2xl -mr-6 sm:-mr-8 -mt-6 sm:-mt-8" />
              <div className="absolute bottom-0 left-0 w-20 w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-secondary/10 blur-2xl -ml-6 sm:-ml-8 -mb-6 sm:-mb-8" />
              <Quote className="h-5 w-5 sm:h-7 sm:w-7 text-secondary mb-3 sm:mb-4 relative z-10" />
              <p className="font-medium italic text-white/90 leading-relaxed mb-3 sm:mb-4 relative z-10 text-xs sm:text-sm">
                "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
              </p>
              <p className="font-bold text-[10px] sm:text-xs text-secondary uppercase tracking-widest relative z-10">— Proverbs 3:5-6</p>
            </motion.section>

            {/* Prayer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/prayer-requests">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-secondary/8 rounded-3xl border border-secondary/20 p-4 sm:p-6 cursor-pointer hover:bg-secondary/12 transition-colors group"
                >
                  <Heart className="h-5 w-5 sm:h-7 sm:w-7 text-secondary fill-secondary/20 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary mb-1 text-sm sm:text-base">Prayer Wall</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Share a prayer need or stand with others in faith.</p>
                  <div className="flex items-center text-xs sm:text-sm font-semibold text-secondary gap-1">
                    Visit Wall <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Heart, Users, Sparkles, Quote, Play, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import GospelSlideshow from "@/components/GospelSlideshow";
import ChristianElements from "@/components/ChristianElements";
import Text3D from "@/components/Text3D";

const lifeAreas = [
  { id: "life", title: "Life", icon: Sparkles, desc: "Navigate daily challenges with grace and intentionality.", color: "from-violet-500/10 to-purple-500/5" },
  { id: "career", title: "Career", icon: Briefcase, desc: "Build a purpose-driven professional life anchored in faith.", color: "from-blue-500/10 to-sky-500/5" },
  { id: "academics", title: "Academics", icon: GraduationCap, desc: "Pursue knowledge with wisdom as your foundation.", color: "from-emerald-500/10 to-teal-500/5" },
  { id: "relationships", title: "Relationships", icon: Users, desc: "Build meaningful, God-honouring connections.", color: "from-pink-500/10 to-rose-500/5" },
  { id: "marriage", title: "Marriage", icon: Heart, desc: "Cultivate a lifelong covenant rooted in love and commitment.", color: "from-red-500/10 to-orange-500/5" },
  { id: "spiritual_growth", title: "Spiritual Growth", icon: BookOpen, desc: "Deepen your faith and walk closer with God every day.", color: "from-amber-500/10 to-yellow-500/5" },
];

const stats = [
  { value: "500+", label: "Articles Published" },
  { value: "2,400+", label: "Community Members" },
  { value: "180+", label: "Prayer Answered" },
  { value: "60+", label: "Events Hosted" },
];

const testimonials = [
  { name: "Sarah M.", role: "Member since 2023", quote: "This community changed how I see my career. The teachings on purpose gave me direction I never had before." },
  { name: "James O.", role: "Community Leader", quote: "The prayer wall is something special. Real people, real needs, real faith. I've seen miracles happen here." },
  { name: "Rachel & David K.", role: "Married Couple", quote: "The marriage resources transformed our relationship. We now have tools and a community cheering us on." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden min-h-[92vh]">
        <GospelSlideshow />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/80 z-10" />
        
        {/* Decorative orbs - enhanced */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-secondary blur-3xl pointer-events-none z-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary blur-3xl pointer-events-none z-20"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-4 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Faith · Growth · Community
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Practical Wisdom
            <br />
            for{" "}
            <span className="italic font-extrabold text-secondary">Everyday Living</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-8 max-w-2xl text-base sm:text-xl leading-8 text-white"
          >
            Join a faith-based community dedicated to growing together in life, career, relationships, and spiritual maturity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/join">
              <Button
                size="lg"
                className="rounded-full bg-secondary text-primary font-bold text-base h-14 px-10 shadow-2xl border-0 hover:opacity-90 transition-all hover:scale-105"
              >
                Join the Community
              </Button>
            </Link>
            <Link href="/content">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white/25 bg-white/8 text-white hover:bg-white/15 text-base h-14 px-8 backdrop-blur-sm gap-2 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                Explore Content
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Infinite Sliding Features ── */}
      <section className="py-8 bg-primary border-y border-white/10 overflow-hidden">
        <div className="relative">
          <div className="flex animate-slide-left">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-8 text-white/80 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Scripture-based teaching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Supportive community</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Anonymous prayer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex-shrink-0">
                <div className="text-2xl sm:text-4xl font-extrabold text-secondary mb-1">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life Areas ── */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Christian elements only on mobile */}
        <div className="sm:hidden">
          <ChristianElements />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">What We Cover</span>
            <h2 className="text-xl sm:text-4xl font-extrabold text-primary">Explore Key Life Areas</h2>
            <p className="mt-3 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover teachings, articles, and discussions tailored to the specific seasons and areas of your life.
            </p>
          </motion.div>

          <div className="space-y-4 sm:hidden">
            {/* Mobile: Vertical cards with better spacing */}
            {lifeAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/content?category=${area.id}`} className="block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl border border-border/40 bg-gradient-to-r ${area.color} p-4 shadow-sm overflow-hidden`}
                    >
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-sm">
                          <Icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-primary text-lg mb-1">{area.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{area.desc}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <ArrowRight className="h-5 w-5 text-secondary" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop/Tablet: Original grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="hidden sm:block grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {lifeAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div key={area.id} variants={itemVariants}>
                  <Link href={`/content?category=${area.id}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="group relative flex h-full flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:border-secondary/30 overflow-hidden cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/6 text-secondary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-xl sm:text-2xl font-bold text-primary">{area.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
                        <div className="mt-6 flex items-center text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
                          Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Scripture ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Christian elements for Scripture section */}
        <div className="sm:hidden">
          <ChristianElements />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-secondary/8 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="mx-auto h-12 w-12 text-secondary mb-8 opacity-80" />
            <p className="text-lg sm:text-2xl font-medium italic text-white leading-relaxed">
              "The fear of the LORD is the beginning of wisdom; all who follow his precepts have good understanding."
            </p>
            <p className="mt-6 text-sm font-bold text-secondary uppercase tracking-widest">— Psalm 111:10</p>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 sm:py-28 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">Testimonies</span>
            <h2 className="text-lg sm:text-4xl font-extrabold text-primary">Stories of Transformation</h2>
          </motion.div>

          {/* Mobile: Vertical stacked cards with unique design */}
          <div className="space-y-4 sm:hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 relative overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-2xl" />
                  
                  {/* Quote icon */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <Quote className="h-3 w-3 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-4 text-xs italic">
                      "{testimonial.quote}"
                    </p>
                    
                    {/* Author info with different layout */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop/Tablet: Original grid with enhanced design */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Quote className="h-5 w-5 text-white" />
                </div>
                
                <p className="text-gray-700 italic leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-28 bg-background relative overflow-hidden">
        <Text3D />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative rounded-3xl overflow-hidden bg-primary/90 backdrop-blur-sm p-8 sm:p-16 shadow-2xl border border-white/10"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary/15 blur-3xl -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/8 blur-3xl -ml-20 -mb-20" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sm sm:text-xl text-white/70 mb-6 sm:mb-10 max-w-2xl mx-auto">
                Thousands of believers are growing daily. Join them and discover wisdom that transforms every area of your life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link href="/join">
                  <Button size="lg" className="gold-gradient text-primary font-bold rounded-full h-14 px-10 text-base border-0 hover:opacity-90 glow-gold transition-all hover:scale-105">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/content">
                  <Button variant="outline" size="lg" className="rounded-full border-white/25 text-white hover:bg-white/10 h-14 px-8 text-base gap-2">
                    Browse Content <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

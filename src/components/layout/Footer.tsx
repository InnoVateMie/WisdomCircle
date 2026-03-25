import { Link } from "wouter";
import { Heart, BookOpen, MessageCircle, Calendar, Mail, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/4 blur-3xl -ml-16 -mb-16 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary shadow-lg">
                <span className="font-bold text-lg italic">W</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">The Wisdom Circle</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-8">
              Practical wisdom for everyday living. A faith-based community growing together in life, career, relationships, and spiritual maturity.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-secondary hover:border-secondary/30 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              {[
                { href: "/content", label: "Content Hub", icon: BookOpen },
                { href: "/community", label: "Community", icon: MessageCircle },
                { href: "/prayer-requests", label: "Prayer Wall", icon: Heart },
                { href: "/events", label: "Events", icon: Calendar },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-white/55 hover:text-secondary transition-colors group">
                    <link.icon className="h-3.5 w-3.5 group-hover:text-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Contact Support", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/55 hover:text-secondary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Stay Connected</h4>
            <p className="text-white/55 text-sm mb-4 leading-relaxed">
              Get weekly teachings, community highlights, and upcoming events delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/30 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
                />
              </div>
              <button className="px-4 py-2.5 rounded-xl bg-secondary text-primary font-semibold text-sm hover:bg-secondary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-sm">
            &copy; {new Date().getFullYear()} The Wisdom Circle. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 text-secondary fill-secondary" /> for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}

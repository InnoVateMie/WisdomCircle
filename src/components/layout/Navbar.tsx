import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, X, User, BookOpen, MessageCircle, Heart, Calendar, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/content", label: "Content Hub", icon: BookOpen },
    { href: "/community", label: "Community", icon: MessageCircle },
    { href: "/prayer-requests", label: "Prayer", icon: Heart },
    { href: "/events", label: "Events", icon: Calendar },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-background/80 backdrop-blur-md border-b border-border/30"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 md:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-full bg-primary shadow-md shadow-primary/20 overflow-hidden"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/WisdomeCircle Logo.png`} 
                  alt="Wisdom Circle Logo" 
                  className="h-full w-full object-cover rounded-full"
                />
              </motion.div>
              <span className="font-bold text-sm md:text-xl tracking-tight text-primary">
                The Wisdom Circle
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navbar-pill"
                          className="absolute inset-0 bg-primary/8 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      <Icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-dot"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-secondary"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {!isLoading && (
                isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 hover:bg-muted transition-colors cursor-pointer"
                      >
                        {user?.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="h-7 w-7 rounded-full ring-2 ring-secondary/30" />
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}
                        <span className="text-sm font-medium text-primary max-w-[120px] truncate">{user?.name}</span>
                        <LayoutDashboard className="h-3.5 w-3.5 text-muted-foreground" />
                      </motion.div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout()}
                      className="gap-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={() => login()}
                      className="gap-2 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 px-6"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </motion.div>
                )
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-primary/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-white border-b border-border shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {isAuthenticated && (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">View Dashboard</p>
                    </div>
                  </motion.div>
                </Link>
              )}
              <div className="h-px bg-border my-1" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                      location.startsWith(link.href) ? "bg-primary/8 text-primary" : "hover:bg-muted/60 text-foreground"
                    )}>
                      <link.icon className="h-5 w-5 text-secondary" />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-border my-1" />
              {!isLoading && (
                isAuthenticated ? (
                  <Button variant="outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full justify-center gap-2 rounded-xl mt-1">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                ) : (
                  <Button onClick={() => { login(); setIsMobileMenuOpen(false); }} className="w-full justify-center gap-2 rounded-xl bg-primary text-white mt-1">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useAuth } from "@/lib/mock-auth";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Star, Shield, Heart, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function SignIn() {
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock validation - accept any non-empty email/password
    if (formData.email && formData.password) {
      login();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col md:flex-row bg-background">
      {/* Left Side: Brand Panel */}
      <div className="relative flex w-full flex-col items-center justify-center bg-primary p-10 md:w-1/2 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Wisdom Circle Decor"
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex max-w-md flex-col text-center"
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary shadow-xl">
            <span className="font-serif text-3xl font-bold italic">W</span>
          </div>

          <h1 className="mb-4 text-2xl sm:text-4xl font-bold text-white tracking-tight">The Wisdom Circle</h1>
          <p className="mb-12 text-sm sm:text-lg text-primary-foreground/80">Practical Wisdom for Everyday Living.</p>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <Quote className="absolute -left-4 -top-4 h-8 w-8 text-secondary" />
            <p className="font-serif text-lg sm:text-xl italic text-white leading-relaxed">
              "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding."
            </p>
            <p className="mt-4 text-sm font-semibold text-secondary uppercase tracking-widest">— Proverbs 9:10</p>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Sign In Card */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-xl"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-muted-foreground mb-8">
              Sign in to continue your journey, connect with the community, and explore teachings.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-primary/5 p-4 text-center">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span className="text-xs font-semibold text-primary">Teachings</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-primary/5 p-4 text-center">
              <Heart className="h-6 w-6 text-secondary" />
              <span className="text-xs font-semibold text-primary">Community</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-primary/5 p-4 text-center">
              <Star className="h-6 w-6 text-secondary" />
              <span className="text-xs font-semibold text-primary">Growth</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-primary/5 p-4 text-center">
              <Shield className="h-6 w-6 text-secondary" />
              <span className="text-xs font-semibold text-primary">Faith</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-lg border-border/50 bg-background/50 backdrop-blur-sm focus:border-secondary/50 focus:ring-secondary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 rounded-lg border-border/50 bg-background/50 backdrop-blur-sm focus:border-secondary/50 focus:ring-secondary/20"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-14 rounded-xl bg-secondary text-primary hover:bg-secondary/90 text-lg font-semibold shadow-lg shadow-secondary/20"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/join" className="font-semibold text-secondary hover:underline">
              Join the community
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

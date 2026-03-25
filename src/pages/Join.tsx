import { useAuth } from "@/lib/mock-auth";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Users, Heart, Calendar, Quote, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function Join() {
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock validation - accept any non-empty data with matching passwords
    if (formData.name && formData.email && formData.password && formData.password === formData.confirmPassword) {
      login();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section with Custom Background */}
      <section className="relative flex items-center justify-center overflow-hidden py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/join-bg.png`}
            alt="Cinematic Church Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-background"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Join <span className="italic text-secondary">The Wisdom Circle</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-primary-foreground/90 font-medium"
          >
            Where Believers Grow Together
          </motion.p>
        </div>
      </section>

      {/* Main Content & Benefits */}
      <section className="py-20 bg-background relative -mt-10 rounded-t-[3rem] shadow-2xl z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">What to Expect</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Embark on a transformative journey with a community that supports, encourages, and challenges you to grow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-20">
            {[
              { icon: BookOpen, title: "Access Teachings", desc: "Deep dive into scripture and practical wisdom for life's seasons." },
              { icon: Users, title: "Join Community", desc: "Connect with like-minded believers in a safe, encouraging space." },
              { icon: Heart, title: "Prayer Support", desc: "Share requests and uplift others through the power of prayer." },
              { icon: Calendar, title: "Live Events", desc: "Participate in enriching workshops, webinars, and studies." },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-secondary">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mb-24">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-primary text-white rounded-3xl p-10 max-w-2xl text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
              <h3 className="text-3xl font-bold mb-6 relative z-10">Ready to Grow?</h3>
              <p className="text-primary-foreground/80 mb-8 text-lg relative z-10">
                Create your account today and step into a season of spiritual renewal and meaningful connection.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-primary-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-primary-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-primary-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-primary-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="relative z-10 h-14 px-10 rounded-full bg-secondary text-primary hover:bg-secondary/90 text-lg font-bold shadow-xl shadow-secondary/20 transition-transform hover:scale-105"
              >
                Create Your Account
              </Button>
            </form>
              <p className="mt-4 text-sm text-primary-foreground/60 relative z-10">
                Already a member? <Link href="/sign-in" className="text-secondary hover:underline">Sign In</Link>
              </p>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Stories of Transformation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M.", quote: "The teachings on career and purpose gave me exactly the clarity I needed during a tough transition." },
                { name: "David K.", quote: "I've never felt so supported. The prayer warriors here genuinely care and check up on you." },
                { name: "Jessica & Tom", quote: "The marriage resources completely shifted our perspective. We're growing together like never before." }
              ].map((test, idx) => (
                <div key={idx} className="bg-card p-8 rounded-2xl border border-border relative">
                  <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/5" />
                  <p className="italic text-muted-foreground relative z-10 mb-6">"{test.quote}"</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="font-semibold text-primary">{test.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-12 border-t border-border">
            <p className="font-serif text-2xl italic text-primary max-w-3xl mx-auto leading-relaxed">
              "Let us consider how we may spur one another on toward love and good deeds, not giving up meeting together..."
            </p>
            <p className="mt-4 text-sm font-bold text-secondary uppercase tracking-widest">— Hebrews 10:24-25</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { format } from "date-fns";
import { Heart, HandHeart, ShieldAlert, Flame } from "lucide-react";
import { useAuth } from "@/lib/mock-auth";
import { useListPrayerRequests, useCreatePrayerRequest } from "@/lib/mock-api";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function PrayerRequests() {
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: "", body: "", isAnonymous: false });

  const { data, isLoading } = useListPrayerRequests();
  const createRequest = useCreatePrayerRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return login();
    if (!newRequest.title.trim() || !newRequest.body.trim()) return;

    createRequest.mutate(
      { request: newRequest.body, isAnonymous: newRequest.isAnonymous },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewRequest({ title: "", body: "", isAnonymous: false });
          queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests"] });
          toast({ title: "Your prayer request has been shared." });
        },
        onError: () => {
          toast({ title: "Failed to submit request", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/6 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(212,168,67,0.08)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-secondary fill-secondary/30 mb-4 sm:mb-6" />
            </motion.div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-5 tracking-tight">
              The Prayer <span className="italic text-gold-gradient">Wall</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10">
              Carry each other's burdens. Share your prayer needs with the community and stand in faith together.
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full gold-gradient text-primary border-0 font-bold gap-2 px-6 sm:px-10 h-12 sm:h-14 shadow-2xl glow-gold hover:opacity-90 hover:scale-105 transition-all text-sm sm:text-base"
                >
                  <HandHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                  Submit a Prayer Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl p-6 sm:p-8 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl text-primary font-bold">Share Your Prayer Need</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base">Your request will be shared with our community of believers who care.</DialogDescription>
                </DialogHeader>
                {!isAuthenticated ? (
                  <div className="py-8 sm:py-10 text-center bg-muted/30 rounded-2xl mt-4 border border-border/50">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <ShieldAlert className="h-6 w-6 sm:h-7 sm:w-7 text-primary/60" />
                    </div>
                    <p className="text-foreground font-semibold mb-2 text-sm sm:text-base">Sign in to submit</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">Join the prayer community — it's free and welcoming.</p>
                    <Button onClick={() => login()} className="rounded-full bg-primary text-white gap-2 px-6 sm:px-8 text-sm sm:text-base">
                      Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-primary font-semibold text-sm">Brief Summary</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Praying for my mother's health"
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                        className="rounded-xl border-border/60 bg-muted/30 focus-visible:ring-secondary h-10 sm:h-11 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body" className="text-primary font-semibold text-sm">Details</Label>
                      <Textarea
                        id="body"
                        placeholder="Share more details about what we can pray for..."
                        className="min-h-[100px] sm:min-h-[120px] rounded-xl bg-muted/30 focus-visible:ring-secondary resize-none border-border/60 text-sm"
                        value={newRequest.body}
                        onChange={(e) => setNewRequest({ ...newRequest, body: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 bg-muted/20 p-3 sm:p-4 rounded-2xl border border-border/40">
                      <Switch
                        id="anonymous"
                        checked={newRequest.isAnonymous}
                        onCheckedChange={(checked) => setNewRequest({ ...newRequest, isAnonymous: checked })}
                      />
                      <div>
                        <Label htmlFor="anonymous" className="font-semibold cursor-pointer text-sm">Submit Anonymously</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Your name will be hidden from the public wall.</p>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-primary text-white h-10 sm:h-12 font-semibold text-sm sm:text-base"
                      disabled={createRequest.isPending || !newRequest.title || !newRequest.body}
                    >
                      {createRequest.isPending ? "Submitting..." : "Post Prayer Request"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-3xl border border-border/50 p-4 sm:p-7 space-y-3 sm:space-y-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            ))}
          </div>
        ) : !data?.items.length ? (
          <div className="text-center py-20 sm:py-28 bg-card rounded-3xl border border-dashed border-border/70">
            <HandHeart className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-muted-foreground/25 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-primary">The wall is clear</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">No active prayer requests right now. Be the first to share.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {data.items.map((request) => (
              <motion.div
                key={request.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-card rounded-3xl border border-border/50 p-4 sm:p-7 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-20 w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-secondary/6 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -mr-4 sm:-mr-6 -mt-4 sm:-mt-6" />

                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs sm:text-sm border border-primary/10">
                      {request.isAnonymous ? "?" : (request.authorName?.charAt(0) || "U")}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        {request.isAnonymous ? "Anonymous" : request.authorName}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(request.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  {request.isAnonymous && (
                    <ShieldAlert className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground/40" />
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3 line-clamp-2 leading-snug relative z-10">
                  {request.title}
                </h3>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed line-clamp-4 flex-1 relative z-10">
                  {request.body}
                </p>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/40 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-secondary">
                    <Flame className="h-3 w-3 sm:h-4 sm:w-4 fill-secondary/30" />
                    <span>{request.prayerCount} praying</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs font-bold border-secondary/30 text-primary hover:bg-secondary hover:border-secondary hover:text-primary transition-all gap-1 sm:gap-1.5 px-3 sm:px-4 text-xs"
                  >
                    <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> I'm Praying
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

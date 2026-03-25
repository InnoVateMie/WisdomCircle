import { useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { MessageCircle, Users, PenSquare, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/mock-auth";
import { useListPosts, useCreatePost } from "@/lib/mock-api";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Community() {
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const { data, isLoading } = useListPosts();
  const createPost = useCreatePost();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return login();
    if (!newPost.title.trim() || !newPost.body.trim()) return;

    createPost.mutate(
      { title: newPost.title, content: newPost.body },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewPost({ title: "", body: "" });
          queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
          toast({ title: "Discussion posted!" });
        },
        onError: () => {
          toast({ title: "Failed to post", variant: "destructive" });
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
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="w-full md:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-medium mb-4 sm:mb-6">
              <TrendingUp className="h-3 w-3 text-secondary" />
              Active discussions daily
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3 sm:mb-5">
              Community <span className="italic text-gold-gradient">Forum</span>
            </h1>
            <p className="text-white/60 max-w-xl text-sm sm:text-lg leading-relaxed">
              A safe space to discuss faith, share testimonies, and ask questions. Grow together through shared wisdom.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }} className="w-full md:w-auto flex justify-center md:justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full gold-gradient text-primary font-bold border-0 gap-2 px-6 sm:px-8 h-12 sm:h-14 shadow-xl glow-gold hover:opacity-90 hover:scale-105 transition-all text-sm sm:text-base"
                >
                  <PenSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  Start a Discussion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl p-6 sm:p-8 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl text-primary font-bold">Start a New Discussion</DialogTitle>
                  <DialogDescription className="text-sm sm:text-base">Share a thought, ask a question, or post a testimony.</DialogDescription>
                </DialogHeader>
                {!isAuthenticated ? (
                  <div className="py-8 sm:py-10 text-center bg-muted/30 rounded-2xl mt-4 border border-border/50">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary/60" />
                    </div>
                    <p className="text-foreground font-semibold mb-2 text-sm sm:text-base">Join the conversation</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">Sign in to share with the community.</p>
                    <Button onClick={() => login()} className="rounded-full bg-primary text-white gap-2 px-6 sm:px-8 text-sm sm:text-base">
                      Sign In to Post
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleCreatePost} className="space-y-4 sm:space-y-5 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-primary font-semibold text-sm">Topic Title</Label>
                      <Input
                        id="title"
                        placeholder="What's on your mind?"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="rounded-xl border-border/60 bg-muted/30 focus-visible:ring-secondary h-10 sm:h-11 text-sm"
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body" className="text-primary font-semibold text-sm">Your Message</Label>
                      <Textarea
                        id="body"
                        placeholder="Share your thoughts, question, or testimony..."
                        className="min-h-[120px] sm:min-h-[140px] rounded-xl bg-muted/30 focus-visible:ring-secondary resize-none border-border/60 text-sm"
                        value={newPost.body}
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-primary text-white h-10 sm:h-12 font-semibold text-sm sm:text-base"
                      disabled={createPost.isPending || !newPost.title || !newPost.body}
                    >
                      {createPost.isPending ? "Publishing..." : "Publish Discussion"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="space-y-4 sm:space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-3xl border border-border/50 p-4 sm:p-7">
                <Skeleton className="h-5 w-2/3 mb-2 sm:mb-3" />
                <Skeleton className="h-3 w-full mb-1 sm:mb-2" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        ) : !data?.items.length ? (
          <div className="text-center py-20 sm:py-28 bg-card rounded-3xl border border-dashed border-border/70">
            <MessageCircle className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-muted-foreground/25 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-primary">No discussions yet</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Be the first to start a conversation!</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="space-y-4 sm:space-y-5"
          >
            {data.items.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/community/${post.id}`}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.005 }}
                    whileTap={{ scale: 0.998 }}
                    className="group bg-card rounded-3xl border border-border/50 p-4 sm:p-7 shadow-sm hover:shadow-xl hover:border-secondary/25 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-primary mb-2 sm:mb-2.5 group-hover:text-secondary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                          {post.body}
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                              {post.authorName.charAt(0)}
                            </div>
                            <span className="text-foreground/70 font-semibold text-xs sm:text-sm">{post.authorName}</span>
                          </div>
                          <span className="flex items-center gap-1 sm:gap-1.5">
                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {format(new Date(post.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="flex flex-col items-center justify-center px-3 py-2 sm:px-5 sm:py-3 rounded-2xl bg-primary/5 border border-border/40 group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-colors text-center min-w-[70px] sm:min-w-[80px]">
                          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-secondary mb-1" />
                          <span className="font-bold text-primary text-sm sm:text-lg leading-none">{post.replyCount}</span>
                          <span className="text-muted-foreground text-[9px] sm:text-[10px] mt-0.5 font-medium">replies</span>
                        </div>
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/5 group-hover:bg-primary flex items-center justify-center transition-colors">
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

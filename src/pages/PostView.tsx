import { useState } from "react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useAuth } from "@/lib/mock-auth";
import { useGetPost, useCreateReply } from "@/lib/mock-api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function PostView() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyBody, setReplyBody] = useState("");

  const { data: post, isLoading, error } = useGetPost(id);
  const createReply = useCreateReply();

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return login();
    if (!replyBody.trim()) return;

    createReply.mutate(
      { postId: id, content: replyBody },
      {
        onSuccess: () => {
          setReplyBody("");
          queryClient.invalidateQueries({ queryKey: [`/api/posts/${id}`] });
          toast({ title: "Reply added!" });
        },
        onError: () => {
          toast({ title: "Failed to add reply", variant: "destructive" });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="h-32 w-full mb-8 rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-destructive">Post not found</h2>
        <Link href="/community">
          <Button variant="outline" className="mt-4">Back to Community</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary pt-12 pb-24 px-4 text-primary-foreground">
        <div className="mx-auto max-w-4xl">
          <Link href="/community" className="inline-flex items-center text-primary-foreground/70 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discussions
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-serif">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                {post.authorName.charAt(0)}
              </div>
              <span className="font-medium text-white">{post.authorName}</span>
            </div>
            <span>•</span>
            <time>{format(new Date(post.createdAt), "MMMM d, yyyy")}</time>
            <span>•</span>
            <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4"/> {post.replyCount} replies</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-12">
        {/* Original Post */}
        <div className="bg-card rounded-2xl shadow-md border border-border p-8 mb-8 relative z-10">
          <p className="text-lg text-foreground whitespace-pre-wrap leading-relaxed">{post.body}</p>
        </div>

        {/* Replies Section */}
        <div className="space-y-6 mb-12">
          <h3 className="text-xl font-bold text-primary font-serif flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-secondary" />
            Replies ({post.replies?.length || 0})
          </h3>
          
          {post.replies?.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-xl border border-border border-dashed">
              <p className="text-muted-foreground">No replies yet. Be the first to respond!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {post.replies?.map((reply) => (
                <div key={reply.id} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {reply.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{reply.authorName}</div>
                      <div className="text-xs text-muted-foreground">{format(new Date(reply.createdAt), "MMM d, yyyy 'at' h:mm a")}</div>
                    </div>
                  </div>
                  <p className="text-foreground/90 whitespace-pre-wrap">{reply.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <h4 className="font-bold text-primary mb-4">Leave a Reply</h4>
          {!isAuthenticated ? (
            <div className="text-center py-6 bg-muted/50 rounded-xl">
              <p className="text-muted-foreground mb-4">You must be signed in to reply.</p>
              <Button onClick={() => login()} className="bg-primary">Sign In</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReply}>
              <Textarea 
                placeholder="Write your thoughtful reply here..." 
                className="min-h-[120px] mb-4 bg-muted/20 focus-visible:ring-secondary"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={createReply.isPending || !replyBody.trim()} className="bg-secondary text-primary hover:bg-secondary/90 font-bold gap-2">
                  <Send className="h-4 w-4" />
                  {createReply.isPending ? "Sending..." : "Post Reply"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

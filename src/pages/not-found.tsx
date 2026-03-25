import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 mb-6">
          <AlertCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary font-serif mb-4">Path Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          The wisdom you seek is not on this page. Perhaps you took a wrong turn along the journey.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full bg-primary text-white">
            Return to the Path
          </Button>
        </Link>
      </div>
    </div>
  );
}

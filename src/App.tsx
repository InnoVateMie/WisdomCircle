import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import ContentHub from "@/pages/ContentHub";
import Article from "@/pages/Article";
import Community from "@/pages/Community";
import PostView from "@/pages/PostView";
import PrayerRequests from "@/pages/PrayerRequests";
import Events from "@/pages/Events";
import NotFound from "@/pages/not-found";
import SignIn from "@/pages/SignIn";
import Join from "@/pages/Join";
import Dashboard from "@/pages/Dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground selection:bg-secondary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/join" component={Join} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/content" component={ContentHub} />
          <Route path="/content/:id" component={Article} />
          <Route path="/community" component={Community} />
          <Route path="/community/:id" component={PostView} />
          <Route path="/prayer-requests" component={PrayerRequests} />
          <Route path="/events" component={Events} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

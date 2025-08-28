import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/ui/navigation";
import Home from "@/pages/home";
import ContentDetail from "@/pages/content-detail";
import Diversos from "@/pages/diversos";
import CategoryDetail from "@/pages/category-detail";
import CategoryItems from "@/pages/category-items";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/content/:id" component={ContentDetail} />
        <Route path="/content/:id/diversos" component={Diversos} />
        <Route path="/content/:id/category/:categoryType" component={CategoryItems} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

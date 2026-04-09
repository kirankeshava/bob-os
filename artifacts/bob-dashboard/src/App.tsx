import { Switch, Route, Router as WouterRouter, useRoute } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Shell } from "@/components/layout/shell";
import Dashboard from "@/pages/dashboard";
import BusinessDetail from "@/pages/business-detail";
import TaskDetail from "@/pages/task-detail";
import AgentRuns from "@/pages/agent-runs";
import BusinessSitePage from "@/pages/business-site";
import SkillsPage from "@/pages/skills";
import CustomersPage from "@/pages/customers";
import CeoPage from "@/pages/ceo";
import NotFound from "@/pages/not-found";
import { PasswordGate } from "@/components/password-gate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function Router() {
  const [isSiteRoute] = useRoute("/sites/:businessId");

  if (isSiteRoute) {
    return (
      <Switch>
        <Route path="/sites/:businessId" component={BusinessSitePage} />
      </Switch>
    );
  }

  return (
    <PasswordGate>
      <Shell>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/businesses/:id" component={BusinessDetail} />
          <Route path="/businesses/:id/tasks/:taskId" component={TaskDetail} />
          <Route path="/agent-runs" component={AgentRuns} />
          <Route path="/skills" component={SkillsPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/ceo" component={CeoPage} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </PasswordGate>
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

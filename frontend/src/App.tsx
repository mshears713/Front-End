import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiInspectorProvider } from "@/contexts/ApiInspectorContext";
import { AppLayout } from "@/components/Layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FrameworksOverview from "./pages/FrameworksOverview";
import ApiBasics from "./pages/ApiBasics";
import Forms from "./pages/Forms";
import Items from "./pages/Items";
import Jobs from "./pages/Jobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ApiInspectorProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/frameworks" element={<FrameworksOverview />} />
              <Route path="/api-basics" element={<ApiBasics />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/items" element={<Items />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ApiInspectorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

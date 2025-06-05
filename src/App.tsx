import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductPerformancePage from "./pages/ProductPerformancePage";
import CustomerInsightsPage from "./pages/CustomerInsightsPage";
import AnalyticsReportsPage from "./pages/AnalyticsReportsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardOverviewPage />} />
          <Route path="/orders-management" element={<OrdersManagementPage />} />
          <Route path="/product-performance" element={<ProductPerformancePage />} />
          <Route path="/customer-insights" element={<CustomerInsightsPage />} />
          <Route path="/analytics-reports" element={<AnalyticsReportsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
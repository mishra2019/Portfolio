import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PortfolioProvider } from "./hooks/PortfolioProvider";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </QueryClientProvider>,
);

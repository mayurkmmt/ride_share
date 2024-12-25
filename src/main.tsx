import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RoutesList from "./routes/RoutesList.tsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <RoutesList />
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);

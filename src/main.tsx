import React from "react";
import "./i18n/index.ts";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";

// Add error handler for uncaught runtime errors
window.addEventListener("error", (event) => {
  // Ignore Chrome extension related errors
  if (event.message.includes("runtime.lastError")) {
    event.preventDefault();
    return;
  }
});

TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode className="flex">
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

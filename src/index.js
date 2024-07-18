import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BlogContextProvider } from "./context/BlogContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

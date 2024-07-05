import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/forms.css";
import "./styles/compatability.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

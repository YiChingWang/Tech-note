import react from "react";
import reactdom from "react-dom/client";
import App from "./App";

const el = document.getElementById("root");
const root = reactdom.createRoot(el);
root.render(<App />);

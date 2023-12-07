import { createRoot } from "react-dom/client";
import App from "~/components/core/app";

const domNode = document.getElementById("root");
const root = domNode && createRoot(domNode);

root?.render(<App />);

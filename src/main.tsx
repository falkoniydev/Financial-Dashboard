import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import "animate.css";

createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<App />
	</AppProvider>
);

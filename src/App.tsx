import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dinamik Background Image Component
const DynamicBackground: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const location = useLocation();

	// Har bir sahifa uchun background image
	const getBackgroundImage = () => {
		switch (location.pathname) {
			case "/":
				return "url('/bg13.avif')";
			case "/transactions":
				return "url('/bg14.avif')";
			case "/reports":
				return "url('/bg.jpg')";
			default:
				return "url('/images/default-bg.jpg')";
		}
	};

	return (
		<div
			style={{
				backgroundImage: getBackgroundImage(),
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
				transition: "background 0.5s ease-in-out", // Smooth transition
				backgroundAttachment: "fixed",
			}}
		>
			{children}
		</div>
	);
};

function App() {
	return (
		<Router>
			<DynamicBackground>
				<ToastContainer
					position="top-right"
					autoClose={3000}
				/>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/transactions"
						element={<Transactions />}
					/>
					<Route
						path="/reports"
						element={<Reports />}
					/>
				</Routes>
			</DynamicBackground>
		</Router>
	);
}

export default App;

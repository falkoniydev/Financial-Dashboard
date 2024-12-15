import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<Router>
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
		</Router>
	);
}

export default App;

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	// Toggle menyuni ochish yoki yopish
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Sahifa yangilansa, menyuni yopish
	useEffect(() => {
		setIsOpen(false);
	}, [location]);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<NavLink
					className="navbar-brand d-flex align-items-center"
					to="/"
				>
					<img
						src="/logo.png"
						alt="Logo"
						width="50"
						height="50"
						className="me-2"
					/>
					<span className="fw-bold fs-4 text-white">Moliyaviy Panel</span>
				</NavLink>

				{/* Burger Menu */}
				<button
					className="navbar-toggler border-0"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded={isOpen ? "true" : "false"}
					aria-label="Toggle navigation"
					onClick={toggleMenu}
				>
					{isOpen ? (
						<span className="close-icon">&times;</span>
					) : (
						<span className="navbar-toggler-icon"></span>
					)}
				</button>

				{/* NavLinks */}
				<div
					className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
					id="navbarNav"
				>
					<ul
						className="navbar-nav ms-auto text-center"
						style={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
							gap: "20px",
							fontWeight: "bold",
						}}
					>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/"
								onClick={() => setIsOpen(false)}
							>
								Asosiy
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/transactions"
								onClick={() => setIsOpen(false)}
							>
								Tranzaksiyalar
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/reports"
								onClick={() => setIsOpen(false)}
							>
								Hisobotlar
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const Navbar: React.FC = () => {
// 	return (
// 		<nav className="navbar navbar-expand-lg navbar-dark">
// 			<div className="container">
// 				<NavLink
// 					className="navbar-brand d-flex align-items-center"
// 					to="/"
// 				>
// 					<img
// 						src="/logo.png"
// 						alt="Logo"
// 						width="50"
// 						height="50"
// 						className="me-2"
// 					/>
// 					<span className="fw-bold fs-4 text-white">Moliyaviy Panel</span>
// 				</NavLink>

// 				{/* Burger Menu */}
// 				<button
// 					className="navbar-toggler border-0"
// 					type="button"
// 					data-bs-toggle="collapse"
// 					data-bs-target="#navbarNav"
// 					aria-controls="navbarNav"
// 					aria-expanded="false"
// 					aria-label="Toggle navigation"
// 				>
// 					<span className="navbar-toggler-icon"></span>
// 				</button>

// 				{/* NavLinks */}
// 				<div
// 					className="collapse navbar-collapse"
// 					id="navbarNav"
// 				>
// 					<ul
// 						className="navbar-nav ms-auto text-center"
// 						style={{
// 							display: "flex",
// 							justifyContent: "space-around",
// 							alignItems: "center",
// 							gap: "20px",
// 							fontWeight: "bold",
// 						}}
// 					>
// 						<li className="nav-item">
// 							<NavLink
// 								className="nav-link"
// 								to="/"
// 								end
// 							>
// 								Asosiy
// 							</NavLink>
// 						</li>
// 						<li className="nav-item">
// 							<NavLink
// 								className="nav-link"
// 								to="/transactions"
// 							>
// 								Tranzaksiyalar
// 							</NavLink>
// 						</li>
// 						<li className="nav-item">
// 							<NavLink
// 								className="nav-link"
// 								to="/reports"
// 							>
// 								Hisobotlar
// 							</NavLink>
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

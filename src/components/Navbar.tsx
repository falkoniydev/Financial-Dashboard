// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         <Link className="navbar-brand" to="/">Moliyaviy Panel</Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Asosiy</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/transactions">Tranzaksiyalar</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/reports">Hisobotlar</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<Link
					className="navbar-brand"
					to="/"
				>
					Moliyaviy Panel
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNav"
				>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/"
							>
								Asosiy
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/transactions"
							>
								Tranzaksiyalar
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/reports"
							>
								Hisobotlar
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
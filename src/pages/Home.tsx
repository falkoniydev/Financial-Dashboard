import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import { useAppContext } from "../context/AppContext";

const Home: React.FC = () => {
	const { totalIncome, totalExpense } = useAppContext();

	return (
		<div className="container mt-4">
			<h2 className="text-center mb-4">Asosiy Panel</h2>
			<div className="row g-3">
				<div className="col-md-4">
					<div className="card text-white bg-success mb-3">
						<div className="card-body">
							<h5 className="card-title">Jami Daromad</h5>
							<p className="card-text">${totalIncome}</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-danger mb-3">
						<div className="card-body">
							<h5 className="card-title">Jami Xarajat</h5>
							<p className="card-text">${totalExpense}</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-primary mb-3">
						<div className="card-body">
							<h5 className="card-title">Sof Balans</h5>
							<p className="card-text">${totalIncome - totalExpense}</p>
						</div>
					</div>
				</div>
			</div>
			<CurrencyConverter />
		</div>
	);
};

export default Home;

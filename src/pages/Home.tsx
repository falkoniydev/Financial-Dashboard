import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import { useAppContext } from "../context/AppContext";
import ExchangeInfo from "../components/ExchangeInfo";

const Home: React.FC = () => {
	const { totalIncome, totalExpense } = useAppContext();

	// Valyuta formatlash funksiyasi
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(value);
	};

	return (
		<div className="container mt-4">
			<h2
				className="text-center mb-4"
				style={{
					color: "white",
				}}
			>
				Asosiy Panel
			</h2>
			<div className="row g-3">
				<div className="col-md-4">
					<div className="card text-white mb-3 income">
						<div className="card-body">
							<h5 className="card-title">Jami Daromad</h5>
							<p className="card-text">{formatCurrency(totalIncome)}</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white mb-3 expense">
						<div className="card-body">
							<h5 className="card-title">Jami Xarajat</h5>
							<p className="card-text">{formatCurrency(totalExpense)}</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white mb-3 balance">
						<div className="card-body">
							<h5 className="card-title">Sof Balans</h5>
							<p className="card-text">
								{formatCurrency(totalIncome - totalExpense)}
							</p>
						</div>
					</div>
				</div>
			</div>
			<CurrencyConverter />
			<ExchangeInfo />
		</div>
	);
};

export default Home;

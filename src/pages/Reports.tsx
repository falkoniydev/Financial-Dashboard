import React, { useState } from "react";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import { useAppContext } from "../context/AppContext";

const Reports: React.FC = () => {
	const { transactions } = useAppContext();

	// Sana uchun filter state
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	// Sana bo‘yicha tranzaksiyalarni filterlash
	const filteredTransactions = transactions.filter((txn) => {
		const txnDate = new Date(txn.date);
		const start = startDate ? new Date(startDate) : null;
		const end = endDate ? new Date(endDate) : null;

		return (!start || txnDate >= start) && (!end || txnDate <= end);
	});

	return (
		<div
			className="container mt-4"
			style={{
				color: "white",
			}}
		>
			<h2 className="text-center mb-4">HISOBOTLAR</h2>

			{/* Sana Filtrlari */}
			<div className="row mb-4">
				<div className="col-md-6">
					<label
						htmlFor="startDate"
						className="form-label"
					>
						Boshlanish sanasi:
					</label>
					<input
						type="date"
						id="startDate"
						className="form-control"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<div className="col-md-6">
					<label
						htmlFor="endDate"
						className="form-label"
					>
						Tugash sanasi:
					</label>
					<input
						type="date"
						id="endDate"
						className="form-control"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>

			{/* Diagrammalar */}
			<div className="row">
				<div className="col-md-6">
					<PieChart transactions={filteredTransactions} />
				</div>
				<div className="col-md-6">
					<BarChart transactions={filteredTransactions} />
				</div>
			</div>
		</div>
	);
};

export default Reports;

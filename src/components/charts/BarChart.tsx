import React from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppContext } from "../../context/AppContext";

// Chart.js modullarini ro‘yxatdan o‘tkazish
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart: React.FC = () => {
	const { transactions } = useAppContext();

	const dates = [
		...new Set(
			transactions.map((t) =>
				t.date ? new Date(t.date).toLocaleDateString() : "No Date"
			)
		),
	];

	const incomeData = dates.map((date) =>
		transactions
			.filter(
				(t) =>
					t.type === "income" &&
					t.date &&
					new Date(t.date).toLocaleDateString() === date
			)
			.reduce((sum, t) => sum + (t.amount || 0), 0)
	);

	const expenseData = dates.map((date) =>
		transactions
			.filter(
				(t) =>
					t.type === "expense" &&
					t.date &&
					new Date(t.date).toLocaleDateString() === date
			)
			.reduce((sum, t) => sum + (t.amount || 0), 0)
	);

	const data = {
		labels: dates,
		datasets: [
			{
				label: "Daromad",
				backgroundColor: "#4CAF50",
				data: incomeData,
			},
			{
				label: "Xarajat",
				backgroundColor: "#F44336",
				data: expenseData,
			},
		],
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Daromad va Xarajatlar</h3>
				<Bar data={data} />
			</div>
		</div>
	);
};

export default BarChart;

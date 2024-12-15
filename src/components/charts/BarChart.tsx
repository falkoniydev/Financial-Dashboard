// import React from "react";
// import {
// 	Chart as ChartJS,
// 	BarElement,
// 	CategoryScale,
// 	LinearScale,
// 	Tooltip,
// 	Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { useAppContext } from "../../context/AppContext";

// // Chart.js modullarini ro‘yxatdan o‘tkazish
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const BarChart: React.FC = () => {
// 	const { transactions } = useAppContext();

// 	const dates = [
// 		...new Set(
// 			transactions.map((t) =>
// 				t.date ? new Date(t.date).toLocaleDateString() : "No Date"
// 			)
// 		),
// 	];

// 	const incomeData = dates.map((date) =>
// 		transactions
// 			.filter(
// 				(t) =>
// 					t.type === "income" &&
// 					t.date &&
// 					new Date(t.date).toLocaleDateString() === date
// 			)
// 			.reduce((sum, t) => sum + (t.amount || 0), 0)
// 	);

// 	const expenseData = dates.map((date) =>
// 		transactions
// 			.filter(
// 				(t) =>
// 					t.type === "expense" &&
// 					t.date &&
// 					new Date(t.date).toLocaleDateString() === date
// 			)
// 			.reduce((sum, t) => sum + (t.amount || 0), 0)
// 	);

// 	const data = {
// 		labels: dates,
// 		datasets: [
// 			{
// 				label: "Daromad",
// 				backgroundColor: "#4CAF50",
// 				data: incomeData,
// 			},
// 			{
// 				label: "Xarajat",
// 				backgroundColor: "#F44336",
// 				data: expenseData,
// 			},
// 		],
// 	};

// 	return (
// 		<div className="card shadow mt-4">
// 			<div className="card-body">
// 				<h3 className="card-title text-center">Daromad va Xarajatlar</h3>
// 				<Bar data={data} />
// 			</div>
// 		</div>
// 	);
// };

// export default BarChart;

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
import { Transaction } from "../../types/Transaction";

// Chart.js modullarini ro‘yxatdan o‘tkazish
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
	transactions: Transaction[];
}

const BarChart: React.FC<BarChartProps> = ({ transactions }) => {
	// Sanalarni yig‘ish va unique qilib olish
	const dates = [
		...new Set(
			transactions.map((t) =>
				t.date ? new Date(t.date).toLocaleDateString() : "No Date"
			)
		),
	];

	// Daromad va xarajatlar ma'lumotlarini hisoblash
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

	// Diagramma ma'lumotlari
	const data = {
		labels: dates,
		datasets: [
			{
				label: "Daromad",
				backgroundColor: "#4CAF50", // Yashil
				data: incomeData,
			},
			{
				label: "Xarajat",
				backgroundColor: "#F44336", // Qizil
				data: expenseData,
			},
		],
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Daromad va Xarajatlar</h3>
				{dates.length > 0 ? (
					<Bar data={data} />
				) : (
					<p className="text-center">Ma'lumot topilmadi</p>
				)}
			</div>
		</div>
	);
};

export default BarChart;

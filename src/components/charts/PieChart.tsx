import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Transaction } from "../../types/Transaction";

// Chart.js modullarini ro‘yxatdan o‘tkazish
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
	transactions: Transaction[];
}

const PieChart: React.FC<PieChartProps> = ({ transactions }) => {
	// Xarajat kategoriyalarini hisoblash
	const expenseCategories = transactions
		.filter((t) => t.type === "expense" && t.category)
		.reduce((categories, t) => {
			if (t.category) {
				categories[t.category] =
					(categories[t.category] || 0) + (t.amount || 0);
			}
			return categories;
		}, {} as Record<string, number>);

	const data = {
		labels: Object.keys(expenseCategories),
		datasets: [
			{
				data: Object.values(expenseCategories),
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
				],
			},
		],
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Xarajat Kategoriyalari</h3>
				{Object.keys(expenseCategories).length > 0 ? (
					<Pie data={data} />
				) : (
					<p className="text-center">Ma'lumot topilmadi</p>
				)}
			</div>
		</div>
	);
};

export default PieChart;

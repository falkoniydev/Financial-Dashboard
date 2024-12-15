import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";

const Reports: React.FC = () => {
	return (
		<div className="container mt-4">
			<h2 className="text-center mb-4">Hisobotlar</h2>
			<div className="row">
				<div className="col-md-6">
					<PieChart />
				</div>
				<div className="col-md-6">
					<BarChart />
				</div>
			</div>
		</div>
	);
};

export default Reports;

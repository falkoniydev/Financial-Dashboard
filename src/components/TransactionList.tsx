import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { exportToCSV } from "../utils/exportToCSV";
import { toast } from "react-toastify";
import { exportToPDF } from "../utils/exportToPDF";

const TransactionList: React.FC = () => {
	const { transactions, totalIncome, totalExpense, removeTransaction } =
		useAppContext();
	const [selectedDate, setSelectedDate] = useState<string>(""); // Sana holati

	// Sanaga ko'ra tranzaksiyalarni filtrlash
	const filteredTransactions = selectedDate
		? transactions.filter((txn) => txn.date.startsWith(selectedDate))
		: transactions;

	const deleteTransactions = (id: number) => {
		if (window.confirm("Tranzaksiyalarni o'chirishni xizmat qilasizmi?")) {
			removeTransaction(id);
			toast.error("Tranzaksiya o‘chirildi!");
		}
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Tranzaksiya Ro‘yxati</h3>
				{/* Sana Filtri */}
				<div className="mb-3">
					<label className="form-label">Sanani Tanlang:</label>
					<input
						type="date"
						className="form-control"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
					/>
				</div>

				{/* Filtrlangan tranzaksiyalar */}
				<ul className="list-group">
					{filteredTransactions.map((txn) => (
						<li
							key={txn.id}
							className="list-group-item d-flex justify-content-between align-items-center"
						>
							<span>
								{txn.category} - {txn.type === "income" ? "Daromad" : "Xarajat"}
							</span>
							<span>
								{txn.amount}
								<button
									className="btn btn-sm btn-danger ms-3"
									onClick={() => deleteTransactions(txn.id)}
								>
									O‘chirish
								</button>
							</span>
						</li>
					))}
				</ul>

				{/* Jami Ma'lumot */}
				<div className="mt-3 text-center">
					<h5>Jami Daromad: ${totalIncome}</h5>
					<h5>Jami Xarajat: ${totalExpense}</h5>
					<h5>Sof Balans: ${totalExpense ? totalIncome - totalExpense : 0}</h5>
				</div>
			</div>

			<div className="">
				<button
					className="btn btn-sm btn-secondary mb-3 mx-3"
					onClick={() => exportToCSV(filteredTransactions, "transactions")}
				>
					CSV/Excel Yuklash
				</button>

				<button
					className="btn btn-sm btn-success mb-3"
					onClick={() =>
						exportToPDF(filteredTransactions, "transactions-report")
					}
				>
					PDF Yuklash
				</button>
			</div>
		</div>
	);
};

export default TransactionList;

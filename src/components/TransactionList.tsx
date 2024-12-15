import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToPDF } from "../utils/exportToPDF";

const TransactionList: React.FC = () => {
	const { transactions, removeTransaction } = useAppContext();

	// Modal uchun state
	const [showModal, setShowModal] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState<
		number | null
	>(null);

	// Filter uchun state
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	// Modalni ochish
	const confirmDeleteTransaction = (id: number) => {
		setSelectedTransactionId(id);
		setShowModal(true);
	};

	// Modalni yopish
	const closeModal = () => setShowModal(false);

	// Tranzaksiyani o‘chirish
	const deleteTransaction = () => {
		if (selectedTransactionId !== null) {
			removeTransaction(selectedTransactionId);
			setShowModal(false);
		}
	};

	// Jami daromad va xarajatlarni hisoblash
	const totalIncome = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpense = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + t.amount, 0);

	const netBalance = totalIncome - totalExpense;

	// Sana va kategoriya bo‘yicha filterlash
	const filteredTransactions = transactions.filter((txn) => {
		const matchesDate = selectedDate ? txn.date === selectedDate : true;
		const matchesCategory = selectedCategory
			? txn.category === selectedCategory
			: true;
		return matchesDate && matchesCategory;
	});

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Tranzaksiya Ro‘yxati</h3>

				{/* Filterlar */}
				<div className="row mb-3">
					<div className="col-md-6">
						<label className="form-label">Sanani tanlang:</label>
						<input
							type="date"
							className="form-control"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">Kategoriyani tanlang:</label>
						<select
							className="form-select"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							<option value="">Barchasi</option>
							<option value="Ovqatlanish">Ovqatlanish</option>
							<option value="Transport">Transport</option>
							<option value="Kommunal to'lovlar">Kommunal to'lovlar</option>
							<option value="Kiyim-kechak">Kiyim-kechak</option>
							<option value="Sog'liqni saqlash">Sog'liqni saqlash</option>
							<option value="Ta'lim">Ta'lim</option>
							<option value="Dam olish">Dam olish</option>
							<option value="Uy-joy">Uy-joy</option>
							<option value="Texnologiya">Texnologiya</option>
							<option value="Daromad">Daromad</option>
							<option value="Boshqa xarajatlar">Boshqa xarajatlar</option>
						</select>
					</div>
				</div>

				{/* Filterlangan jadval */}
				{filteredTransactions.length === 0 ? (
					<p className="text-center">Mos keladigan tranzaksiyalar topilmadi.</p>
				) : (
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<thead className="table-dark text-center">
								<tr>
									<th>#</th>
									<th>Kategoriya</th>
									<th>Miqdor</th>
									<th>Sana</th>
									<th>Izoh</th>
									<th>Amallar</th>
								</tr>
							</thead>
							<tbody>
								{filteredTransactions.map((txn, index) => (
									<tr
										key={txn.id}
										className="text-center align-middle"
									>
										<td>{index + 1}</td>
										<td>{txn.category}</td>
										<td
											className={`fw-bold ${
												txn.type === "income" ? "text-success" : "text-danger"
											}`}
										>
											${txn.amount.toLocaleString()}
										</td>
										<td>{txn.date}</td>
										<td>{txn.description || "Izoh kiritilmagan"}</td>
										<td>
											<button
												className="btn btn-sm btn-danger"
												onClick={() => confirmDeleteTransaction(txn.id)}
											>
												O‘chirish
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* Jami daromad, jami xarajat, va sof balans */}
				<div className="mt-3 text-center">
					<h5>
						Jami Daromad:{" "}
						<span className="text-success">
							${totalIncome.toLocaleString()}
						</span>
					</h5>
					<h5>
						Jami Xarajat:{" "}
						<span className="text-danger">
							${totalExpense.toLocaleString()}
						</span>
					</h5>
					<h5>
						Sof Balans:{" "}
						<span
							className={`fw-bold ${
								netBalance >= 0 ? "text-success" : "text-danger"
							}`}
						>
							${netBalance.toLocaleString()}
						</span>
					</h5>
				</div>

				{/* CSV va PDF yuklash tugmalari */}
				<div className="d-flex justify-content-center mt-4">
					<button
						className="btn btn-secondary me-2"
						onClick={() => exportToCSV(transactions, "transactions")}
					>
						CSV/Excel Yuklash
					</button>
					<button
						className="btn btn-success"
						onClick={() => exportToPDF(transactions, "transactions-report")}
					>
						PDF Yuklash
					</button>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div
					className="modal fade show d-block"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Tranzaksiyani O‘chirish</h5>
								<button
									type="button"
									className="btn-close"
									onClick={closeModal}
								></button>
							</div>
							<div className="modal-body text-center">
								<p className="lead">
									Tranzaksiyani o‘chirishni tasdiqlaysizmi?
								</p>
							</div>
							<div className="modal-footer d-flex justify-content-center">
								<button
									className="btn btn-danger"
									onClick={deleteTransaction}
								>
									Ha, o‘chir
								</button>
								<button
									className="btn btn-secondary"
									onClick={closeModal}
								>
									Yo‘q, bekor qil
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TransactionList;

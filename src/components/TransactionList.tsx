// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";

// const TransactionList: React.FC = () => {
// 	const { transactions, removeTransaction } = useAppContext();
// 	const [selectedTransactionId, setSelectedTransactionId] = useState<
// 		number | null
// 	>(null);
// 	const [showModal, setShowModal] = useState<boolean>(false);

// 	// Modalni ochish
// 	const confirmDeleteTransaction = (id: number) => {
// 		setSelectedTransactionId(id);
// 		setShowModal(true);
// 	};

// 	// Tranzaksiyani o‘chirish
// 	const deleteTransaction = () => {
// 		if (selectedTransactionId !== null) {
// 			removeTransaction(selectedTransactionId);
// 			setShowModal(false);
// 		}
// 	};

// 	// Modalni yopish
// 	const closeModal = () => setShowModal(false);

// 	return (
// 		<div className="card shadow mt-4">
// 			<div className="card-body">
// 				<h3 className="card-title text-center">Tranzaksiya Ro‘yxati</h3>

// 				{transactions.length === 0 ? (
// 					<p className="text-center">
// 						Hali hech qanday tranzaksiya qo‘shilmagan.
// 					</p>
// 				) : (
// 					<div className="table-responsive">
// 						<table className="table table-bordered table-hover">
// 							<thead className="table-dark text-center">
// 								<tr>
// 									<th>#</th>
// 									<th>Kategoriya</th>
// 									<th>Miqdor</th>
// 									<th>Sana</th>
// 									<th>Izoh</th>
// 									<th>Amallar</th>
// 								</tr>
// 							</thead>
// 							<tbody>
// 								{transactions.map((txn, index) => (
// 									<tr
// 										key={txn.id}
// 										className="text-center align-middle"
// 									>
// 										<td>{index + 1}</td>
// 										<td>{txn.category}</td>
// 										<td
// 											className={`fw-bold ${
// 												txn.type === "income" ? "text-success" : "text-danger"
// 											}`}
// 										>
// 											${txn.amount.toLocaleString()}
// 										</td>
// 										<td>{txn.date}</td>
// 										<td>{txn.description || "Izoh kiritilmagan"}</td>
// 										<td>
// 											<button
// 												className="btn btn-sm btn-danger"
// 												onClick={() => confirmDeleteTransaction(txn.id)}
// 											>
// 												O‘chirish
// 											</button>
// 										</td>
// 									</tr>
// 								))}
// 							</tbody>
// 						</table>
// 					</div>
// 				)}
// 			</div>

// 			{/* Chiroyli va Animatsiyali Modal */}
// 			{showModal && (
// 				<div
// 					className="modal fade show d-block custom-modal-bg"
// 					tabIndex={-1}
// 					role="dialog"
// 				>
// 					<div
// 						className="modal-dialog modal-dialog-centered"
// 						role="document"
// 					>
// 						<div className="modal-content custom-modal">
// 							<div className="modal-header">
// 								<h5 className="modal-title">Tranzaksiyani O‘chirish</h5>
// 								<button
// 									type="button"
// 									className="btn-close"
// 									onClick={closeModal}
// 								></button>
// 							</div>
// 							<div className="modal-body text-center">
// 								<p className="lead">
// 									Tranzaksiyani o‘chirishni tasdiqlaysizmi?
// 								</p>
// 							</div>
// 							<div className="modal-footer d-flex justify-content-center">
// 								<button
// 									className="btn btn-danger"
// 									onClick={deleteTransaction}
// 								>
// 									Ha, o‘chir
// 								</button>
// 								<button
// 									className="btn btn-secondary"
// 									onClick={closeModal}
// 								>
// 									Yo‘q, bekor qil
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default TransactionList;

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToPDF } from "../utils/exportToPDF";

const TransactionList: React.FC = () => {
	const { transactions, removeTransaction } = useAppContext();
	const [selectedTransactionId, setSelectedTransactionId] = useState<
		number | null
	>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	// Modalni ochish
	const confirmDeleteTransaction = (id: number) => {
		setSelectedTransactionId(id);
		setShowModal(true);
	};

	// Tranzaksiyani o‘chirish
	const deleteTransaction = () => {
		if (selectedTransactionId !== null) {
			removeTransaction(selectedTransactionId);
			setShowModal(false);
		}
	};

	// Modalni yopish
	const closeModal = () => setShowModal(false);

	// Jami daromad va xarajatlarni hisoblash
	const totalIncome = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpense = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + t.amount, 0);

	const netBalance = totalIncome - totalExpense;

	return (
		<div
			className="card shadow mt-4 balance"
			style={{
				color: "white",
			}}
		>
			<div className="card-body">
				<h3 className="card-title text-center">Tranzaksiya Ro‘yxati</h3>

				{transactions.length === 0 ? (
					<p className="text-center">
						Hali hech qanday tranzaksiya qo‘shilmagan.
					</p>
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
								{transactions.map((txn, index) => (
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

			{/* Chiroyli va Animatsiyali Modal */}
			{showModal && (
				<div
					className="modal fade show d-block custom-modal-bg"
					tabIndex={-1}
					role="dialog"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						role="document"
					>
						<div className="modal-content custom-modal">
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

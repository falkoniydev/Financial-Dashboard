import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Transactions: React.FC = () => {
	return (
		<div className="container mt-4 transactions">
			<h2
				className="text-center mb-4"
				style={{
					color: "#ffffff",
					fontWeight: "bold",
					background: "black",
				}}
			>
				Tranzaksiyalarni Boshqarish
			</h2>
			<TransactionForm />
			<TransactionList />
		</div>
	);
};

export default Transactions;

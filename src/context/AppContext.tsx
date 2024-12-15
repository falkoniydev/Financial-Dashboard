import React, { createContext, useState, useContext, useEffect } from "react";
import { Transaction } from "../types/Transaction";

interface AppContextProps {
	transactions: Transaction[];
	addTransaction: (transaction: Transaction) => void;
	removeTransaction: (id: number) => void;
	totalIncome: number;
	totalExpense: number;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [transactions, setTransactions] = useState<Transaction[]>(() => {
		const saved = localStorage.getItem("transactions");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("transactions", JSON.stringify(transactions));
	}, [transactions]);

	const addTransaction = (transaction: Transaction) => {
		const cleanTransaction = {
			...transaction,
			amount: Number(transaction.amount), // amount ni numberga aylantirish
		};
		setTransactions([...transactions, cleanTransaction]);
	};

	const removeTransaction = (id: number) => {
		setTransactions(transactions.filter((t) => t.id !== id));
	};

	const totalIncome = transactions
		.filter((t) => t.type === "income" && typeof t.amount === "number")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpense = transactions
		.filter((t) => t.type === "expense" && typeof t.amount === "number")
		.reduce((sum, t) => sum + t.amount, 0);

	return (
		<AppContext.Provider
			value={{
				transactions,
				addTransaction,
				removeTransaction,
				totalIncome,
				totalExpense,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};

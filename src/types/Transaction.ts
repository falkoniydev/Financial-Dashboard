// types/Transaction.ts
export interface Transaction {
	id: number;
	amount: number;
	category: string;
	type: "income" | "expense" | string;
	date: string;
	description?: string; // Izoh ixtiyoriy bo'lishi mumkin
}

export interface FormData {
	amount: string; // Miqdor
	category: string; // Kategoriya
	date: string; // Sana
	description: string; // Izoh
	type: "income" | "expense" | string;
	currency: string; // Valyuta
}
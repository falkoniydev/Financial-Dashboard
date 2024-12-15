export interface Transaction {
	id: number ;
	amount: number;
	category?: string;
	type?: "income" | "expense" | undefined | string; // Daromad yoki xarajat
	date: string;
	note?: string;
	currency?: string; // Valyuta turi (USD, EUR, UZS)
}

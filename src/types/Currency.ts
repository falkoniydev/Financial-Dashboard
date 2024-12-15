export interface CurrencyRate {
	base: string;
	rates: {
		[key: string]: number; // Masalan, { USD: 1.0, EUR: 0.84, UZS: 11500 }
	};
}

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useExchangeRates = () => {
	const [rates, setRates] = useState<Record<string, number>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await fetch(API_URL);
				const data = await response.json();
				if (data.result === "success") {
					setRates(data.conversion_rates);
				} else {
					setError("API ma’lumotlarini olishda xatolik yuz berdi.");
				}
				setLoading(false);
				console.log(data);
			} catch (err) {
				setError("Valyuta ma’lumotlarini olishda xatolik.");
				setLoading(false);
			}
		};
		fetchRates();
	}, []);

	return { rates, loading, error };
};

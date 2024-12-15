import React, { useEffect, useState } from "react";

interface ExchangeRates {
	uzs: number;
	eur: number;
	gbp: number;
}

const ExchangeInfo: React.FC = () => {
	const [rates, setRates] = useState<ExchangeRates | null>(null);
	const [previousRates, setPreviousRates] = useState<ExchangeRates | null>(
		null
	); // Oldingi kurslar
	const [loading, setLoading] = useState<boolean>(true);

	const API_URL = import.meta.env.VITE_API_URL; // API kalitingizni kiriting

	// API dan ma'lumot olish
	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await fetch(API_URL);
				const data = await response.json();

				// Oldingi kurslarni saqlash
				setPreviousRates(rates);

				// Yangi kurslarni saqlash
				setRates({
					uzs: data.conversion_rates.UZS,
					eur: data.conversion_rates.EUR,
					gbp: data.conversion_rates.GBP,
				});
			} catch (error) {
				console.error("Valyuta kurslarini olishda xatolik:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRates();
	}, []);

	// O‘zgarishlarni aniqlash
	const getChangeSymbol = (current: number, previous: number | undefined) => {
		if (previous === undefined) return null;
		return current > previous ? "📈" : current < previous ? "📉" : "➖";
	};

	return (
		<div className="container mt-5">
			<div
				className="card shadow p-4"
				style={{
					backgroundImage: "url('/bgexchange.avif')",
					color: "white",
				}}
			>
				<h4 className="text-center mb-4">Dollarning Joriy Kursi ($1 uchun)</h4>
				{loading ? (
					<div className="text-center">
						<div
							className="spinner-border text-primary"
							role="status"
						>
							<span className="visually-hidden">Yuklanmoqda...</span>
						</div>
					</div>
				) : (
					<div className="row text-center">
						{/* So‘m */}
						<div className="col-md-4 mb-3">
							<div
								className="p-3 border rounded bg-light animate__animated animate__fadeIn"
								style={{
									backgroundImage: "url('/bgexchange.avif')",
								}}
							>
								<h5>So'm (UZS)</h5>
								<p className="fw-bold">
									{rates?.uzs.toLocaleString()} UZS{" "}
									{previousRates &&
										getChangeSymbol(rates!.uzs, previousRates.uzs)}
								</p>
							</div>
						</div>
						{/* Euro */}
						<div className="col-md-4 mb-3">
							<div
								className="p-3 border rounded bg-light animate__animated animate__fadeIn"
								style={{
									backgroundImage: "url('/bgexchange.avif')",
								}}
							>
								<h5>Yevro (EUR)</h5>
								<p className="fw-bold">
									{rates?.eur.toLocaleString()} EUR{" "}
									{previousRates &&
										getChangeSymbol(rates!.eur, previousRates.eur)}
								</p>
							</div>
						</div>
						{/* Funt Sterling */}
						<div className="col-md-4 mb-3">
							<div
								className="p-3 border rounded bg-light animate__animated animate__fadeIn"
								style={{
									backgroundImage: "url('/bgexchange.avif')",
								}}
							>
								<h5>Funt Sterling (GBP)</h5>
								<p className="fw-bold">
									{rates?.gbp.toLocaleString()} GBP{" "}
									{previousRates &&
										getChangeSymbol(rates!.gbp, previousRates.gbp)}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExchangeInfo;

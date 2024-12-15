// import React, { useState } from "react";
// import { useExchangeRates } from "../hooks/useExchangeRates";

// const CurrencyConverter: React.FC = () => {
// 	const { rates, loading, error } = useExchangeRates();
// 	const [amount, setAmount] = useState<number>(0);
// 	const [fromCurrency, setFromCurrency] = useState<string>("USD");
// 	const [toCurrency, setToCurrency] = useState<string>("EUR");

// 	const convert = () => {
// 		if (rates[fromCurrency] && rates[toCurrency]) {
// 			return ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2);
// 		}
// 		return "0.00";
// 	};

// 	if (loading) return <div className="text-center">Yuklanmoqda...</div>;
// 	if (error) return <div className="text-center text-danger">{error}</div>;

// 	return (
// 		<div className="container mt-4 ">
// 			<div
// 				className="card shadow"
// 				style={{
// 					backgroundImage: "url('/bgConvertor.jpg')",
// 					color: "white",
// 				}}
// 			>
// 				<div className="card-body ">
// 					<h3 className="card-title text-center">Valyuta Ayirboshlash</h3>
// 					<div className="row g-3">
// 						<div className="col-md-4">
// 							<input
// 								type="number"
// 								className="form-control"
// 								value={amount}
// 								onChange={(e) => setAmount(Number(e.target.value))}
// 								placeholder="Miqdorni kiriting"
// 							/>
// 						</div>
// 						<div className="col-md-4">
// 							<select
// 								className="form-select"
// 								value={fromCurrency}
// 								onChange={(e) => setFromCurrency(e.target.value)}
// 							>
// 								{Object.keys(rates).map((currency) => (
// 									<option
// 										key={currency}
// 										value={currency}
// 									>
// 										{currency}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 						<div className="col-md-4">
// 							<select
// 								className="form-select"
// 								value={toCurrency}
// 								onChange={(e) => setToCurrency(e.target.value)}
// 							>
// 								{Object.keys(rates).map((currency) => (
// 									<option
// 										key={currency}
// 										value={currency}
// 									>
// 										{currency}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 					<div className="text-center mt-3">
// 						<h4>
// 							Kursga hisoblash: {convert()} {toCurrency}
// 						</h4>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CurrencyConverter;

import React, { useState } from "react";
import { useExchangeRates } from "../hooks/useExchangeRates";

const CurrencyConverter: React.FC = () => {
	const { rates, loading, error } = useExchangeRates();
	const [amount, setAmount] = useState<string>(""); // String sifatida boshqaramiz
	const [fromCurrency, setFromCurrency] = useState<string>("USD");
	const [toCurrency, setToCurrency] = useState<string>("EUR");

	// Formatlash funksiyasi
	const formatNumber = (value: string): string => {
		const numericValue = parseFloat(value.replace(/,/g, "")); // Vergulni olib tashlab raqam qilish
		if (isNaN(numericValue)) return "0.00";
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(numericValue);
	};

	// onChange: inputdagi qiymatni boshqarish
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Raqam va nuqtani qoldirish
		setAmount(rawValue); // Formatlanmagan qiymatni saqlash
	};

	// onBlur: fokusdan chiqqanda formatlash
	const handleBlur = () => {
		if (amount) {
			const formatted = formatNumber(amount);
			setAmount(formatted);
		}
	};

	// onFocus: formatni olib tashlash
	const handleFocus = () => {
		setAmount(amount.replace(/,/g, "")); // Vergullarni olib tashlash
	};

	// Konvertatsiya qilish
	const convert = () => {
		const numericAmount = parseFloat(amount.replace(/,/g, "")); // Vergulsiz qiymatni hisoblash
		if (!isNaN(numericAmount) && rates[fromCurrency] && rates[toCurrency]) {
			const result = (numericAmount / rates[fromCurrency]) * rates[toCurrency];
			return formatNumber(result.toString()); // Formatlangan natija
		}
		return "0.00";
	};

	if (loading) return <div className="text-center">Yuklanmoqda...</div>;
	if (error) return <div className="text-center text-danger">{error}</div>;

	return (
		<div className="container mt-4">
			<div
				className="card shadow"
				style={{
					backgroundImage: "url('/bgConvertor.jpg')",
					color: "white",
				}}
			>
				<div className="card-body">
					<h3 className="card-title text-center">Valyuta Ayirboshlash</h3>
					<div className="row g-3">
						<div className="col-md-4">
							<input
								type="text"
								className="form-control"
								value={amount}
								onChange={handleAmountChange}
								onBlur={handleBlur} // Fokusdan chiqqanda formatlash
								onFocus={handleFocus} // Fokusga qaytganda formatni olib tashlash
								placeholder="Miqdorni kiriting"
							/>
						</div>
						<div className="col-md-4">
							<select
								className="form-select"
								value={fromCurrency}
								onChange={(e) => setFromCurrency(e.target.value)}
							>
								{Object.keys(rates).map((currency) => (
									<option
										key={currency}
										value={currency}
									>
										{currency}
									</option>
								))}
							</select>
						</div>
						<div className="col-md-4">
							<select
								className="form-select"
								value={toCurrency}
								onChange={(e) => setToCurrency(e.target.value)}
							>
								{Object.keys(rates).map((currency) => (
									<option
										key={currency}
										value={currency}
									>
										{currency}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="text-center mt-3">
						<h4>
							Kursga hisoblash: {convert()} {toCurrency}
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrencyConverter;

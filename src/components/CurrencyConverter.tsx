// import React, { useState } from 'react';
// import { useExchangeRates } from '../hooks/useExchangeRates';

// const CurrencyConverter: React.FC = () => {
//   const { rates, loading, error } = useExchangeRates();
//   const [amount, setAmount] = useState(0);
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');

//   if (loading) return <p>Yuklanmoqda...</p>;
//   if (error) return <p>{error}</p>;

//   const convert = () => {
//     if (rates[fromCurrency] && rates[toCurrency]) {
//       return ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2);
//     }
//     return '0.00';
//   };

//   return (
//     <div>
//       <h2>Valyuta Konvertori</h2>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Miqdorni kiriting"
//       />
//       <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//         {Object.keys(rates).map((currency) => (
//           <option key={currency} value={currency}>{currency}</option>
//         ))}
//       </select>
//       <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//         {Object.keys(rates).map((currency) => (
//           <option key={currency} value={currency}>{currency}</option>
//         ))}
//       </select>
//       <p>Natija: {convert()} {toCurrency}</p>
//     </div>
//   );
// };

// export default CurrencyConverter;

import React, { useState } from "react";
import { useExchangeRates } from "../hooks/useExchangeRates";

const CurrencyConverter: React.FC = () => {
	const { rates, loading, error } = useExchangeRates();
	const [amount, setAmount] = useState<number>(0);
	const [fromCurrency, setFromCurrency] = useState<string>("USD");
	const [toCurrency, setToCurrency] = useState<string>("EUR");

	const convert = () => {
		if (rates[fromCurrency] && rates[toCurrency]) {
			return ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2);
		}
		return "0.00";
	};

	if (loading) return <div className="text-center">Yuklanmoqda...</div>;
	if (error) return <div className="text-center text-danger">{error}</div>;

	return (
		<div className="container mt-4">
			<div className="card shadow">
				<div className="card-body">
					<h3 className="card-title text-center">Valyuta Konvertori</h3>
					<div className="row g-3">
						<div className="col-md-4">
							<input
								type="number"
								className="form-control"
								value={amount}
								onChange={(e) => setAmount(Number(e.target.value))}
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
							Natija: {convert()} {toCurrency}
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrencyConverter;

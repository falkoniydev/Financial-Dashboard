import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

interface FormData {
	amount: string; // String saqlaymiz
	category: string;
	type: "income" | "expense" | string;
}

const TransactionForm: React.FC = () => {
	const { addTransaction } = useAppContext();
	const [formData, setFormData] = useState<FormData>({
		amount: "",
		category: "",
		type: "income",
	});

	// Qiymatni formatlash funksiyasi
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(value);
	};

	// onChange: toza string qiymatni saqlash
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Faqat raqam va nuqtani qoldirish
		setFormData({ ...formData, amount: rawValue || "" }); // Bo‘sh bo‘lsa, "" saqlash
	};

	// onBlur: qiymatni formatlash
	const handleBlur = () => {
		const numberValue = parseFloat(formData.amount);
		if (!isNaN(numberValue)) {
			setFormData({ ...formData, amount: formatCurrency(numberValue) }); // Formatlash
		}
	};

	// onFocus: formatni olib tashlash
	const handleFocus = () => {
		const rawValue = formData.amount.replace(/[^0-9.]/g, ""); // Formatni olib tashlash
		setFormData({ ...formData, amount: rawValue });
	};

	// Formani yuborish
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Valyuta belgilarini olib tashlab, toza qiymat olish
		const cleanedValue = formData.amount.replace(/[^0-9.]/g, ""); // Raqam va nuqtani saqlash
		const numberValue = parseFloat(cleanedValue);

		console.log("Toza qiymat:", cleanedValue);
		console.log("Number qiymat:", numberValue);

		if (!cleanedValue || isNaN(numberValue) || numberValue <= 0) {
			toast.error("Miqdor noto‘g‘ri! Iltimos, to‘g‘ri raqam kiriting.");
			return;
		}

		// Tranzaksiyani qo‘shish
		addTransaction({
			...formData,
			amount: numberValue, // Toza number qiymat
			id: Date.now(),
			date: new Date().toISOString(),
		});

		// Formani tozalash
		setFormData({ amount: "", category: "", type: "income" });
		toast.success("Yangi tranzaksiya qo‘shildi!");
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body">
				<h3 className="card-title text-center">Yangi Tranzaksiya Qo‘shish</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Miqdorni kiriting"
							value={formData.amount}
							onChange={handleChange}
							onBlur={handleBlur}
							onFocus={handleFocus}
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Kategoriya"
							value={formData.category}
							onChange={(e) =>
								setFormData({ ...formData, category: e.target.value })
							}
						/>
					</div>
					<div className="mb-3">
						<select
							className="form-select"
							value={formData.type}
							onChange={(e) =>
								setFormData({ ...formData, type: e.target.value })
							}
						>
							<option value="income">Daromad</option>
							<option value="expense">Xarajat</option>
						</select>
					</div>
					<div className="text-center">
						<button
							type="submit"
							className="btn btn-primary"
						>
							Qo‘shish
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TransactionForm;

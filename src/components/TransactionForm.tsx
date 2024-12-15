import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FormData } from "../types/Transaction";

const TransactionForm: React.FC = () => {
	const { addTransaction } = useAppContext();
	const [formData, setFormData] = useState<FormData>({
		amount: "",
		category: "",
		type: "income",
		date: new Date().toISOString().split("T")[0], // Sana qaydardirish
		description: "",
		currency: "USD", // Valyuta default qilinadi
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const cleanedValue = formData.amount.replace(/[^0-9.]/g, ""); // Faqat raqam va nuqtani olish
		const numberValue = parseFloat(cleanedValue);

		if (!cleanedValue || isNaN(numberValue) || numberValue <= 0) {
			toast.error("Miqdor noto‘g‘ri! Iltimos, to‘g‘ri raqam kiriting.");
			return;
		}

		addTransaction({
			...formData,
			amount: numberValue, // Miqdor toza raqam sifatida
			id: Date.now(),
			date: formData.date || new Date().toISOString().split("T")[0], // Sana, default bugungi sana
			description: formData.description, // Izoh
		});

		setFormData({
			amount: "",
			category: "",
			type: "income",
			date: new Date().toISOString().split("T")[0], // Sana, default bugungi sana
			description: "", // Izoh
			currency: "USD", // Valyuta default qilinadi, bu yerda sizni o‘zingizning valyutasini keltingiz
		});
		toast.success("Yangi tranzaksiya qo‘shildi!");
	};

	return (
		<div className="card shadow mt-4">
			<div className="card-body balance">
				<h3 className="card-title text-center">Yangi Tranzaksiya Qo‘shish</h3>

				<form onSubmit={handleSubmit}>
					{/* Miqdor */}
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="* Miqdorni kiriting"
							value={formData.amount}
							onChange={handleChange}
							onBlur={handleBlur}
							onFocus={handleFocus}
							required
						/>
					</div>

					{/* Kategoriya */}
					<div className="mb-3">
						<select
							id="category"
							className="form-select"
							required
							value={formData.category}
							onChange={(e) =>
								setFormData({ ...formData, category: e.target.value })
							}
						>
							<option value="">* Kategoriya tanlang</option>
							<option value="Ovqatlanish">Ovqatlanish</option>
							<option value="Transport">Transport</option>
							<option value="Kommunal to'lovlar">Kommunal to'lovlar</option>
							<option value="Kiyim-kechak">Kiyim-kechak</option>
							<option value="Sog'liqni saqlash">Sog'liqni saqlash</option>
							<option value="Ta'lim">Ta'lim</option>
							<option value="Dam olish">Dam olish</option>
							<option value="Uy-joy">Uy-joy</option>
							<option value="Texnologiya">Texnologiya</option>
							<option value="Daromad">Daromad</option>
							<option value="Boshqa xarajatlar">Boshqa xarajatlar</option>
						</select>
					</div>

					{/* Sana */}
					<div className="mb-3">
						<input
							type="date"
							required
							className="form-control"
							value={formData.date}
							onChange={(e) =>
								setFormData({ ...formData, date: e.target.value })
							}
						/>
					</div>

					{/* Izoh */}
					<div className="mb-3">
						<textarea
							className="form-control"
							placeholder="Izoh qo‘shing (Ixtiyoriy)"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={3}
						/>
					</div>

					{/* Daromad/Xarajat */}
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

					{/* Qo‘shish tugmasi */}
					<div className="text-center">
						<button
							type="submit"
							className="btn btn-lg btn-primary"
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

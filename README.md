# 💰 Moliyaviy Panel

**Moliyaviy Panel** – bu shaxsiy moliyaviy boshqaruv tizimi bo‘lib, foydalanuvchilar daromad va xarajatlarini kuzatishi, valyuta kurslarini konvertatsiya qilishi hamda ma'lumotlarni grafikalar orqali tahlil qilishi mumkin.

---

## 🚀 **Loyiha Haqida**

- **Texnologiyalar**: React, TypeScript, Bootstrap, Chart.js
- **Ma'lumotlarni Saqlash**: LocalStorage
- **API Integratsiyasi**: [ExchangeRate API](https://www.exchangerate-api.com)

---

## 📸 **Asosiy Xususiyatlar**

1. **Valyuta Konvertori**

   - Foydalanuvchi kiritgan summani boshqa valyutaga avtomatik aylantirish.
   - ExchangeRate API orqali real vaqtda valyuta kurslarini olish.

2. **Tranzaksiyalarni Boshqarish**

   - Daromad va xarajatlarni qo‘shish, saqlash va o‘chirish.
   - Kategoriyalar bo‘yicha tranzaksiyalarni guruhlash.
   - Ma'lumotlar avtomatik ravishda **LocalStorage** da saqlanadi.

3. **Grafikalar va Tahlil**

   - Doira diagramma (PieChart): Xarajat kategoriyalarini ko‘rsatish.
   - Shtab diagramma (BarChart): Daromad va xarajatlarni sanalar bo‘yicha ko‘rsatish.

4. **Yaxshi UI Dizayn**
   - Bootstrap yordamida chiroyli va responsiv dizayn.
   - Animatsiyalar orqali yumshoq o‘tishlar (React Transition Group).

---

## 🛠 **O‘rnatish Bo‘yicha Qo‘llanma**

1. **Loyihani Klonlash**
   ```bash
   git clone <repository-url>
   cd moliyaviy-panel
   ```

Bog‘lamalarni O‘rnatish

```bash
npm install
```

API Kalitini Sozlash

ExchangeRate API kalitini https://www.exchangerate-api.com saytidan oling.
.env faylini yarating va quyidagilarni qo‘shing:
```plaintext
Copy code
VITE_API_URL=https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
Loyihani Ishga Tushirish
```

```
bash
Copy code
npm run dev
```
Brauzerda Ochish

http://localhost:5173 sahifasida loyihani ko‘ring.

💻 Skrinshotlar
Asosiy Panel Tranzaksiyalar Hisobotlar
🧰 Foydalanilgan Texnologiyalar
Texnologiya Maqsad
React UI komponentlarini yaratish
TypeScript Statik tiplash va xavfsiz kod
Bootstrap Responsiv dizayn
Chart.js Grafiklar va vizualizatsiya
React Transition Group Animatsiyalar qo‘shish
LocalStorage Ma'lumotlarni saqlash
🌐 API Ma'lumotlari
Valyuta kurslari uchun ExchangeRate API ishlatilgan:
https://www.exchangerate-api.com

📝 Muallif
Ism: Shohkboz Nabiev
Kasb: Frontend Dasturchi
Bog‘lanish: LinkedIn | GitHub
⚡ Litsenziya
Bu loyiha MIT Litsenziyasi asosida tarqatiladi.

## 🔗 **Live Demo**

[Loyihani Ko‘rish](https://your-live-link.netlify.app)

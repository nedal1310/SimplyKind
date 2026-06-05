<div align="center">

<br />


### *Because every act of giving — no matter how small — changes a life.*

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-02042B?style=for-the-badge&logo=razorpay)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-Auth-purple?style=for-the-badge)

<br />

</div>

---

## 🌱 What is SimplyKind?

**SimplyKind** is a clean, fast, and secure donation platform built for the **SimplyKind Foundation** — an organization dedicated to making meaningful change through community-driven giving.

Whether it's funding mid-day meals for children, supporting education, or empowering communities — SimplyKind makes donating effortless, transparent, and human.

> *We believe kindness shouldn't be complicated.*

---

## ✨ Features

| Feature | Description |
|---|---|
| 💳 **Instant Payments** | Seamless donations via Razorpay — UPI, cards, net banking |
| 🔐 **Secure Auth** | Google OAuth login powered by NextAuth.js |
| 📊 **Donor Dashboard** | Track your donation history in one place |
| 📱 **Fully Responsive** | Looks great on any device |
| ⚡ **Blazing Fast** | Built on Next.js App Router with server-side rendering |
| 🎯 **No Distractions** | One purpose. One mission. Simple giving. |

---

## 🛠️ Tech Stack

```
Frontend      →  Next.js 15 (App Router) + Tailwind CSS
Auth          →  NextAuth.js (Google OAuth)
Database      →  MongoDB + Mongoose
Payments      →  Razorpay Payment Gateway
Hosting       →  Vercel (recommended)
```

---

## 📁 Project Structure

```
simply-kind/
│
├── app/                        # Next.js App Router
│   ├── page.js                 # Home / Landing Page
│   ├── layout.js               # Root Layout
│   ├── globals.css             # Global Styles
│   ├── about/                  # About the Foundation
│   ├── donate/                 # Donation Page
│   ├── dashboard/              # Donor Dashboard
│   ├── login/                  # Login Page
│   └── api/
│       ├── auth/[...nextauth]/ # Auth API Route
│       └── razorpay/           # Payment API Route
│
├── components/                 # Reusable UI Components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Dashboard.jsx
│   ├── PaymentPage.jsx
│   └── SessionWrapper.jsx
│
├── actions/                    # Server Actions
│   └── useractions.js
│
├── models/                     # Mongoose Models
│   ├── User.js
│   └── Payment.js
│
└── db/
    └── connectDb.js            # MongoDB Connection
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18+
- **npm** or **yarn**
- A **MongoDB** database (MongoDB Atlas recommended)
- A **Razorpay** account
- A **Google OAuth** app (via Google Cloud Console)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simply-kind.git
cd simply-kind
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💳 Payment Flow

```
User Visits /donate
      │
      ▼
Selects Amount & Clicks Donate
      │
      ▼
Razorpay Modal Opens (UPI / Card / Net Banking)
      │
      ▼
Payment Verified via API Route (/api/razorpay)
      │
      ▼
Donation Saved to MongoDB
      │
      ▼
Confirmation Shown to User ✅
```

---

## 🔒 Authentication Flow

```
User Clicks "Login"
      │
      ▼
Google OAuth via NextAuth.js
      │
      ▼
Session Created & Stored
      │
      ▼
Access to Dashboard Unlocked 🔓
```

---

## 🌍 Deployment

### Deploy on Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add all your `.env.local` variables to your **Vercel Project Settings → Environment Variables**.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve SimplyKind:

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br />

*Built with ❤️ for the SimplyKind Foundation*

*Empowering communities. One donation at a time.*

<br />

</div>
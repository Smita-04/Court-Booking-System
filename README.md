# 🚀 CourtBooker Pro: Full-Stack Microservice Booking Platform

## 🎓 Executive Summary
This project is a fully functional, end-to-end booking application developed as a full-stack engineering challenge. It prioritizes **data integrity** through transactional atomicity, **runtime optimization** via efficient API design, and **decoupled logic** for maintainability. The entire architecture is deployed to a modern cloud microservice stack.

## 💻 Architectural Stack

| Layer | Technology | Rationale (Engineering Focus) |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite) / Tailwind** | Component-based architecture for high reusability and clean state management. |
| **API / Business Logic**| **Node.js (Express)** | Non-blocking, event-driven I/O for efficient concurrent request handling. |
| **Persistence** | **PostgreSQL / Prisma ORM** | ACID compliance via PostgreSQL. Schema management and type safety assured by Prisma. |
| **Deployment**| **Vercel, Render, Neon** | Decoupled CI/CD for a modern microservice deployment pattern (Frontend/Backend/DB separation). |

---

## 🏗️ Project Structure

The project uses a standard monorepo layout, separating the client and server into distinct directories for isolated deployment and development environments.
court-booking-system/
├── client/ # Frontend Application (React/Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI elements (Navbar, Cards)
│ │ ├── pages/ # Main view components (Dashboard, BookCourt, MyBookings)
│ │ └── App.jsx # Main router configuration
│ ├── package.json # Frontend Dependencies & Scripts
│ └── vite.config.js # Vite and Final Deployment URL Configuration
│
└── server/ # Backend Application (Node/Express)
├── prisma/
│ ├── migrations/ # Database migration history
│ ├── schema.prisma # Definitive Database Schema (Resources, Rules, Bookings)
│ └── seed.js # Initial data for Courts, Coaches, Rules
├── server.js # Core API Endpoints, Pricing Engine, and Transaction Logic
├── .env # Environment variables (Database URL, Port)
└── package.json # Backend Dependencies

---

## ✨ Core Engineering Features

| Feature | Technical Implementation | Principle Demonstrated |
| :--- | :--- | :--- |
| **Atomic Booking** | Utilizes **`Prisma.$transaction`** to ensure all resource reservations (Court, Coach, Equipment) are committed simultaneously or rolled back. | Data Integrity, Atomicity (ACID) |
| **Dynamic Pricing Engine** | Decoupled, modular logic in `server.js` applies stacking multipliers and fixed surcharges based on database-driven `PricingRule` configurations. | Modularity, Separation of Concerns |
| **Concurrency Control** | The database transaction inherently serializes concurrent requests attempting to book the same time slot, preventing race conditions. | Performance & Reliability |
| **Availability Queries** | Efficiently queries availability across three different resource types using optimized Prisma queries. | Query Optimization |

---

## 🖥️ Application Evidence

### **1. Dashboard View: Runtime Statistics**
![Dashboard Screenshot](PASTE_DASHBOARD_SCREENSHOT_URL_HERE)

### **2. Booking Wizard: Decoupled UI Flow**
![Booking Step 1 Screenshot](PASTE_COURT_SELECTION_SCREENSHOT_URL_HERE)

### **3. Final Confirmation: Calculated Price**
![Confirmation Step Screenshot](PASTE_CONFIRMATION_STEP_SCREENSHOT_URL_HERE)

### **4. Booking History (View Completed Transactions)**
![Booking History Screenshot](PASTE_BOOKING_HISTORY_SCREENSHOT_URL_HERE)

---

## 🌐 Deployed Environment

| Component | Host | URL |
| :--- | :--- | :--- |
| **Frontend (Client)** | **Vercel** | `PASTE_YOUR_VERCEL_LINK_HERE` |
| **Backend (API)** | **Render** | `https://court-booking-system-qthg.onrender.com` |
| **Source Code** | **GitHub** | `PASTE_YOUR_GITHUB_REPO_LINK_HERE` |

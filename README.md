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
- **court-booking-system/**
- **client/** (Frontend Application: React/Vite)
    - `src/`
      - `components/` (Reusable UI elements like Navbar)
      - `pages/` (Main views: Dashboard, BookCourt, MyBookings)
      - `App.jsx` (Main Router)
    - `package.json` (Frontend Dependencies)
    - `vite.config.js` (Final Deployment Configuration)
  - **server/** (Backend Application: Node/Express)
    - `prisma/`
      - `schema.prisma` (Definitive Database Schema)
      - `seed.js` (Initial Data Seeding)
      - `migrations/` (Database Migration History)
    - `server.js` (Core API Endpoints and Logic)
    - `.env` (Environment Variables)
    - `package.json` (Backend Dependencies)

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
<img width="1920" height="1080" alt="Screenshot (53)" src="https://github.com/user-attachments/assets/e82e41c2-36b5-4cad-8121-1b5aef32d0e1" />


### **2. Booking Wizard: Decoupled UI Flow**
<img width="1920" height="1080" alt="Screenshot (54)" src="https://github.com/user-attachments/assets/2a7c26e3-47a9-4f6c-b4d4-d5a14d17c4be" />
<img width="1920" height="1080" alt="Screenshot (55)" src="https://github.com/user-attachments/assets/58d41334-61ba-48d6-829d-e42d18536e54" />
<img width="1920" height="1080" alt="Screenshot (56)" src="https://github.com/user-attachments/assets/54f0310d-bde4-48e2-bf25-e0e08a84d684" />




### **3. Final Confirmation: Calculated Price**
<img width="1920" height="1080" alt="Screenshot (57)" src="https://github.com/user-attachments/assets/499b1655-eac7-4f91-bbe9-824bc6444028" />


### **4. Booking History (View Completed Transactions)**
<img width="1920" height="1080" alt="Screenshot (58)" src="https://github.com/user-attachments/assets/0f52374e-7b15-4315-b2b3-79036260e8eb" />


---

## 🌐 Deployed Environment

| Component | Host | URL |
| :--- | :--- | :--- |
| **Frontend (Client)** | **Vercel** | `PASTE_YOUR_VERCEL_LINK_HERE` |
| **Backend (API)** | **Render** | `https://court-booking-system-qthg.onrender.com` |
| **Source Code** | **GitHub** | `PASTE_YOUR_GITHUB_REPO_LINK_HERE` |

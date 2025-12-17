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

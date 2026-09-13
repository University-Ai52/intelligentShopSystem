# 🛍️ Intelligent Shop System

An intelligent e-commerce platform built with the **MEAN Stack** (MongoDB, Express.js, Angular, Node.js), designed around a full System Analysis & Design workflow — requirements, context diagram, data-flow diagram, use-case diagram, and class diagram.

<p align="left">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-in%20development-yellow?style=for-the-badge">
</p>

**Repository:** [github.com/University-Ai52/intelligentShopSystem](https://github.com/University-Ai52/intelligentShopSystem)

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Actors](#-actors)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Team &amp; Module Ownership](#-team--module-ownership)
- [Project Status](#-project-status)
- [Roadmap](#-roadmap)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## 📖 About the Project

**Intelligent Shop System** is a smart e-commerce platform that lets customers browse, search, and purchase products with the help of intelligent recommendations and dynamic offers, while giving admins and suppliers the tools to manage inventory, orders, and reporting.

The system is built module by module: every core domain entity (`User`, `Product`, `Cart`, `Order`, `Payment`, `Inventory`, …) is owned end-to-end by one team member, from the MongoDB schema, through the Express/Node API, to the matching Angular feature module.

---

## 👥 Actors

| Actor                     | Responsibilities                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Customer**        | Sign in, search & compare products, get recommendations, place orders, make payments, track order status |
| **Admin**           | Manage system data, generate reports, restock & manage inventory                                         |
| **Supplier**        | Provide product information, receive and fulfill restock orders                                          |
| **Payment Gateway** | Authorize payments, send payment confirmations                                                           |

---

## ✨ Features

### Functional Requirements

- User registration and login
- Browse products
- Smart recommendations system
- Search function
- Shopping cart
- Electronic payment
- Order management
- Inventory management
- User profile management
- Notification system
- Evaluation and feedback system
- Smart offers and discounts

### Non-Functional Requirements

- **Performance** — handle high traffic without slowdowns
- **Usability** — simple, intuitive interface
- **Security** — protect data privacy
- **Response Time** — fast response for user actions
- **Localization** — support for multiple languages and regions

---

## 🛠️ Tech Stack

| Layer    | Technology                                                                |
| -------- | ------------------------------------------------------------------------- |
| Database | MongoDB                                                                   |
| Backend  | Node.js, Express.js                                                       |
| Frontend | Angular                                                                   |
| Auth     | Token-based (JWT) session handling                                        |
| Payments | Payment Gateway integration (Credit/Debit Card, PayPal, Cash on Delivery) |

---

## 📁 Project Structure

```
intelligentShopSystem/
├── back/                     # Backend — Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/           # DB connection, env loader
│   │   ├── models/           # User, Product, Order, Cart, Payment, Inventory...
│   │   ├── controllers/      # Route logic per module
│   │   ├── routes/           # Express routers
│   │   ├── middleware/       # Auth guards, role checks, error handling
│   │   ├── services/         # Payment gateway, recommendations, notifications
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   └── package.json
│
├── front/                    # Frontend — Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Guards, interceptors, core services
│   │   │   ├── shared/        # Reusable components, pipes, directives
│   │   │   └── features/      # auth, products, cart, checkout, orders,
│   │   │                      # inventory, notifications, feedback, admin
│   │   ├── assets/
│   │   └── environments/
│   └── package.json
│
└── README.md
```

---

## 👨‍💻 Team & Module Ownership

Each member owns one module end-to-end across the Backend and the matching Angular Frontend, plus shared work highlighted below.

| Member                                  | Backend                                                      | Frontend                                                 |
| --------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| **Youssef Kareem Abbas**          | Authentication & User                                        | Authentication & User · shared**Home Page** build |
| **Michael Raafat Kamel**          | Product                                                      | Product                                                  |
| **Mohamed Abdelmoneim**           | Cart & Payment                                               | Cart & Payment · shared**Home Page** build        |
| **Ibrahim Mohamed Ibrahim Ahmed** | Category & Orders · Code Review on Cart & Payment (Backend) | —                                                       |
| **Filopateer Ernest**             | —                                                           | Category & Orders                                        |

**Module details:**

<details>
<summary><strong>Authentication & User — Youssef Kareem Abbas</strong></summary>

- Backend: Register, Login, Logout with token-based session handling; User Profile module (view/update personal data & addresses); role separation between Admin / Customer / Supplier.
- Frontend: Login page, Register page, Profile page; shared Home Page build with Mohamed Abdelmoneim.

</details>

<details>
<summary><strong>Product — Michael Raafat Kamel</strong></summary>

- Backend: Product Catalog API (list, filter, category browsing); core product data management.
- Frontend: Product List, Product Detail, Product Search pages.

</details>

<details>
<summary><strong>Cart & Payment — Mohamed Abdelmoneim</strong></summary>

- Backend: Shopping Cart API (add/remove/update items, totals); Payment module (authorize, capture, refund) via a Payment Gateway; support for multiple payment methods.
- Frontend: Cart page, Checkout/Payment Form, Order Confirmation page; shared Home Page build with Youssef Kareem Abbas.

</details>

<details>
<summary><strong>Category & Orders — Ibrahim Mohamed Ibrahim Ahmed</strong></summary>

- Backend: Product categorization linked to the catalog; order creation and order status workflow (Pending → Confirmed → Shipped → Delivered / Cancelled); order tracking.
- Also performs a Code Review of the Cart & Payment backend together with Mohamed Abdelmoneim.
- No frontend responsibility on this module.

</details>

<details>
<summary><strong>Category & Orders (Frontend) — Filopateer Ernest</strong></summary>

- Frontend: Category browsing pages; Order Management and Order Tracking pages.

</details>

---

## 📊 Project Status

**✅ Completed**

- Backend for **Authentication & User**
- Backend for **Product**
- Backend for **Cart & Payment** (reviewed)
- Backend for **Category & Orders**
- Base repository structure (`back/` and `front/`)

**🚧 In Progress**

- Frontend build-out for all modules above
- Shared Home Page (Mohamed Abdelmoneim & Youssef Kareem Abbas)

---

## 🗺️ Roadmap

- [ ] Connect all Frontend modules to their Backend APIs and test integration
- [ ] Apply Smart Recommendations and Smart Offers & Discounts to product pages
- [ ] Add Notification System and Feedback System
- [ ] Build the Admin Reports Dashboard
- [ ] Review Non-Functional Requirements as a team (Performance, Security, Response Time, Localization, Usability)
- [ ] Full system testing and bug fixing before final delivery

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation

```bash
# Clone the repository
git clone https://github.com/University-Ai52/intelligentShopSystem.git
cd intelligentShopSystem
```

**Backend setup**

```bash
cd back
npm install
npm run dev
```

**Frontend setup**

```bash
cd front
npm install
ng serve
```

The frontend will be available at `http://localhost:4200` and the backend API at `http://localhost:3000` (or as configured in `.env`).

---

## 🔐 Environment Variables

Create a `.env` file inside `back/` with the following keys:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
```

---

## 📄 License

This project is developed for academic purposes as part of a graduation project.

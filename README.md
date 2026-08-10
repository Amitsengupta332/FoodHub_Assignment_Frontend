# 🍱 FoodHub — Meal Ordering Platform

> **Discover & Order Delicious Meals**

FoodHub is a full-stack meal ordering platform where customers can discover meals from different food providers, place orders, track order status, and leave reviews.

The platform supports three different roles — **Customer, Provider, and Admin** — with role-based features and access control.

This repository contains the **Frontend application** of FoodHub.

---

## 🌐 Live Project

| Resource               | Link                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 Frontend            | [FoodHub Frontend](https://food-ten-ruby.vercel.app/?utm_source=chatgpt.com)                                                      |
| ⚙️ Backend             | [FoodHub Backend API](https://food-hub-assignment.vercel.app/?utm_source=chatgpt.com)                                             |
| 💻 Frontend Repository | [FoodHub Frontend Repository](https://github.com/Amitsengupta332/FoodHub_Assignment_Frontend?utm_source=chatgpt.com)              |
| 🛠️ Backend Repository | [FoodHub Backend Repository](https://github.com/Amitsengupta332/FoodHub_assignment?utm_source=chatgpt.com)                        |
| 🎥 Demo Video          | [FoodHub Demo Video](https://drive.google.com/drive/folders/17dkP9gEIrYe9wGSa1Vm7EiVA-4tJHOWj?usp=sharing&utm_source=chatgpt.com) |

---

# 📖 Project Overview

FoodHub provides a complete digital food ordering experience.

Customers can browse available meals, explore food providers, add meals to their cart, place Cash on Delivery orders, track their orders, and submit reviews.

Food providers can manage their menus and process incoming orders.

Administrators can manage users, orders, and food categories across the platform.

### 👥 User Roles

| Role            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| 👤 **Customer** | Browse meals, manage cart, place orders, track orders, and leave reviews |
| 🍳 **Provider** | Manage menu items, view incoming orders, and update order status         |
| 🛡️ **Admin**   | Manage users, orders, and categories                                     |

---

# ✨ Features

## 🌍 Public Features

* Browse all available meals
* Browse food providers
* View individual meal details
* View provider profiles
* Explore provider menus
* Filter meals
* Responsive design
* Authentication pages
* Loading and error states

---

## 👤 Customer Features

* Customer registration and login
* Browse meals
* Search/filter meals
* View meal details
* Add meals to cart
* Update cart quantities
* Remove items from cart
* Checkout
* Cash on Delivery ordering
* Provide delivery address
* View order history
* View individual order details
* Track order status
* Leave reviews
* Manage profile

---

## 🍳 Provider Features

* Provider registration and login
* Provider dashboard
* Create menu items
* Update menu items
* Delete menu items
* View provider menu
* View incoming orders
* Update order status
* Manage provider information

---

## 🛡️ Admin Features

* Admin dashboard
* View all users
* View customers and providers
* Activate/suspend users
* View all orders
* Manage food categories
* Role-based access control
* Protected admin routes

---

# 🛠️ Technology Stack

## Frontend

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| **Next.js**      | React framework and application routing |
| **TypeScript**   | Type-safe development                   |
| **Tailwind CSS** | Styling and responsive UI               |
| **React**        | UI development                          |
| **Better Auth**  | Authentication                          |
| **Prisma**       | Backend database ORM                    |
| **REST API**     | Frontend/backend communication          |

## Backend

The frontend communicates with a separate REST API built with:

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

👉 Check the backend repository for the complete backend implementation.

---

# 🏗️ Application Architecture

FoodHub follows a separated frontend/backend architecture.

```text
                    ┌─────────────────────┐
                    │      Customer       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │      Next.js        │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                    ┌──────────▼──────────┐
                    │   Express Backend   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
```

---

# 📂 Main Application Routes

## 🌍 Public Routes

| Route            | Description               |
| ---------------- | ------------------------- |
| `/`              | Homepage                  |
| `/meals`         | Browse all meals          |
| `/meals/:id`     | Meal details              |
| `/providers/:id` | Provider profile and menu |
| `/login`         | Login                     |
| `/register`      | Registration              |

---

## 👤 Customer Routes

| Route         | Description                       |
| ------------- | --------------------------------- |
| `/cart`       | Shopping cart                     |
| `/checkout`   | Checkout and delivery information |
| `/orders`     | Customer order history            |
| `/orders/:id` | Order details and status          |
| `/profile`    | Customer profile                  |

---

## 🍳 Provider Routes

| Route                 | Description            |
| --------------------- | ---------------------- |
| `/provider/dashboard` | Provider dashboard     |
| `/provider/menu`      | Manage menu            |
| `/provider/orders`    | Manage incoming orders |

---

## 🛡️ Admin Routes

| Route               | Description         |
| ------------------- | ------------------- |
| `/admin`            | Admin dashboard     |
| `/admin/users`      | User management     |
| `/admin/orders`     | Order management    |
| `/admin/categories` | Category management |

---

# 🔄 Customer Order Flow

```text
Register / Login
       │
       ▼
 Browse Meals
       │
       ▼
 View Meal Details
       │
       ▼
   Add to Cart
       │
       ▼
    Checkout
       │
       ▼
 Place Order
       │
       ▼
 Provider Receives Order
       │
       ▼
     PLACED
       │
       ▼
   PREPARING
       │
       ▼
      READY
       │
       ▼
   DELIVERED
       │
       ▼
 Leave Review
```

---

# 📦 Order Status

FoodHub uses the following order lifecycle:

```text
                ┌─────────────┐
                │    PLACED   │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │  PREPARING  │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │    READY    │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │  DELIVERED  │
                └─────────────┘

                    OR

                ┌─────────────┐
                │  CANCELLED  │
                └─────────────┘
```

---

# 🔐 Authentication & Authorization

FoodHub implements authentication and role-based authorization.

### Supported Roles

```text
CUSTOMER
PROVIDER
ADMIN
```

Users receive access to different parts of the application depending on their assigned role.

For example:

```text
Customer
   └── /cart
   └── /checkout
   └── /orders
   └── /profile

Provider
   └── /provider/dashboard
   └── /provider/menu
   └── /provider/orders

Admin
   └── /admin
   └── /admin/users
   └── /admin/orders
   └── /admin/categories
```

Admin accounts are seeded in the database rather than being created through normal registration.

---

# 🛒 Cart & Checkout

Customers can:

* Add meals to cart
* Increase/decrease quantity
* Remove meals
* Review cart subtotal
* Provide delivery information
* Place Cash on Delivery orders

FoodHub does **not** use an online payment gateway.

### Payment Method

```text
Cash on Delivery (COD)
```

---

# ⚠️ Error Handling

The application includes user-friendly handling for common application states.

### Loading States

Loading indicators are displayed while:

* Fetching meals
* Fetching providers
* Fetching orders
* Submitting forms
* Performing CRUD operations

### Error Handling

The frontend handles:

* Invalid form submissions
* Authentication errors
* Unauthorized access
* Failed API requests
* Missing resources
* Empty states
* Server errors

---

# 📱 Responsive Design

FoodHub is designed to work across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

The UI uses a consistent design system with reusable components, spacing, typography, and responsive layouts.

---

# 🚀 Getting Started

Follow the instructions below to run the frontend locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Amitsengupta332/FoodHub_Assignment_Frontend.git
```

## 2. Navigate to the Project

```bash
cd FoodHub_Assignment_Frontend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Replace the value with your local or deployed backend URL.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

or the deployed backend API:

```env
NEXT_PUBLIC_API_URL=https://food-hub-assignment.vercel.app
```

> Environment variable names may vary depending on the implementation. Check the source code for the exact variables required by the current version.

## 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🧪 Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

# 🔗 Backend API

The frontend depends on the FoodHub backend REST API.

### Backend Repository

[FoodHub Backend Repository](https://github.com/Amitsengupta332/FoodHub_assignment?utm_source=chatgpt.com)

### Backend Live URL

[FoodHub Backend API](https://food-hub-assignment.vercel.app/?utm_source=chatgpt.com)

The backend is responsible for:

* Authentication
* User management
* Provider management
* Meal CRUD
* Category management
* Order creation
* Order management
* Order status updates
* Reviews
* Database operations

---

# 📸 Project Highlights

FoodHub includes dedicated interfaces for:

### 🏠 Homepage

* Navigation
* Hero section
* Featured meals
* Food categories
* Provider/content sections
* Footer

### 🍱 Meal Browsing

Customers can explore available meals and discover food providers.

### 🛒 Cart

Customers can review selected meals and manage quantities before checkout.

### 📦 Orders

Customers can view their previous orders and monitor their current order status.

### 🍳 Provider Dashboard

Providers can manage their menu and process customer orders.

### 🛡️ Admin Dashboard

Administrators can manage users, orders, and categories.

---

# 🎓 Assignment Requirements

FoodHub was developed as **Assignment 4 — Full-Stack Project**.

### Mandatory Requirements

* [x] Homepage with 4 meaningful sections
* [x] Navbar and Footer
* [x] Responsive UI/UX
* [x] Consistent design
* [x] 30 meaningful commits
* [x] Frontend and backend development
* [x] Error handling
* [x] Loading states
* [x] Role-based access control
* [x] Admin account
* [x] Customer functionality
* [x] Provider functionality
* [x] CRUD operations
* [x] Live deployment
* [x] Demo video

---

# 📊 Role-Based Feature Summary

| Feature                | Customer |  Provider  | Admin |
| ---------------------- | :------: | :--------: | :---: |
| Browse Meals           |     ✅    |      ✅     |   ✅   |
| View Providers         |     ✅    |      ✅     |   ✅   |
| Add to Cart            |     ✅    |      ❌     |   ❌   |
| Place Orders           |     ✅    |      ❌     |   ❌   |
| Track Orders           |     ✅    |      ❌     |   ❌   |
| Manage Meals           |     ❌    |      ✅     |   ❌   |
| Manage Provider Orders |     ❌    |      ✅     |   ❌   |
| Manage Users           |     ❌    |      ❌     |   ✅   |
| Manage Categories      |     ❌    |      ❌     |   ✅   |
| View All Orders        |     ❌    | Own Orders |   ✅   |
| Leave Reviews          |     ✅    |      ❌     |   ❌   |

---

# 🔑 Demo Admin Credentials

Use the following credentials to access the admin dashboard:

```text
Email: admin@foodhub.com
Password: admin1234
```

> ⚠️ These credentials are provided specifically for project demonstration and evaluation purposes.

---

# 📤 My Submission

**Submitted At:** 07:56 PM, 22nd February 2026

| Submission             | Details                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 Frontend Repository | [FoodHub Frontend Repository](https://github.com/Amitsengupta332/FoodHub_Assignment_Frontend?utm_source=chatgpt.com)              |
| ⚙️ Backend Repository  | [FoodHub Backend Repository](https://github.com/Amitsengupta332/FoodHub_assignment?utm_source=chatgpt.com)                        |
| 🌐 Frontend Live       | [FoodHub Frontend](https://food-ten-ruby.vercel.app/?utm_source=chatgpt.com)                                                      |
| 🚀 Backend Live        | [FoodHub Backend](https://food-hub-assignment.vercel.app/?utm_source=chatgpt.com)                                                 |
| 🎥 Demo Video          | [FoodHub Demo Video](https://drive.google.com/drive/folders/17dkP9gEIrYe9wGSa1Vm7EiVA-4tJHOWj?usp=sharing&utm_source=chatgpt.com) |
| 👤 Admin Email         | `admin@foodhub.com`                                                                                                               |
| 🔑 Admin Password      | `admin1234`                                                                                                                       |

---

# 📚 Related Repository

For the complete backend implementation, database schema, API endpoints, Prisma configuration, and server-side logic:

👉 [View FoodHub Backend Repository](https://github.com/Amitsengupta332/FoodHub_assignment?utm_source=chatgpt.com)

---

# 👨‍💻 Author

**Amit Sengupta**

Full-Stack Web Developer

### Project

**FoodHub — Full-Stack Meal Ordering Platform**

Built with:

```text
Next.js
TypeScript
Tailwind CSS
Node.js
Express.js
PostgreSQL
Prisma
```

---

## ⭐ Acknowledgement

This project was developed as part of the **Next Level Web Development / Programming Hero Full-Stack Project — Assignment 4**.

The goal of the project was to build a complete full-stack application with authentication, role-based authorization, CRUD operations, database integration, responsive UI, error handling, and production deployment.

---

# 🚀 FoodHub

> **Discover meals. Order easily. Manage everything in one place.**

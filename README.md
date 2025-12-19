# 🛒 ProShop - Full-Stack MERN E-Commerce Platform

A comprehensive, production-ready e-commerce solution featuring a dynamic storefront, secure user authentication, and a robust administrative dashboard. This project demonstrates advanced state management using both Redux Toolkit and React Context API.

---

## 🌟 Key Features

### **👤 User Experience**
* **Secure Authentication:** JWT-based login and registration with passwords encrypted via BCrypt.
* **Dynamic Product Catalog:** Browse products by category, search by name, and view detailed product descriptions with image galleries.
* **Real-time Shopping Cart:** Add, update, or remove items with a persistent cart counter powered by **React Context API**.
* **Responsive Design:** Optimized for all screen sizes using **Tailwind CSS**.
* **Toast Notifications:** Real-time feedback for user actions (Login, Add to Cart, etc.) via React-Toastify.

### **🛠 Administrative Features**
* **Admin Dashboard:** Exclusive access for authorized users to manage the entire store.
* **Inventory Management:** Full CRUD operations—upload new products, edit pricing, update brands, and manage categories.
* **User Management:** Monitor all registered users and toggle account roles between `GENERAL` and `ADMIN`.

---

## 🛠 Tech Stack



| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (v18), Redux Toolkit, Context API, Tailwind CSS, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | JSON Web Tokens (JWT), Cookie-Parser, Bcrypt.js |

---

## 📂 Project Structure

```text
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Header, Footer, Product Cards)
│   │   ├── EndPoints/     # API Centralized Configuration
│   │   ├── store/         # Redux Slices (User State Management)
│   │   ├── context/       # Context API (Cart Count & Refresh Logic)
│   │   └── pages/         # View Components (Home, Admin, Cart, etc.)
└── server/                # Node.js Backend
    ├── controller/        # API Business Logic
    ├── middleware/        # JWT Authentication Verification
    ├── models/            # Database Schemas (User, Product, Cart)
    └── routes/            # Express API Endpoint Definitions


⚙️ Setup & Installation
1. Prerequisites
Node.js installed

MongoDB Atlas Account (or local MongoDB)

2. Backend Configuration
Navigate to the server/ directory and create a .env file:

PORT = 8080
MONGODB_URI = your_mongodb_connection_string
JSONWEBTOKEN = your_secret_key
FRONTEND_URL = http://localhost:3000

Install dependencies and start the server:
cd server
npm install
npm run dev

3. Frontend Configuration
Navigate to the client/ directory, install dependencies, and start the development server:
cd client
npm install
npm start

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

🛡 License
This project is licensed under the ISC License.
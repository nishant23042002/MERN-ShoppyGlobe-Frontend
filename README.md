GITHUB LINK :
## Related Links
- 🔗 Backend API: [GitHub Repo](https://github.com/yourusername/backend-repo)




# 🛒 ShoppyGlobe

**ShoppyGlobe** is a modern e-commerce web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse products, view detailed product pages, and manage their cart with real-time syncing to the backend.

---


## 🚀 Features

- 🛍️ Browse a wide variety of products
- 🔍 View detailed product information
- ➕ Add and remove products from the cart
- 🔁 Cart state persists across refresh with MongoDB sync
- 🔐 JWT-based Authentication 

---

## 🧱 Tech Stack

| Frontend        | Backend         | Database | Tools           |
|----------------|-----------------|----------|------------------|
| React.js        | Express.js       | MongoDB  | Redux Toolkit, Fetch API |
| React Router    | Node.js         | Mongoose | dotenv, nodemon,react-redux  |
| Tailwind CSS    |                 |          | Thunder Client (testing) |

---

## 📁 Folder Structure

MERN_SHOPPYGLOBE/
├── ShoppyGlobe-Backend/
│ ├── controllers/
│ ├── middleware/
│ ├── model/
│ ├── routes/
│ ├── seed/
│ ├── DB.js
│ └── server.js
├── ShoppyGlobe-Frontend/
│ ├── public/
│ ├── src/components
│ ├── src/customHook/
│ ├── src/utils/
│ ├── App.jsx
│ └── main.jsx
└── README.md


---

## 🔧 Setup Instructions

### 📦 Backend

1. **Navigate to the backend folder:**
    ```bash
    cd ShoppyGlobe-Backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file:
    ```.env
    MONGO_URI=mongodb+srv://nishantsapkal2304:tPiy8I44L8KXcPt5@cluster0.7uihp7l.mongodb.net/ShoppyGlobe-API
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

---

### 🖥️ Frontend

1. **Navigate to the frontend folder:**
    ```bash
    cd ShoppyGlobe-Frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend server:**
    ```bash
    npm run dev
    ```

---

## 📡 API Endpoints

### 📦 Products
- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get product by ID

### 🛒 Cart
- `GET /api/cart` — Get all cart items
- `POST /api/cart` — Add product to cart
- `PATCH /api/cart/:id` — Update cart item quantity
- `DELETE /api/cart/:id` — Remove cart item

---

## ✅ To-Do (Future Scope)

- 🧑 Admin dashboard to manage products
- 🛒 Checkout & order placement
- 📈 Analytics dashboard

---

## 🧑‍💻 Author

**Nishant**  
[GitHub Profile](https://github.com/nishant23042002)

---



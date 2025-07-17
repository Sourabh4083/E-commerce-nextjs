# 🛒 E-Commerce Web App (Full Stack)

This is a modern, full-stack e-commerce web application built with **Next.js 14 (App Router)**, **MongoDB Atlas**, **Cloudinary**, and secure **JWT authentication** using **HTTP-only cookies**. It includes a powerful **Admin Panel**, **Role-Based Access**, **Cart System**, and **Payment Integration**.

---

## 📆 Features

### 👤 User Authentication

- Register/Login with email & password
- JWT-based auth stored in HTTP-only cookies
- Protected routes using `middleware.js`
- Role-based access control (`user`, `admin`)

### 🏣 Products

- Add, Edit, Delete Products (admin only)
- Upload images via **Cloudinary**
- Categories, pricing, and stock management
- View all products on homepage

### 🛒 Cart System

- Add to Cart from Product page
- Buy Now → Direct Checkout
- Cart saved in MongoDB
- Total item counter
- Clear/remove items from cart

### 💳 Checkout

- Razorpay payment integration
- Orders stored in MongoDB after payment
- Delivery/payment status shown

### 🛠️ Admin Panel

- Manage Products (CRUD)
- View All Orders
- Dashboard access (`/admin/dashboard`)

---

## 🧠 Technologies Used

| Tech              | Purpose                           |
| ----------------- | --------------------------------- |
| **Next.js 14**    | Full-stack React framework        |
| **App Router**    | File-based routing system         |
| **MongoDB Atlas** | NoSQL cloud database              |
| **Mongoose**      | MongoDB ODM for schema definition |
| **Cloudinary**    | Image upload & CDN                |
| **JWT**           | Auth system with cookies          |
| **Tailwind CSS**  | Styling UI                        |
| **Razorpay**      | Payment gateway                   |


---

## 🔒 Environment Variables (`.env.local`)

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 🛠️ How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/your-repo/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` with your credentials.

4. Run dev server:

   ```bash
   npm run dev
   ```

---

## ✨ Unique Functionalities

- **Buy Now** button redirects to checkout with only 1 item
- **Role-Based Admin Access**
- **Persistent Cart with MongoDB**
- **JWT Auth with HTTP-only cookies (secure)**
- **Cloudinary-powered image management**
- **Responsive UI with Tailwind CSS**

---

## 🔐 Security Practices

- All API routes are protected using JWT in cookies.
- Admin routes are locked behind role checks.
- Image uploads validated and passed via Cloudinary.
- Cart is not stored in localStorage (avoids tampering).

---

## 🙌 Future Improvements

- Add Stripe payment option
- Add product filters/search
- Add order tracking with status updates
- Add unit/integration testing
- Add email notification (Nodemailer)



## 📄 License

This project is licensed under the MIT License.

---


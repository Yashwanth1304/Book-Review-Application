# 📚 Book Review API

This is a **Book Review API** built with **Node.js, Express, and MongoDB** following the **MERN/MEAN stack structure**. It allows users to **register, log in, add books, update reviews, and delete books** with authentication using **JWT (JSON Web Tokens)**.

## 🚀Features

- **User Authentication** (Register & Login)
- **CRUD operations** on books
- **Review System** (Add, Update, Delete Reviews)
- **Token-based Authentication** (JWT)
- **MongoDB Database** for storage

## 📂 Project Structure

```
project/
│
├── config/
│   └── db.js                  # Database connection
│
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── bookController.js      # Book-related logic
│   └── reviewController.js    # Review-related logic
│
├── middleware/
│   └── authMiddleware.js      # JWT authentication middleware
│
├── models/
│   ├── book.js                # Book schema
│   └── user.js                # User schema
│
├── routes/
│   ├── authRoutes.js          # Authentication routes
│   ├── bookRoutes.js          # Book routes
│   └── reviewRoutes.js        # Review routes
│
├── utils/
│   └── jwtUtils.js            # JWT utility functions
│
├── .env                       # Environment variables
├── server.js                  # Main entry point
└── package.json               # NPM package file
```

## 🔧 Installation

1️⃣ Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-review-api.git
   cd book-review-api
   ```
2️⃣ Install dependencies:
   ```bash
   npm install
   ```
 3️⃣ Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     ```
4️⃣ Start the server:
   ```bash
   npm start
   ```

## 📌API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Login**: `POST /api/auth/login`
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
  - Returns: `{ "token": "your-jwt-token" }`

### Books

- **Get all books**: `GET /api/books`
- **Get book by ISBN**: `GET /api/books/:isbn`
- **Add a new book** (Protected - Requires Token): `POST /api/books`
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890"
  }
  ```
- **Delete a book** (Protected): `DELETE /api/books/:isbn`

### Reviews

- **Add/Update a Review** (Protected): `PUT /api/reviews/:isbn`
  ```json
  {
    "review": "This book is amazing!"
  }
  ```
- **Delete a Review** (Protected): `DELETE /api/reviews/:isbn`

## Usage

- Use **Postman** or any API testing tool to test endpoints.
- Ensure you include a **Bearer Token** for protected routes.
- Example Authorization Header:
  ```
  Authorization: Bearer your-jwt-token
  ```

## Technologies Used

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MongoDB + Mongoose** (Database and ORM)
- **JWT (JSON Web Token)** (Authentication)
- **Postman** (API Testing)

## ⭐ Contributing

Feel free to fork the repo, submit issues, and contribute!

## 📜 License

This project is licensed under the **MIT License**.



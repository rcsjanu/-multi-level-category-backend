# Multi-Level Category Management API

A scalable, secure backend API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT**, designed to manage nested categories (multi-level tree structure) with user authentication and full test coverage.

---

## 🚀 Features

- ✅ JWT-based Authentication (Register & Login)
- ✅ Create, Fetch (Tree), Update, Delete Categories
- ✅ Subcategory reassignment on parent deletion
- ✅ Inactive status propagation to all subcategories
- ✅ Jest & Supertest for Unit + Integration Testing
- ✅ MongoMemoryServer for test isolation
- ✅ Dockerized setup for smooth deployment

---

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- MongoDB (with Mongoose)
- JSON Web Token (JWT)
- Jest + Supertest
- Docker (Optional)
- Postman (Collection Included)

---


---

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/rcsjanu/-multi-level-category-backend.git
cd multi-level-category-backend
npm install

2. Create .env File
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/multi-level-category-db
JWT_SECRET=your_jwt_secret

3. Run the Server (Development)
bash
Copy
Edit
npm run dev
You’ll see Server running on port 5000 and MongoDB connected.

🔐 API Authentication
Use /api/auth/register and /api/auth/login to get a token.
Include the token as a Bearer in all category routes:

http
Copy
Edit
Authorization: Bearer <your_token>

🧪 Running Tests
bash
Copy
Edit
npm run test
Uses MongoMemoryServer for fast, isolated tests.

Includes unit tests for controllers and integration tests for API endpoints.

🔀 API Endpoints

Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login and receive JWT	❌
POST	/api/category	Create a new category	✅
GET	/api/category	Fetch all categories in tree format	✅
PUT	/api/category/:id	Update name or status of a category	✅
DELETE	/api/category/:id	Delete category and reassign subcategories	✅

🌳 Example Category Tree
json
Copy
Edit
[
  {
    "name": "Electronics",
    "children": [
      {
        "name": "Phones",
        "children": [
          { "name": "Android" },
          { "name": "iPhone" }
        ]
      },
      {
        "name": "Laptops",
        "children": [
          { "name": "Gaming" },
          { "name": "Business" }
        ]
      }
    ]
  }
]




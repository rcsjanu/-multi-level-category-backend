
# Multi-Level Category Management API

A scalable backend API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT**, designed to manage multi-level nested categories.

---

## 🚀 Features

- JWT-based User Authentication
- Nested (Tree) Category Creation
- Inactive Propagation to Subcategories
- Reassignment of Subcategories on Deletion
- TypeScript Support
- Jest + Supertest Testing
- MongoMemoryServer for Unit Tests
- Docker Support
- Postman Collection Included

---

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/rcsjanu/-multi-level-category-backend.git
cd multi-level-category-backend
npm install
```

### 2. Create `.env` File

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/multi-level-category-db
JWT_SECRET=your_jwt_secret
```

### 3. Run the Server (Development)

```bash
npm run dev
```

You’ll see `Server running on port 5000` and `MongoDB connected`.

---

## 🔐 API Authentication

Use `/api/auth/register` and `/api/auth/login` to get a token.  
Include the token as a Bearer in all category routes:

```http
Authorization: Bearer <your_token>
```

---

## 📫 Postman Collection

A Postman collection is included with the following routes:

| Method | Route                         | Description                                     |
|--------|-------------------------------|-------------------------------------------------|
| POST   | `/api/auth/register`          | Register a new user                             |
| POST   | `/api/auth/login`             | Login and receive JWT                           |
| POST   | `/api/category`               | Create a new category                           |
| GET    | `/api/category`               | Fetch all categories in tree format             |
| PUT    | `/api/category/:id`           | Update a category's name or status              |
| DELETE | `/api/category/:id`           | Delete a category & reassign its subcategories  |

Set `{{token}}` and `{{categoryId}}` as Postman variables.

---

## 🌳 Example Category Tree

```json
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
```

---

## 🧪 Running Tests

```bash
npm run test
```

- Unit + integration tests using Jest and Supertest
- MongoMemoryServer used for isolated DB tests

---

## 🐳 Docker Support

### Build the image

```bash
docker build -t multi-level-category-backend .
```

### Run the container

```bash
docker run -p 5000:5000 --env-file .env multi-level-category-backend
```

---

## 📁 Folder Structure

```
src/
├── controllers/       # Auth & Category logic
├── middleware/        # JWT middleware
├── models/            # Mongoose schemas
├── routes/            # Express routes
├── tests/             # Jest + Supertest test files
├── utils/             # DB utility functions
├── app.ts             # Express app
└── server.ts          # Entry point
```

---


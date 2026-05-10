# MIDT Backend — REST API

Node.js / Express / MongoDB backend for **Multan Institute of Digital Technology** website.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js 4.x |
| Database | MongoDB (via Mongoose) |
| Auth | JWT + bcryptjs |
| Security | Helmet, express-rate-limit, express-mongo-sanitize |
| Deployment | Vercel (serverless) |

---

## Folder Architecture

```
backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Login, getMe
│   ├── courseController.js # Course CRUD
│   └── mainController.js   # Admissions, Contact, Gallery, Students, Admins, Dashboard
├── middleware/
│   ├── auth.js             # JWT protect + role authorize
│   └── error.js            # Centralized error handler
├── models/
│   ├── Admin.js            # Admin schema (bcrypt hashing)
│   ├── Course.js           # Course schema (with slug)
│   ├── Student.js          # Student schema (auto-ID)
│   └── index.js            # Admission, Contact, Gallery schemas
├── routes/
│   └── index.js            # All API routes
├── seed/
│   └── adminSeed.js        # Seeds super admin + 8 default courses
├── uploads/                # (local file uploads — not used in production)
├── .env.example
├── server.js               # Express app entry point
├── vercel.json             # Vercel deployment config
└── package.json
```

---

## Environment Variables

Copy `.env.example` → `.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/midt_db
JWT_SECRET=your_very_secret_jwt_key_at_least_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## Installation & Running

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Create .env from example
cp .env.example .env
# → Edit .env with your MongoDB URI and JWT secret

# 3. Seed the database (creates super admin + 8 default courses)
node seed/adminSeed.js

# 4. Start development server (with auto-reload)
npm run dev

# 5. Start production server
npm start
```

Server runs on `http://localhost:5000`

---

## Default Admin Credentials

> ⚠️ **IMPORTANT:** Change the password immediately after first login in a production environment.

---

## API Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Admin login → returns JWT |
| GET | `/api/auth/me` | 🔒 JWT | Get current admin info |

### Courses
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/courses` | Public | List all (supports `?search=&category=&skillLevel=&featured=true`) |
| GET | `/api/courses/:slug` | Public | Get single course by slug |
| POST | `/api/courses` | 🔒 Admin | Create course |
| PUT | `/api/courses/:id` | 🔒 Admin | Update course |
| DELETE | `/api/courses/:id` | 🔒 Admin | Delete course |

### Admissions
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admissions` | Public | Submit admission request |
| GET | `/api/admissions` | 🔒 Admin | List all admissions |
| PUT | `/api/admissions/:id` | 🔒 Admin | Update status |
| DELETE | `/api/admissions/:id` | 🔒 Admin | Delete admission |

### Contact Messages
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Send contact message |
| GET | `/api/contact` | 🔒 Admin | List all messages |
| PUT | `/api/contact/:id/read` | 🔒 Admin | Mark as read |
| DELETE | `/api/contact/:id` | 🔒 Admin | Delete message |

### Students
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/students` | 🔒 Admin | List all students |
| POST | `/api/students` | 🔒 Admin | Register student |
| PUT | `/api/students/:id` | 🔒 Admin | Update student |
| DELETE | `/api/students/:id` | 🔒 Admin | Delete student |

### Gallery
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gallery` | Public | List gallery items (`?category=`) |
| POST | `/api/gallery` | 🔒 Admin | Add gallery item |
| DELETE | `/api/gallery/:id` | 🔒 Admin | Delete gallery item |

### Admin Management (Super Admin only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admins` | 🔒 Super | List all admins |
| POST | `/api/admins` | 🔒 Super | Create admin |
| DELETE | `/api/admins/:id` | 🔒 Super | Delete admin |

### Dashboard
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dashboard/stats` | 🔒 Admin | Get stats + recent admissions |

---

## MongoDB Setup (Atlas)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create a database user
4. Whitelist your IP (or `0.0.0.0/0` for Vercel)
5. Get the connection string → paste into `MONGODB_URI` in `.env`

---

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# From /backend directory
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI, JWT_SECRET, JWT_EXPIRE, NODE_ENV=production, FRONTEND_URL
```

The `vercel.json` routes all requests to `server.js`.

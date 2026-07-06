# API

This folder contains the backend for the real estate application.

## What it does

The API handles:

- User registration and login
- JWT-based authentication
- Property post creation, reading, updating, and deletion
- User profile-related operations

## Tech Stack

- Node.js
- Express
- Prisma ORM
- MongoDB
- JWT
- Cookie-based auth

## Project Structure

- app.js - entry point for the Express server
- controllers - business logic for auth, users, and posts
- routes - API route definitions
- middlewares - authentication and error handling helpers
- prisma - Prisma schema and configuration

## Setup

1. Install dependencies:

```bash
cd api
npm install
```

2. Create an .env file with:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Start the server:

```bash
npm run run:dev
```

## Main API Routes

- POST /api/auth/register
- POST /api/auth/login
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PATCH /api/posts/:id
- DELETE /api/posts/:id

## Notes

- Authentication is handled through JWT stored in cookies.
- Prisma is configured to use MongoDB.
- The API is currently configured to accept requests from the Vite client on http://localhost:5173.

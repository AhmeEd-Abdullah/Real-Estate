# Real Estate MERN App

A full-stack real estate marketplace built with React, Vite, Express, Prisma, and MongoDB. The app allows users to browse property listings, view details, register or log in, manage their profile, and create or update property posts.

## Features

- User authentication with JWT and cookie-based sessions
- Property listing browsing and detail pages
- Create, update, and delete posts
- Profile management and account updates
- Responsive UI with reusable card, filter, map, and search components

## Tech Stack

- Frontend: React, Vite, React Router, Axios, SCSS
- Backend: Node.js, Express
- Database: MongoDB with Prisma ORM

## Project Structure

- [api](api) - Express backend and Prisma schema
- [client](client) - React frontend application

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "MERN Stack EState"
```

### 2. Install dependencies

```bash
cd api && npm install
cd ../client && npm install
```

### 3. Configure environment variables

Create an .env file inside the api folder with:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

### 4. Run the app

Start the backend:

```bash
cd api
npm run run:dev
```

Start the frontend:

```bash
cd client
npm run dev
```

The frontend will run on http://localhost:5173 and the backend on http://localhost:5000.

## API Overview

The backend exposes REST-style endpoints under /api such as:

- /api/auth for authentication
- /api/users for user-related actions
- /api/posts for property posts

## Documentation

For more detailed setup and usage instructions, see:

- [api/README.md](api/README.md)
- [client/README.md](client/README.md)

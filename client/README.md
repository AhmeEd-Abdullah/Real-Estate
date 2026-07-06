# Client

This folder contains the frontend for the real estate application.

## What it does

The client provides the user interface for:

- Browsing property listings
- Viewing property details
- Registering and logging in
- Managing profile information
- Creating and editing property posts

## Tech Stack

- React
- Vite
- React Router
- Axios
- SCSS

## Setup

1. Install dependencies:

```bash
cd client
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173.

## Project Structure

- src/components - reusable UI pieces such as cards, filters, search, and map
- src/routes - page-level views for home, listing, single property, login, register, and profile
- src/context - global auth context
- src/lib - shared API configuration and helpers

## Notes

The frontend communicates with the backend through the Axios instance configured in src/lib/apiRequestConfig.js.

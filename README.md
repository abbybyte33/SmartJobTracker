# Smart Job Tracker (MERN)

A job application tracker built with React, Vite, Node.js, Express, and MongoDB.

## Features
- Create job applications
- View all saved applications
- Update application status
- Delete applications
- Search by company, role, or location
- Filter by status
- Dashboard statistics calculated from saved applications
- MongoDB persistence

## Requirements
- Node.js 18 or newer
- A MongoDB Atlas database (free tier is sufficient)

## Setup
1. Install dependencies from this folder:
   `npm install`
2. Copy `.env.example` to a new file named `.env`.
3. In `.env`, replace the placeholder with your MongoDB Atlas connection string:
   `MONGO_URI=mongodb+srv://...`
4. In MongoDB Atlas, make sure your database user and Network Access settings permit your connection. Replace `<password>` in the URI with your database user's password and URL-encode special characters in it.
5. Start the app:
   `npm run dev`
6. Open the Vite localhost link shown in the terminal (usually `http://localhost:5173`).

## API
- `GET /api/health`
- `GET /api/jobs`
- `POST /api/jobs`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`

## Security
Never commit `.env` or share your MongoDB connection string publicly.

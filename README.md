Smart Job Tracker

A full-stack MERN application that helps users organize job applications, monitor their progress, and manage their job search from a centralized dashboard.

Overview

Applying for multiple jobs can make it difficult to remember which companies you applied to, which roles you selected, and the current status of each application.

Smart Job Tracker provides a centralized platform for recording job applications and tracking their progress throughout the application process.

Features

* Dashboard: View your job applications in one place.
* Add Applications: Record company names, job roles, locations, employment types, and application statuses.
* Update Applications: Modify application details and track changes in status.
* Delete Applications: Remove applications that are no longer needed.
* Search: Find applications using company, role, or location.
* Status Filtering: Organize applications by their current status.
* Dashboard Statistics: View summaries calculated from your saved applications.
* Persistent Storage: Store application data in MongoDB Atlas so it remains available after refreshing the page.

Technologies Used

Technology	Purpose
React	Builds the user interface
Vite	Frontend development server and production build tool
Node.js	JavaScript runtime for the backend
Express.js	Handles HTTP requests and provides REST API endpoints
MongoDB Atlas	Cloud database for storing job applications
Mongoose	Defines data models and communicates with MongoDB
CSS	Styles the application
Git and GitHub	Version control and source code hosting
Render	Backend hosting
Vercel	Frontend hosting

Architecture

The application uses a client-server architecture.

1. The React frontend provides the dashboard and application management interface.
2. The frontend sends HTTP requests to the Express backend.
3. The backend validates requests and performs database operations using Mongoose.
4. MongoDB Atlas stores the application records.
5. The backend returns responses to the frontend, which updates the displayed information.

Application Statuses

Applications can be organized using the following statuses:

* Applied
* Assessment
* Interview
* Offer
* Rejected

Project Structure

SmartJobTracker/
├── server/
│   └── index.js          # Express server, API routes and MongoDB connection
├── src/                  # React application source code
├── .env.example          # Example environment configuration
├── .gitignore            # Files excluded from Git
├── index.html            # Frontend HTML entry point
├── package.json          # Dependencies and npm scripts
├── package-lock.json     # Locked dependency versions
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation

Getting Started

Prerequisites

* Node.js 18 or newer
* npm
* A MongoDB Atlas account and database

1. Clone the repository

git clone https://github.com/abbybyte33/SmartJobTracker.git
cd SmartJobTracker

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the project root using .env.example as a reference.

Add your MongoDB Atlas connection string:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5001

Replace the placeholder with your actual MongoDB connection string. Configure your database user and Atlas network access settings appropriately.

Never commit your actual .env file or publish database credentials.

4. Start the application

npm run dev

This starts the frontend development server and backend server.

Open the local frontend URL printed by Vite in your terminal, usually:

http://localhost:5173

5. Build the frontend

To create a production build of the React application, run:

npm run build

The generated frontend files are placed in the dist/ directory.

API Endpoints

The backend exposes the following REST API endpoints:

Method	Endpoint	Description
GET	/api/health	Checks backend and database connection status
GET	/api/jobs	Retrieves saved job applications
POST	/api/jobs	Creates a job application
PATCH	/api/jobs/:id	Updates an existing application
DELETE	/api/jobs/:id	Deletes an application

Deployment

The application uses separate frontend and backend hosting.

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

The frontend communicates with the deployed backend through its API URL. The backend connects to MongoDB Atlas using the MONGO_URI environment variable configured in the hosting environment.

Security

* Environment files containing credentials must not be committed to GitHub.
* Database credentials should be stored in environment variables.
* MongoDB Atlas network access should be restricted appropriately for production use.

Future Improvements

Potential enhancements include:

* User authentication and individual user accounts
* Application deadlines and follow-up reminders
* Visual analytics for application progress
* Exporting application data
* Notifications for upcoming interviews and follow-ups

Author

Developed by Priyadarshini Jaliparthi as a full-stack MERN project.

⸻

This project was built to demonstrate full-stack web development, REST API design, database integration, and application deployment.

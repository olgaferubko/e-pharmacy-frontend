# E-Pharmacy

## About the project

E-Pharmacy is a full-stack web application for an online pharmacy.  
It allows users to browse medical products, read reviews, find nearby pharmacies, manage their cart and make secure purchases. The app includes user authentication, protected routes, a responsive UI and complete API integration with a custom backend.

## Key Features

### Frontend

- Fully responsive design (mobile / tablet / desktop)
- Authentication and session persistence (JWT + refresh tokens)
- Product search and filtering
- User dashboard and cart system
- Customer reviews and ratings
- Nearby pharmacies
- Clean, modern UI and modular architecture

### Backend

- RESTful API built with Node.js and Express
- MongoDB + Mongoose for database management
- Secure authentication with JWT and cookies
- Request validation and structured error handling
- Logging with Pino
- Auto-generated Swagger documentation
- CORS setup for secure frontend-backend communication

## Tech Stack

### Frontend

- React + Vite
- React Router
- Redux Toolkit
- React Hook Form + Yup
- Axios
- CSS Modules
- Deployed on Vercel

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Swagger-UI-Express
- Pino-HTTP
- Cookie-Parser + CORS
- Deployed on Render

## Pages and Routes

- `/` — Home page with main info and navigation
- `/medicine` — List of all available medicines with filters
- `/product/:id` — Detailed view of a single product
- `/store` — List of pharmacies
- `/cart` — User cart with checkout functionality
- `/login` — Login form for registered users
- `/register` — |Registration form for new users
- `/api-docs` — Swagger documentation for API testing

## How It Works

- The frontend sends requests to the backend API hosted on Render.
- The backend processes requests, interacts with MongoDB Atlas and returns structured JSON responses.
- JWT tokens are issued on login and stored in cookies for session persistence.
- The refresh token renews sessions without re-login.
- Redux Toolkit manages global app state and user data.
- Protected routes restrict access to cart and profile pages for unauthorized users.
- Swagger auto-generates API documentation and allows live endpoint testing.
- CORS ensures secure interaction between frontend (Vercel) and backend (Render).

## Getting Started:

```bash
Clone the repository:
git clone <your-repo-url>

Install dependencies:
npm install

Run locally:
npm run dev

Build for production:
npm run build
```

## About Me:

Hi! I'm Olga Ferubko, a Fullstack Developer passionate about crafting intuitive and responsive user interfaces. I'm constantly leveling up my skills in JavaScript and React and enjoy writing clean, maintainable code.

Feel free to connect with me:

GitHub: https://github.com/olgaferubko

Email: ferubko.olga@gmail.com

LinkedIn: https://www.linkedin.com/in/olga-ferubko/

Check it out:
Deployed and live here: https://e-pharmacy-frontend-two.vercel.app/

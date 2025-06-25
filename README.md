# JWT Authentication with Cookies, Google & GitHub OAuth, and Role-Based Access Control (RBAC)

A secure and scalable authentication system built with **Node.js**, **Express**, and **Passport.js** featuring:

- JWT-based authentication with **HTTP-only cookies**
- OAuth 2.0 login via **Google** and **GitHub**
- Role-Based Access Control (RBAC) for route protection
- Access and Refresh token handling with secure rotation
- Modular and extensible architecture

---

## Features

- Local user signup/login with JWT in secure cookies  
- OAuth authentication via Google and GitHub using Passport.js  
- Role-based middleware to restrict access to routes based on user roles  
- Refresh token rotation and revocation for enhanced security  
- Secure storage of sensitive tokens using HTTP-only cookies  
- Environment configuration using `.env` files  
- Sample `.env.example` for environment variables setup  

---

## Tech Stack

- **Node.js** & **Express** — Backend framework  
- **Passport.js** — Authentication middleware  
- **JWT (JSON Web Tokens)** — Token-based authentication  
- **HTTP-only cookies** — Secure token storage on client  
- **TypeScript** (optional) — Strong typing for scalability  

---

## Getting Started

### Prerequisites

- Node.js v16+ installed  
- Google OAuth 2.0 credentials ([Get here](https://console.cloud.google.com/apis/credentials))  
- GitHub OAuth app credentials ([Get here](https://github.com/settings/developers))  


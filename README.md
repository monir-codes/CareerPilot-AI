# CareerPilot AI - Frontend

<div align="center">
  <img src="public/logo.png" alt="CareerPilot AI Logo" width="120" />
</div>

<h1 align="center">CareerPilot AI (Client)</h1>

<p align="center">
  <strong>The modern, AI-powered career assistant platform.</strong>
</p>

## 🚀 Overview

CareerPilot AI is a state-of-the-art web application designed to help job seekers accelerate their career growth. The frontend is built with **Next.js 15 (App Router)** and features a deeply interactive, highly responsive, and premium UI powered by **Tailwind CSS** and **Framer Motion**.

### ✨ Features

- **AI Mock Interviews**: Participate in simulated, highly-targeted technical and behavioral interviews powered by Google Gemini.
- **Resume Analysis**: Instantly score and analyze your resume for ATS optimization.
- **Career Roadmaps**: Generate custom, step-by-step learning roadmaps to achieve specific career paths.
- **Authentication**: Seamless, highly-secure user authentication powered by [Clerk](https://clerk.com/).
- **Dynamic Dashboard**: Track your saved careers, chat histories, and platform activity.
- **Premium Design**: Dark mode support, glassmorphism UI elements, and fluid micro-animations.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) & Axios
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Clerk React/Next.js SDK](https://clerk.com/docs)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.17 or higher) and **npm** installed. You will also need the backend running locally.

### Installation

1. **Clone the repository and navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the frontend directory based on the `.env.example` template:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages (Public, Dashboard, Admin)
├── components/           # Global, reusable UI components
├── core/                 # Core logic, API interceptors, mock data, Zustand store
├── features/             # Feature-based domains (AI, Dashboard, Admin, Explore)
└── middleware.ts         # Clerk Authentication routing middleware
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

## 📝 License

This project is licensed under the MIT License.

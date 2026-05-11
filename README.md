# 🎓 EduQuest College Finder

A production-grade college discovery and decision platform designed for students and parents to find, compare, and analyze educational institutions.

## 🚀 Live Deployment
- **Frontend:** **https://edu-predict-ten.vercel.app/**
- **Backend API:** https://edupredict-8got.onrender.com

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Zustand (State Management)
- **Backend:** Node.js (TypeScript), Express, JWT, BcryptJS
- **Database:** PostgreSQL (via Prisma ORM)
- **Design System:** Academic Excellence System (Deep Blue & Vibrant Orange)

## ✨ Key Features
- **Advanced Discovery:** Search and filter colleges by location, rating, and name.
- **Detailed Profiles:** Full institutional data including placement statistics and course eligibility.
- **Comparison Engine:** Side-by-side matrix to compare key metrics across multiple colleges.
- **User Ecosystem:** Secure authentication, profile management, and personal bookmarks.
- **Community Voice:** Verified student reviews and ratings system.

## ⚙️ Setup & Installation

### Backend
1. `cd backend`
2. `npm install`
3. Configure `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/edupredict"
   JWT_SECRET="your_super_secret_key"
   PORT=5000
   ```
4. `npx prisma migrate dev`
5. `npm run seed` (Populates the DB with initial colleges)
6. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```
4. `npm run dev`

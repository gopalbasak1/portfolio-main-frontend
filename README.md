# 🌐 Gopal Basak - Portfolio & Blog Website

**🚀 Overview**
Welcome to my personal portfolio and blog website! This project is built using Next.js for the frontend and a Node.js/Express backend with MongoDB as the database. It showcases my skills, projects, and blogs while allowing users to interact with my content.

## Live Deployment Link

[Gopal Basak](https://gopal-portfolio.vercel.app/)

## 🚀 Features

### 🔹 Public Pages (Accessible to All Users)

- ✅ **Home Page (`/`)**

  - Personal **bio, profile picture, and social media links**.
  - **Download Resume** button.
  - **Skill section** (MERN Stack skills).
  - Featured **projects** showcase.
  - **Services section**.
  - **Image Upload:** Upload images directly to Cloudinary.
  - **Dark mode toggle** (Dark & very dark blue-magenta shades).

- ✅ **Projects Page (`/projects`)**

  - List of projects with **images, descriptions, and links**.
  - Clicking on a project opens a **detailed page (`/projects/[id]`)**.

- ✅ **Blog Page (`/blog`)**

  - List of blogs **(fetched from MongoDB)**.
  - Clicking on a blog opens a **detailed blog page (`/blog/[id]`)**.

- ✅ **Contact Page (`/contact`)**
  - Simple **contact form** (name, email, message).
  - Messages stored in **MongoDB**.

---

### 🔹 Dashboard (Only for Logged-in Users)

- ✅ **Login (`/dashboard`)**

  - Social login using **NextAuth** (**Google & GitHub**).
  - Email & password based authentication

- ✅ **Project Management (`/dashboard/projects`)**

  - CRUD operations: **Create, Read, Update, Delete** projects.
  - Upload **project image, title, live link, description, etc.**.

- ✅ **Blog Management (`/dashboard/blogs`)**

  - CRUD operations for **blogs**.
  - Supports **Markdown** for content formatting.

- ✅ **Message Management (`/dashboard/messages`)**
  - View **contact form messages**.

---

## 🛠️ **Tech Stack**

### ✅ **Frontend**

- **Next.js 15 (TypeScript)**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Swiper** for carousel
- **lottie-react** for icons
- **react-icons** for icons
- **Swiper** for carousel
- **dayjs & date-fns** for date
- **React Hook Form** for form validation
- **Redux Toolkit** for state management
- **Lucide-react & React-icons** for UI icons
- **Shadcn-ui** for UI icons
- **Sonner** for UI Notifications & important actions
- **lottie-react** for UI animations
- **react-simple-typewriter** for UI text animation

## Prerequisites

Ensure you have the following installed:

- npm or yarn

## 🚀 Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/Portfolio-Frontend
cd Portfolio-Frontend
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Create a redux baseApi

- Create a redux file and add baseApi configure your API URL:

```bash
http://localhost:5000/api  # Replace with your backend URL
```

## 4 Run the Project

- Development: Start the frontend with hot reloading:

```bash
yarn install
# or
npm install
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

### Configuration

## Scripts

- `npm run dev`: Run the fronted in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.

## Environment Variables (.env.local)

- Create a .env.local file in the root directory and add:

```

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

NEXTAUTH_URL=http://localhost:3000

#Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
NEXT_PUBLIC_CLOUDINARY_API_URL=cloudinary url
```

## Project Structure

```bash
/personal-portfolio
├── /app
│   ├── /withCommonLayout (Public)
│   │   ├── /blogs
│   │   ├── /contact
│   │   ├── /projects
│   │   ├── /resume
│   │   ├── /resume
│   │   ├── /services
│   │   ├── /messages
│   ├── /(widthDashboard)/dashboard(Protected Route)
│   │                     ├── /blogs (Manage Blogs)
│   │                     ├── /blogs (Manage Blogs)
│   │                     ├── /projects (Manage Projects)
│   │                     ├── /messages (View Messages)
│   │                     ├── /usersInfo
│   ├── /login (NextAuth Login)
│   ├── /register (NextAuth register)
│   ├── /error
│   ├── /not-found
│   ├── /theme-toggle
│   ├── /api/auth/[...nextauth]
├── /components (Reusable UI Components)
├── /lib (DB & Auth Config)
├── /styles (Global CSS)
├── /public (Static Assets)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json


```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.

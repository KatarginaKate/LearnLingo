# 🌍 LearnLingo

**LearnLingo** is a language learning platform that helps learners find language tutors, compare teaching styles, save favorites, and request trial lessons.

🔗 **Features** · 🛠️ **Tech Stack** · 🚀 **Getting Started** · 🔥 **Firebase** · 📁 **Project Structure**

---

## ✨ Features

- 👩‍🏫 Browse teacher profiles with languages, teaching levels, experience, reviews, and hourly rates.
- 🔎 Filter teachers by language, learner level, and maximum hourly price.
- 📖 Expand teacher profiles to read more details.
- 📅 Request a trial lesson with a selected teacher.
- 🔐 Create an account and sign in using Firebase Authentication.
- ❤️ Save teachers to a personal favorites list.
- 📦 Use bundled sample teacher data when live teacher records are unavailable.

## 🗺️ Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | 🏠 Home | Welcome page |
| `/teachers` | 👩‍🏫 Teachers | Teacher directory and filters |
| `/favorites` | ❤️ Favorites | Saved teachers (sign-in required) |
| `/login` | 🔐 Login | Sign-in form |
| `/register` | 📝 Register | Account registration |
| `/booking` | 📅 Booking | Redirects to `/teachers` |

React Router handles client-side route selection and navigation. Next.js provides the application shell, asset handling, and build tools.

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Authentication%20%26%20Database-FFCA28?logo=firebase&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=cssmodules&logoColor=white)

- ⚛️ **Next.js 16** and **React 19**
- 🧭 **React Router 7** — client-side routing
- 📘 **TypeScript** — type-safe development
- 🎨 **CSS Modules** — component-scoped styling
- 🔥 **Firebase Authentication** — user authentication
- 🗄️ **Firebase Realtime Database** — teacher records and application data
- 📋 **React Hook Form** and **Yup** — form handling and validation

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have installed:

- 🟢 [Node.js](https://nodejs.org/) 20 or newer
- 📦 npm

### ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd learnlingo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 **Note:** Configure Firebase before using authentication or live teacher data. If readable teacher records are unavailable, the application falls back to `data/teachers.json`.

## 🔥 Firebase Configuration

### 1. Create a Firebase project

- Create a project in the [Firebase Console](https://console.firebase.google.com/).
- Add a Firebase web app.
- Enable **Authentication → Sign-in method → Email/Password**.
- Create a **Realtime Database**.

### 2. Configure environment variables

Create a `.env.local` file in the project root and add your Firebase web-app configuration:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

🔄 Restart the development server after changing environment variables.

🔒 Environment files are ignored by Git. Never commit private credentials or secrets.

### 🛡️ Realtime Database Security

The current `database.rules.json` grants read and write access at the root to any authenticated user. Firebase Realtime Database permissions granted at a parent path are inherited by its children, so more restrictive child rules cannot override these root-level grants.

**Before deploying to production:**

- 🔐 Replace permissive rules with least-privilege access policies.
- 👤 Restrict access to user-specific data.
- 🧪 Test database permissions using the Firebase Rules Playground or Emulator Suite.
- 🚫 Never expose seed-account passwords or other private credentials in your repository.

### 📦 Import Sample Teachers

The seed script uploads `data/teachers.json` to the `teachers` path in Firebase.

Use a Firebase account authorized to write to that path. In PowerShell, configure seed-only credentials for the current terminal session:

```powershell
$env:FIREBASE_API_KEY = "your-api-key"
$env:FIREBASE_DATABASE_URL = "https://your-project-default-rtdb.firebaseio.com"
$env:FIREBASE_SEED_EMAIL = "seed-account@example.com"
$env:FIREBASE_SEED_PASSWORD = "your-password"

npm run seed:teachers
```

> ⚠️ Keep seed credentials private. Use a dedicated account with limited permissions and never commit credentials to Git.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | 🚀 Start the development server |
| `npm run build` | 🏗️ Create a production build |
| `npm start` | ▶️ Serve the production build |
| `npm run lint` | 🧹 Run ESLint |
| `npm run seed:teachers` | 📦 Import sample teachers into Firebase |

## 📁 Project Structure

```text
app/                  Next.js application shell and route entry files
components/
  AppRouter           React Router route table
  ...                 Shared UI, forms, dialogs, and teacher cards
data/
  teachers.json       Bundled sample teacher records
providers/             Authentication and favorites state
services/              Firebase authentication, favorites, and teacher data
public/                Images and SVG icon sprite
```

## 🔒 Security

- 🔑 Store local configuration in `.env.local`.
- 🚫 Never commit passwords, private credentials, or service-account keys.
- 🛡️ Configure Firebase Realtime Database rules before production deployment.
- 👥 Enforce appropriate access controls for user-specific favorites and other private data.

## 👩‍💻 Author

**Kateryna Nehoda**

- 💼 [LinkedIn](https://www.linkedin.com/in/kateryna-nehoda/)
- 🐙 [GitHub](https://github.com/KatarginaKate)

---

⭐ If you find this project useful, consider giving it a star on GitHub.
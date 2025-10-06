# 📂 Project Folder Structure

This document explains the directory structure of the project and its intended organization.

```
src/
│── app/                      # App-level config (entry point, providers, routes)
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx            # Centralized routing config
│   └── providers/            # Global context providers (Theme, Auth, QueryClient)
│
│── features/                 # Feature-based architecture (domain driven)
│   ├── auth/                 # Authentication (login, register, logout)
│   │   ├── components/       # UI components for Auth (LoginForm, etc.)
│   │   ├── hooks/            # Custom hooks (useLogin, useLogout)
│   │   ├── api.ts            # API calls for Auth
│   │   ├── types.ts          # Types/interfaces for Auth
│   │   └── index.ts
│   │
│   ├── posts/                # Example CMS Feature (Posts Management)
│   │   ├── components/       # PostCard, PostForm
│   │   ├── pages/            # PostListPage, PostEditPage
│   │   ├── hooks/            # usePosts, usePostMutation
│   │   ├── api.ts            # API layer for posts
│   │   ├── types.ts          # TS interfaces
│   │   └── index.ts
│   │
│   ├── users/                # Another feature (User Management)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── index.ts
│
│── shared/                   # Shared utilities across features
│   ├── components/           # Reusable UI (Button, Modal, Input, Table)
│   ├── hooks/                # Generic hooks (useDebounce, useDarkMode)
│   ├── utils/                # Helper functions (formatDate, validation)
│   ├── layouts/              # Layout components (DashboardLayout, AuthLayout)
│   ├── constants/            # Constants (roles, routes, enums)
│   ├── types/                # Global TypeScript types
│   └── config/               # Config files (API base URL, environment)
│
│── services/                 # Cross-cutting concerns
│   ├── http.ts               # Axios/Fetch wrapper with interceptors
│   ├── auth.ts               # Auth service (token handling, refresh)
│   └── storage.ts            # LocalStorage/session handling
│
│── styles/                   # Tailwind and global styles
│   ├── globals.css
│   └── tailwind.css
│
│── tests/                    # Central test utilities
│   ├── mocks/                # API mocks (MSW, dummy data)
│   ├── utils/                # Test helpers
│   └── __tests__/            # Jest/RTL test files
│
│── index.html
│── vite.config.ts            # Vite config
│── tsconfig.json
│── tailwind.config.js
│── postcss.config.js
│── package.json
```

---

## 🏗 Architecture Overview

* **`app/`** → Core application setup (entry point, routes, providers).
* **`features/`** → Domain-driven features (auth, posts, users), each encapsulating components, hooks, API calls, and types.
* **`shared/`** → Cross-feature reusable elements like UI, hooks, utils, constants, and global types.
* **`services/`** → Application-wide services (HTTP client, auth handling, storage).
* **`styles/`** → Tailwind and global CSS.
* **`tests/`** → Testing utilities, mocks, and test suites.

---

## 🚀 Tech Stack

* **Vite** for fast bundling
* **React + TypeScript** for development
* **React Query** (or similar) for data fetching
* **Tailwind CSS** for styling
* **Jest + RTL (React Testing Library)** for testing

---

## ✅ Benefits of This Structure

* **Scalable** → Easy to add new features without breaking existing ones.
* **Encapsulated** → Each feature manages its own logic, API, and types.
* **Reusable** → Shared utilities/components minimize duplication.
* **Maintainable** → Clear separation of concerns between app setup, features, and services.

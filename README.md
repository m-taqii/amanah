# Amanah — Good food. A shared trust.

**Amanah** is a mobile-first food surplus rescue platform built for **Lahore, Pakistan**. It connects food donors (restaurants, households, bakeries) with volunteer couriers who claim and deliver surplus food to those who need it — reducing waste and building community trust.

---

## ✨ Features

### 🍱 Food Donor
- Register and log in securely (JWT)
- Post surplus food listings with photo, quantity, and pickup details
- Track donation history and delivery status
- View impact statistics

### 🚴 Volunteer Courier
- Browse nearby rescue listings on a live feed
- Claim a rescue and track it through delivery stages
- Mark rescues as picked up and delivered
- View personal impact history

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Mobile** | React Native 0.88 · Expo ~58 · expo-router · TypeScript |
| **State / Storage** | React Context API · expo-secure-store |
| **HTTP Client** | Axios |
| **Backend** | Node.js (ESM) · Express v5 |
| **ORM** | Drizzle ORM |
| **Database** | PostgreSQL (`pg`) |
| **Auth** | JSON Web Tokens (bcrypt) |
| **Image Upload** | Multer (memory) → ImageKit CDN |
| **Icons** | @expo/vector-icons (Ionicons, Feather, MaterialCommunityIcons) |

---

## 📁 Project Structure

```
amanah/                             ← monorepo root
├── api/                            ← Express backend
│   ├── index.js                    ← entry point (starts server)
│   ├── drizzle.config.js           ← Drizzle ORM config
│   ├── package.json
│   ├── .env                        ← backend secrets (not committed)
│   └── src/
│       ├── app.js                  ← Express app, middleware, route registration
│       ├── controllers/
│       │   ├── user.controller.js  ← register, login, getMe
│       │   └── donations.controller.js ← createDonation, uploadImage, getDonations, getDonation, getUserDonations
│       ├── db/
│       │   ├── index.js            ← Drizzle client (node-postgres)
│       │   └── schema/
│       │       ├── user.js         ← users table definition
│       │       └── donations.js    ← donations table definition
│       ├── middlewares/
│       │   ├── auth.middleware.js  ← JWT verification middleware
│       │   └── upload.middleware.js← Multer (memoryStorage, image-only, 10 MB)
│       ├── repositories/
│       │   ├── user.repo.js        ← DB queries for users
│       │   └── donations.repo.js   ← DB queries for donations
│       ├── routes/
│       │   ├── user.route.js       ← /user/*
│       │   └── donations.route.js  ← /donations/*
│       └── services/
│           └── imageUpload.service.js ← ImageKit SDK upload helper
│
└── mobile/                         ← Expo React Native app
    ├── app.json
    ├── package.json
    ├── .env                        ← EXPO_PUBLIC_API_URL (not committed)
    └── src/
        ├── app/
        │   ├── _layout.tsx         ← root layout (AppProvider wrapping)
        │   └── index.tsx           ← auth guard + screen router
        ├── components/screens/
        │   ├── LoginScreen.tsx
        │   ├── RegisterScreen.tsx
        │   ├── DonorHomeScreen.tsx
        │   ├── ShareSurplusScreen.tsx
        │   ├── DonationsListScreen.tsx
        │   ├── ImpactScreen.tsx
        │   ├── NearbyRescuesScreen.tsx
        │   ├── RescueDetailsScreen.tsx
        │   ├── ActiveRescueScreen.tsx
        │   └── ProfileScreen.tsx
        ├── context/
        │   └── AppContext.tsx       ← global auth state + SecureStore persistence
        ├── lib/
        │   └── api.ts              ← Axios client + all API call functions
        └── constants/
            └── theme.ts            ← AmanahColors, Radius
```

---

## ✅ Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** v20+ and npm
- **PostgreSQL** (local or remote)
- **Expo CLI** — `npm install -g expo-cli`
- **Expo Go** app on your phone (for development on a physical device)
- An **ImageKit** account — [imagekit.io](https://imagekit.io) (free tier available)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/m-taqii/amanah.git
cd amanah
```

---

### 2. Backend Setup (`api/`)

```bash
cd api
npm install
```

Create a `.env` file inside `api/`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/amanah
JWT_SECRET=your_super_secret_jwt_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Push the database schema (creates `users` and `donations` tables):

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 3. Mobile Setup (`mobile/`)

```bash
cd mobile
npm install
```

Create a `.env` file inside `mobile/`:

```env
# For Android Emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000

# For physical device on the same Wi-Fi
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000

# For physical device on a different network (use VS Code port forwarding or tunnel)
EXPO_PUBLIC_API_URL=https://your-tunnel-url.devtunnels.ms
```

Start the Expo dev server:

```bash
npx expo start
```

> [!TIP]
> If you're testing on a **physical device that's not on the same network** as your machine, use VS Code's built-in **Port Forwarding** feature (Ports panel → Forward a Port → 5000, set visibility to Public), then use the forwarded tunnel URL in `EXPO_PUBLIC_API_URL`. Run Expo with `npx expo start --tunnel -c` for the mobile side.

---

## 📡 API Reference

All authenticated routes require the `Authorization: Bearer <token>` header.

### Auth

| Method | Route | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/user/register` | ❌ | `name, email, phone, password, role, address` | Register a new user |
| `POST` | `/user/login` | ❌ | `identifier` (email or phone), `password` | Login and receive JWT |
| `GET` | `/user/me` | ✅ | — | Get the authenticated user's profile |

### Donations

| Method | Route | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/donations` | ✅ | `multipart/form-data` — `title, description, quantity, address, image` | Create a food donation listing |
| `POST` | `/donations/upload` | ✅ | `multipart/form-data` — `image` | Upload an image to ImageKit, returns CDN URL |
| `GET` | `/donations` | ✅ | — | Get all donation listings |
| `GET` | `/donations/:id` | ✅ | — | Get a single donation by ID |

---

## 🔐 Authentication

```mermaid
sequenceDiagram
    participant App as Mobile App
    participant API as Express API
    participant DB as PostgreSQL
    participant Store as SecureStore

    App->>API: POST /user/login { identifier, password }
    API->>DB: Find user by email or phone
    DB-->>API: User record
    API->>API: bcrypt.compare(password, hash)
    API-->>App: { token, user }
    App->>Store: Save token, role, userData
    App->>App: Navigate to home screen (by role)

    Note over App,Store: On next app launch
    App->>Store: Load token, role, userData
    App->>App: Skip login → go directly to home
```

- **Tokens** are stored securely using `expo-secure-store` (never in AsyncStorage or plain memory).
- **Role-based routing** — after login, `donor` users go to `DonorHomeScreen`, `volunteer` users go to `NearbyRescuesScreen`.
- **Logout** clears all three SecureStore keys (`userToken`, `userRole`, `userData`) and returns to the login screen.

---

## 🖼 Image Upload Pipeline

```mermaid
flowchart LR
    A["Mobile App\n(FormData with 'image')"] -->|multipart POST| B["Express API\n/donations/upload"]
    B --> C["Multer\n(memoryStorage)"]
    C --> D["imageUpload.service.js\n(base64 encode → ImageKit SDK)"]
    D -->|HTTPS upload| E["ImageKit CDN"]
    E --CDN URL--> D
    D --imageUrl--> B
    B --"{ imageUrl }"--> A
```

- Multer stores the file **in memory only** — no local disk writes.
- The buffer is base64-encoded and uploaded to **ImageKit CDN** via the `@imagekit/nodejs` SDK.
- The returned CDN URL (`https://ik.imagekit.io/...`) is stored in the `donations` table.
- Max file size: **10 MB**. Only `image/*` MIME types are accepted.

---

## 🗄 Database Schema

### `users`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | auto-generated |
| `name` | text | required |
| `email` | text | unique |
| `phone` | text | unique |
| `password` | text | bcrypt hash |
| `role` | text | `donor` or `volunteer` |
| `address` | text | — |
| `createdAt` | timestamp | auto |

### `donations`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | auto-generated |
| `title` | text | listing title |
| `description` | text | — |
| `quantity` | text | e.g. "10 portions" |
| `address` | text | pickup address |
| `imageUrl` | text | ImageKit CDN URL |
| `donorId` | UUID (FK → users) | the posting donor |
| `status` | text | `available`, `claimed`, `delivered` |
| `createdAt` | timestamp | auto |

---

## 🏗 Architecture Overview

```mermaid
flowchart TD
    subgraph Mobile["📱 Mobile (Expo React Native)"]
        UI["Screen Components"]
        CTX["AppContext\n(Auth State)"]
        AXIOS["api.ts\n(Axios Client)"]
    end

    subgraph Backend["⚙️ Backend (Express API — Port 5000)"]
        ROUTES["Routes\n/user /donations"]
        CTRL["Controllers"]
        REPO["Repositories\n(Drizzle ORM)"]
        SVC["Services\n(ImageKit)"]
        MW["Middleware\nAuth · Multer"]
    end

    subgraph Data["🗃 Data Layer"]
        PG[("PostgreSQL\namanah DB")]
        IK["☁️ ImageKit CDN"]
    end

    UI <--> CTX
    UI --> AXIOS
    AXIOS -->|JWT + JSON/FormData| ROUTES
    ROUTES --> MW --> CTRL
    CTRL --> REPO --> PG
    CTRL --> SVC --> IK
```

---

## 🧰 Environment Variables Reference

### `api/.env`

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWTs |
| `IMAGEKIT_PUBLIC_KEY` | ✅ | From your ImageKit dashboard |
| `IMAGEKIT_PRIVATE_KEY` | ✅ | From your ImageKit dashboard |
| `IMAGEKIT_URL_ENDPOINT` | ✅ | Your ImageKit URL endpoint |

### `mobile/.env`

| Variable | Required | Description |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | ✅ | Full base URL of the backend (no trailing slash) |

> [!CAUTION]
> Never commit `.env` files to version control. Both `api/.env` and `mobile/.env` are listed in `.gitignore`.

---

## 💻 Development Notes

### Windows Firewall
If your physical device (on the same Wi-Fi) can't reach the backend, allow port 5000 through Windows Firewall:

```powershell
New-NetFirewallRule -DisplayName "Amanah API Dev" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
```

### Physical Device on Different Network
Use **VS Code Port Forwarding** (available in the Ports panel) to expose `localhost:5000` as a public HTTPS tunnel. Update `mobile/.env` with the tunnel URL and restart Expo with `--tunnel -c` to clear the cache.

### Expo Cache Issues
If the mobile app shows stale code after `.env` changes:

```bash
npx expo start --tunnel -c    # -c clears the Metro bundler cache
```

### Database Migrations
Schema changes are managed by Drizzle Kit. After editing any file in `api/src/db/schema/`:

```bash
cd api
npm run db:push    # pushes schema directly to the DB (dev only)
# or
npm run db:generate && npm run db:migrate    # generates + runs migrations
```

---

## 🗺 Roadmap

| Feature | Status |
|---|---|
| Donor: Post surplus food listing | ✅ v1.0 |
| Volunteer: Browse & claim rescues | ✅ v1.0 |
| JWT auth (email + phone login) | ✅ v1.0 |
| Image upload via ImageKit CDN | ✅ v1.0 |
| Donation history & impact screen | ✅ v1.0 |
| Google Sign-In | 🔜 v2.0 |
| Phone OTP authentication | 🔜 v2.0 |
| Real-time delivery tracking (map) | 🔜 v2.0 |
| Push notifications | 🔜 v2.0 |
| Admin dashboard | 🔜 v2.0 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

---

<div align="center">
  <strong>Built with ❤️ for Pakistan</strong><br/>
  <em>Amanah — أمانہ — A trust kept.</em>
</div>

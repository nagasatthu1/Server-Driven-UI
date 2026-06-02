# Dynamic Frontend Configuration Project

A modern full-stack application with dynamic frontend configuration driven by backend APIs.

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching and caching
- **React Router Dom** - Routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (ready to add)
- **Axios** - HTTP client
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

### Backend
- **Bun** - JavaScript runtime
- **Elysia** - Fast, type-safe web framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **JWT** - Authentication
- **Swagger** - API documentation

## Project Structure

```
/workspace
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                  # Bun backend application
│   ├── src/
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication logic
│   │   ├── config/          # Configuration handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   ├── package.json
│   └── tsconfig.json
│
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Bun (for backend)

### Installation

#### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

#### Backend
```bash
cd backend
bun install
cp .env.example .env
bun run dev
```

## Development

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend Commands
- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

## API Documentation

Once the backend is running, access the Swagger documentation at:
http://localhost:8080/docs

## Dynamic Configuration

The frontend receives configuration from the backend including:
- Theme settings (colors, dark mode)
- Feature flags
- Navigation structure
- Branding information

This allows for dynamic UI changes without redeploying the frontend.

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend (.env)
```
PORT=8080
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## License

ISC

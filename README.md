# Bailey Carroll - Portfolio & Admin Portal

A modern, full-stack portfolio website built with Next.js 15, featuring a comprehensive admin portal for content management. This project demonstrates advanced React patterns, database design, authentication systems, and production-ready deployment configurations.

## 🚀 Live Demo

- **Public Site**: [baileycarroll.dev](https://baileycarroll.dev)
- **Admin Portal**: [baileycarroll.dev/admin](https://baileycarroll.dev/admin) (Authentication Required)

## ✨ Features

### Public Portfolio
- **Modern Design**: Responsive, animated UI with floating elements and smooth transitions
- **Content Management**: Dynamic content pulled from a SQLite database
- **Performance Optimized**: Server-side rendering, image optimization, and efficient caching
- **SEO Ready**: Meta tags, structured data, and optimized for search engines
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Admin Portal
- **Secure Authentication**: Better Auth integration with session management
- **Full CRUD Operations**: Complete content management for all data types
- **Real-time Dashboard**: Live statistics and content overview
- **Advanced UI Components**: Custom form components, modals, and data tables
- **Search & Filtering**: Advanced content discovery with pagination
- **Bulk Operations**: Efficient content management workflows

### Technical Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, SQLite
- **Authentication**: Better Auth with email/password and session management
- **Database**: SQLite file with Prisma migrations
- **Deployment**: Node.js server with persistent storage for SQLite
- **Development**: pnpm, ESLint, TypeScript strict mode

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── (public)/          # Public routes with shared layout
│   ├── admin/             # Admin portal routes
│   ├── api/               # API routes for CRUD operations
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
├── services/              # Database service layer
├── lib/                   # Utilities and configurations
└── styles/                # Global styles and design system
```

### Database Design
- **Articles**: Blog posts with tags and categories
- **Poems**: Poetry with publication status and metadata
- **Projects**: Portfolio projects with skills and featured status
- **Skills**: Technical skills with experience levels and categories
- **Experiences**: Work history with skill associations
- **Users**: Admin users with Better Auth integration

### Security Features
- **Authentication**: Secure session management with Better Auth
- **Authorization**: Route protection with middleware
- **Input Validation**: Comprehensive form validation and sanitization
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Protection**: Content Security Policy and input sanitization
- **CSRF Protection**: Built-in Next.js CSRF protection

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm
- SQLite runs through Prisma; no database server is required
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/baileycarroll.dev.git
   cd baileycarroll.dev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Better Auth
   BETTER_AUTH_SECRET="replace-with-a-random-secret-at-least-32-characters-long"
   BETTER_AUTH_URL="http://localhost:3000"
   AUTH_USER_INIT="true"
   
   # Analytics (optional)
   NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run migrations
   pnpm db:migrate:deploy
   
   # Load the seed data once into the fresh database
   pnpm db:seed
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

6. **Create Admin User**
   ```bash
   # Visit setup page
   http://localhost:3000/setup
   ```

   Enable `AUTH_USER_INIT=true` in `.env` for initial setup, then disable it
   after creating the account. To create it from the command line, use
   `pnpm auth:bootstrap <email> <password> [name]`.

### Development Checks

```bash
pnpm typecheck
pnpm lint
pnpm test --runInBand
pnpm build
```

The application type check excludes Jest test files; Jest runs those separately.
Prisma Client is generated into its standard `@prisma/client` package location.

## 🚀 Deployment

### SQLite Deployment

Run on a Node.js host with a writable, persistent disk. Set `DATABASE_URL` to an
absolute SQLite file URL, such as `file:/data/portfolio.db` (Windows example:
`file:D:/data/portfolio.db`). Create the parent directory first. The development
URL `file:./dev.db` resolves to `prisma/dev.db`.

```env
DATABASE_URL="file:/data/portfolio.db"
BETTER_AUTH_SECRET=your_production_secret
BETTER_AUTH_URL=https://your-domain.example
AUTH_USER_INIT=false
```

```bash
pnpm install
pnpm build
# Run once on a fresh database:
pnpm db:seed
pnpm start
```

The build applies committed migrations before compiling the app. Use the same
database path at build time and runtime. Run one application instance against
the file and retain it across deployments. Local SQLite files are not persistent
application storage on Vercel Functions; the existing `vercel.json` does not
provide a suitable persistent SQLite deployment.

### Production Considerations

- **Database**: Store the SQLite file on persistent disk with write access
- **CDN**: Vercel Edge Network for global content delivery
- **Monitoring**: Vercel Analytics and error tracking
- **Backups**: Back up the SQLite file separately; database files are ignored by Git
- **Security**: HTTPS enforcement and security headers

## 📊 Performance

### Optimizations Implemented
- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Strategic caching for static and dynamic content
- **Database**: Prisma queries backed by local SQLite storage
- **Bundle Size**: Tree shaking and minimal dependencies

### Lighthouse Scores
- **Performance**: 37 (Needs optimization)
- **Accessibility**: 96 (Good)
- **Best Practices**: 100 (Excellent)
- **SEO**: 91 (Good)

> **Note**: These scores are from actual Lighthouse testing. Performance score is lower due to development server overhead and unoptimized assets. Production deployment with proper caching and optimization should improve these scores significantly.

## 🔧 API Documentation

### Authentication Endpoints
- `POST /api/auth/sign-in/email` - User sign in
- `POST /api/auth/sign-out` - User sign out
- `GET /api/auth/session` - Get current session

### Content Management APIs
- `GET /api/admin/articles` - List articles
- `POST /api/admin/articles` - Create article
- `PUT /api/admin/articles/[id]` - Update article
- `DELETE /api/admin/articles/[id]` - Delete article

Similar endpoints exist for poems, projects, skills, and experiences.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Public site responsiveness across devices
- [ ] Admin authentication flow
- [ ] CRUD operations for all content types
- [ ] Form validation and error handling
- [ ] Database connection stability
- [ ] Performance under load

### Automated Testing (Future Enhancement)
- Unit tests with Jest and React Testing Library
- Integration tests for API endpoints
- E2E tests with Playwright
- Database migration testing

## 📞 Contact

- **Portfolio**: [baileycarroll.dev](https://baileycarroll.dev)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Bailey Carroll](https://linkedin.com/in/baileycarroll)


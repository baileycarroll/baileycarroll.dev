# Bailey Carroll - Portfolio & Admin Portal

A modern, full-stack portfolio website built with Next.js 15, featuring a comprehensive admin portal for content management. This project demonstrates advanced React patterns, database design, authentication systems, and production-ready deployment configurations.

## 🚀 Live Demo

- **Public Site**: [baileycarroll.dev](https://baileycarroll.dev)
- **Admin Portal**: [baileycarroll.dev/admin](https://baileycarroll.dev/admin) (Authentication Required)

## ✨ Features

### Public Portfolio
- **Modern Design**: Responsive, animated UI with floating elements and smooth transitions
- **Content Management**: Dynamic content pulled from PostgreSQL database
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
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: Better Auth with email/password and session management
- **Database**: PostgreSQL with connection pooling and migrations
- **Deployment**: Vercel with optimized build configuration
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
- pnpm (recommended) or npm
- PostgreSQL database
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
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
   
   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key"
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
   pnpm prisma migrate dev
   
   # Seed database (optional)
   pnpm prisma db seed
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

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Configure build settings (already included in `vercel.json`)

2. **Environment Variables**
   Set the following in Vercel dashboard:
   ```env
   DATABASE_URL=your_production_database_url
   BETTER_AUTH_SECRET=your_production_secret
   BETTER_AUTH_URL=https://your-domain.vercel.app
   AUTH_USER_INIT=false
   ```

3. **Database Migration**
   ```bash
   pnpm prisma migrate deploy
   ```

### Production Considerations

- **Database**: Use connection pooling for production PostgreSQL
- **CDN**: Vercel Edge Network for global content delivery
- **Monitoring**: Vercel Analytics and error tracking
- **Backups**: Regular database backups and version control
- **Security**: HTTPS enforcement and security headers

## 📊 Performance

### Optimizations Implemented
- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Strategic caching for static and dynamic content
- **Database**: Connection pooling and query optimization
- **Bundle Size**: Tree shaking and minimal dependencies

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **Better Auth** for secure authentication
- **Prisma** for excellent database tooling
- **Tailwind CSS** for utility-first styling

## 📞 Contact

- **Portfolio**: [baileycarroll.dev](https://baileycarroll.dev)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Bailey Carroll](https://linkedin.com/in/baileycarroll)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

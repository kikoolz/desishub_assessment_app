# 🚀 Desishub Candidate Categorization Platform

A modern, full-stack web application for assessing developer skills and automatically categorizing candidates into skill tiers (0-4). Built with Next.js 15, React 19, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

---

## ✨ Features

- 🎯 **Interactive Assessment Flow** - Smooth, Google Forms-style question flow with animations
- 📊 **Admin Dashboard** - Professional TailAdmin interface with analytics
- 🎨 **Modern UI/UX** - Framer Motion animations, responsive design
- 🔍 **Advanced Filtering** - Search, filter by tier, sort candidates
- 📥 **CSV Export** - Download candidate data for analysis
- 🎉 **Celebration Effects** - Confetti on assessment completion
- 🔐 **Secure Authentication** - Admin-only access with NextAuth.js
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Server Components, code splitting
- 🛡️ **Type Safe** - Full TypeScript implementation

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database

### Authentication
- **NextAuth.js v5** - Secure authentication
- **bcryptjs** - Password hashing
- **JWT** - Session management

### UI & Visualization
- **shadcn/ui** - Modern component library
- **ApexCharts** - Data visualization
- **Lucide React** - Icon library

---

## 📋 Prerequisites

- **Node.js** 18+ or 20+
- **PostgreSQL** database (Supabase or Neon recommended)
- **npm** or **yarn** package manager

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd desishub-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Notifications (Optional - for sending tier results to candidates)
# If not configured, emails will be skipped but the app will continue to work
# Uncomment and configure ONE of the options below:

# Option 1: Gmail (requires App Password with 2FA enabled)
# SMTP_HOST="smtp.gmail.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@gmail.com"
# SMTP_PASS="your-16-char-app-password"
# SMTP_FROM="Desishub <no-reply@desishub.local>"

# Option 2: Mailtrap (for testing - recommended for development)
# SMTP_HOST="smtp.mailtrap.io"
# SMTP_PORT="2525"
# SMTP_USER="your-mailtrap-username"
# SMTP_PASS="your-mailtrap-password"
# SMTP_FROM="Desishub <no-reply@desishub.local>"

# Option 3: SendGrid
# SMTP_HOST="smtp.sendgrid.net"
# SMTP_PORT="587"
# SMTP_USER="apikey"
# SMTP_PASS="your-sendgrid-api-key"
# SMTP_FROM="Desishub <no-reply@desishub.local>"

# Option 4: AWS SES
# SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
# SMTP_PORT="587"
# SMTP_USER="your-ses-smtp-username"
# SMTP_PASS="your-ses-smtp-password"
# SMTP_FROM="Desishub <no-reply@desishub.local>"
```

**Setting up SMTP:**

1. **Gmail Setup:**
   - Enable 2FA on your Google account
   - Go to: https://myaccount.google.com/apppasswords
   - Generate an App Password (16 characters)
   - Use that as `SMTP_PASS`

2. **Mailtrap Setup (Recommended for Development):**
   - Sign up at https://mailtrap.io (free tier available)
   - Go to Email Testing > Inboxes
   - Copy SMTP credentials from the inbox
   - All emails will be captured in Mailtrap dashboard (not sent to real addresses)

3. **SendGrid Setup:**
   - Sign up at https://sendgrid.com
   - Create API Key in Settings > API Keys
   - Use `apikey` as `SMTP_USER` and your API key as `SMTP_PASS`

**Note:** Email notifications are optional. If SMTP is not configured, the system will continue to work but emails won't be sent. Check server logs for email status.

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Create Admin User

```bash
npm run create-admin admin@example.com password123 "Admin Name"
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 📊 Tier Assignment Logic

The system evaluates candidates based on 7 skill dimensions:

1. **Web Technologies** - HTML, CSS, JavaScript, React, Next.js
2. **CRUD Application Building** - Database integration skills
3. **Authentication Implementation** - Auth patterns knowledge
4. **Backend Frameworks** - Express, Hono, Laravel, etc.
5. **Golang Knowledge** - Go programming skills
6. **Deployment Experience** - Frontend/Full-stack deployment
7. **API Development** - Authenticated API building

### Tier Breakdown

- **Tier 0** - Beginner with basic web knowledge
- **Tier 1** - Can build CRUD apps without auth
- **Tier 2** - Full-stack Next.js with auth & deployment
- **Tier 3** - Multi-framework developer (no Golang)
- **Tier 4** - Advanced developer with Golang

Each tier includes personalized recommendations for skill advancement.

---

## 📁 Project Structure

```
desishub-platform/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── assessment/        # Public assessment flow
│   ├── admin/             # Protected admin area
│   │   ├── dashboard/     # Main dashboard
│   │   ├── candidates/    # Candidates management
│   │   ├── analytics/     # Analytics page
│   │   └── settings/      # Settings page
│   └── api/               # API routes
│       ├── auth/          # Authentication
│       ├── candidates/    # Candidate CRUD
│       └── stats/         # Statistics API
├── components/            # React components
│   ├── Assessment/        # Assessment components
│   ├── TailAdmin/         # Dashboard components
│   └── ui/                # UI primitives
├── lib/                   # Business logic
│   ├── tierCalculator.ts  # Tier calculation algorithm
│   ├── questions.ts       # Assessment questions
│   └── auth.ts            # Auth utilities
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
└── docs/                  # Documentation
    ├── PROJECT_STRUCTURE.md
    ├── SYSTEM_DESIGN.md
    ├── API_DOCUMENTATION.md
    └── DEPLOYMENT.md
```

For detailed structure, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)

---

## 🎯 Key Features Explained

### Assessment Flow

1. **Welcome Screen** - Introduces the platform
2. **Personal Info** - Collects candidate information
3. **Questions** - 8 skill assessment questions
4. **Completion** - Shows tier result with recommendations

### Admin Dashboard

- **Statistics Overview** - Total candidates, tier distribution, weekly count
- **Candidates Management** - View, search, filter, and manage candidates
- **Candidate Detail** - Full assessment responses and recommendations
- **Analytics** - Visual representation of tier distribution
- **Data Export** - CSV download functionality

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Push Prisma schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio

# Utilities
npm run create-admin     # Create admin user
```

---

## 🔐 Authentication

### Admin Access

- **Sign Up**: `/admin/signup`
- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard` (protected)

### Security Features

- Password hashing with bcrypt (12 rounds)
- JWT session tokens
- Protected routes with middleware
- Secure HTTP-only cookies

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
4. Deploy

The application will automatically:
- Run `prisma generate` during build
- Connect to your database
- Deploy successfully

For detailed deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Detailed project structure
- **[SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md)** - System architecture and design
- **[API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)** - Complete API reference
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment guide
- **[PRESENTATION.md](docs/PRESENTATION.md)** - Presentation-ready documentation

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Assessment flow works end-to-end
- [ ] Tier calculation is accurate
- [ ] Admin login/signup works
- [ ] Dashboard displays data correctly
- [ ] Candidate filtering works
- [ ] CSV export works
- [ ] Mobile responsive design

---

## 🔒 Security

- ✅ Password hashing (bcrypt)
- ✅ JWT session tokens
- ✅ Protected API routes
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ HTTPS enforced in production

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project was created for the Desishub Technical Challenge.

---

## 🙏 Acknowledgments

- **TailAdmin** - Dashboard template
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Next.js Team** - Amazing framework
- **Prisma** - Excellent ORM

---

## 📞 Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review the code comments
3. Check build logs
4. Verify environment variables

---

## 🎯 Roadmap

### Planned Features
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Advanced analytics
- [ ] Bulk operations
- [ ] Multi-format exports
- [ ] Role-based access control
- [ ] Audit logging

---

**Built with ❤️ using Next.js 15, React 19, and TypeScript**

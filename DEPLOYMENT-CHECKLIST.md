# PECS Kids Arabic — Deployment Checklist

> **Last Updated**: May 30, 2026
> **Status**: Ready for GitHub & Vercel Deployment

## Pre-Deployment Verification

### ✅ Environment Configuration
- [ ] `.env.example` is complete with all required variables
- [ ] `.env.local` is NOT committed to git (in `.gitignore`)
- [ ] Database connection string (if using PostgreSQL) is ready
- [ ] Clerk API keys configured (if using authentication)
- [ ] `NEXT_PUBLIC_APP_URL` set correctly for production domain

### ✅ Code Quality
- [ ] `npm run lint` passes without errors
- [ ] No TypeScript compilation errors (`npm run build` succeeds)
- [ ] No console errors in development mode
- [ ] All imports resolve correctly

### ✅ Dependencies
- [ ] `npm install` completes without errors
- [ ] All dependencies in `package.json` are used
- [ ] No security vulnerabilities (`npm audit` or similar)
- [ ] Node.js version compatible (18+ recommended, 20+ supported)

### ✅ Build & Performance
- [ ] `npm run build` succeeds
- [ ] Build size is reasonable (check `.next` folder)
- [ ] No warnings during build process
- [ ] Static assets are optimized (images compressed)

### ✅ Database (Optional - Only if `USE_DEMO_MODE=false`)
- [ ] PostgreSQL connection tested
- [ ] `prisma db push` executed successfully
- [ ] Database schema matches `prisma/schema.prisma`
- [ ] Sample data seeded with `npm run db:seed`
- [ ] Database URL uses environment variable

### ✅ Assets & Public Files
- [ ] All images in `/public/pictograms/` are present
- [ ] `public/manifest.json` is properly configured
- [ ] No broken image links in application
- [ ] SVG/PNG files are optimized

### ✅ Authentication Setup (If Using Clerk)
- [ ] Clerk project created at https://dashboard.clerk.com
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- [ ] `CLERK_SECRET_KEY` is set
- [ ] Sign-in/Sign-up URLs configured
- [ ] Redirect URLs configured (`/dashboard`)

### ✅ Git Repository
- [ ] Git repository initialized and tracked
- [ ] All source files committed
- [ ] `.env` and `.env*.local` are in `.gitignore`
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.next/` build output is in `.gitignore`
- [ ] README with setup instructions is present
- [ ] `.gitignore` includes IDE files (`.vscode`, `.idea`, etc.)

## GitHub Deployment Steps

### 1. Create Repository
```bash
# If not already created
git init
git add .
git commit -m "Initial commit: PECS Kids Arabic"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pictoweb.git
git push -u origin main
```

### 2. Update Remote (if already exists)
```bash
# Verify remote
git remote -v

# If URL is wrong, update it:
git remote set-url origin https://github.com/YOUR_USERNAME/pictoweb.git

# Push all changes
git push origin main
```

### 3. Create Tags for Releases
```bash
git tag -a v1.0.0 -m "Initial release - PECS Kids Arabic"
git push origin v1.0.0
```

## Vercel Deployment Steps

### 1. Connect GitHub Repository
- Go to https://vercel.com/dashboard
- Click "Add New Project"
- Select "Import Git Repository"
- Choose your GitHub repository

### 2. Configure Environment Variables
In Vercel Project Settings → Environment Variables:

**For Demo Mode (No Database):**
```
USE_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**For Production (With Database):**
```
USE_DEMO_MODE=false
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 3. Configure Build Settings
- **Framework Preset**: Next.js (should auto-detect)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 4. Deploy
- Click "Deploy"
- Wait for build to complete
- Access your application at `https://your-domain.vercel.app`

### 5. Post-Deployment
- [ ] Verify homepage loads correctly
- [ ] Test sentence builder functionality
- [ ] Test Arabic text-to-speech
- [ ] Test responsive design on mobile
- [ ] Verify API routes work
- [ ] Check error logs in Vercel dashboard

## Database Setup (PostgreSQL - Optional)

### Option 1: Managed PostgreSQL Service
Use one of these services (all Vercel-compatible):
- **Vercel Postgres** (easiest, integrated)
- **Railway.app** (reliable, affordable)
- **Supabase** (PostgreSQL + extras)
- **Neon** (serverless PostgreSQL)
- **AWS RDS** (enterprise)

### Option 2: Local PostgreSQL (Development)
```bash
# Mac (Homebrew)
brew install postgresql@15

# Windows (Installer)
# Download from https://www.postgresql.org/download/windows/

# Create database
createdb pecs_kids_arabic

# Update .env with local connection
DATABASE_URL="postgresql://user:password@localhost:5432/pecs_kids_arabic"

# Push schema and seed data
npm run db:setup
```

## Troubleshooting

### Build Errors

**"Cannot find module '@/...'"**
- Ensure `tsconfig.json` has correct `paths` configuration
- Run `npm install` to regenerate node_modules
- Check import statements use `@/` prefix correctly

**"Prisma client generation failed"**
- Run `npx prisma generate` manually
- Ensure `DATABASE_URL` is set (even for demo mode with placeholder)
- Check `prisma/schema.prisma` for syntax errors

**"Environment variable not found"**
- Variables starting with `NEXT_PUBLIC_` are available in browser
- Other variables only available on server
- Ensure `.env.local` has all required variables

### Runtime Errors

**"Database connection failed"**
- If `USE_DEMO_MODE=true`, demo data will be used instead
- If using real database, verify `DATABASE_URL` is correct
- Test connection: `npx prisma db execute --stdin < test.sql`

**"Clerk authentication failed"**
- Verify Clerk API keys are correct and not expired
- Check Clerk Dashboard for allowed redirect URLs
- Ensure callback URLs match your deployment domain

## Performance Checklist

- [ ] Next.js Image Optimization enabled
- [ ] CSS minified with Tailwind
- [ ] JavaScript code split and minified
- [ ] API routes return appropriate cache headers
- [ ] Database queries optimized (no N+1 queries)
- [ ] Lighthouse score > 90 (performance)

## Security Checklist

- [ ] All sensitive keys stored in environment variables
- [ ] `.env` file not committed to git
- [ ] API routes validate user input
- [ ] SQL injection prevented by Prisma ORM
- [ ] CORS headers configured if needed
- [ ] Database password uses strong, unique string
- [ ] No API keys hardcoded in source

## Post-Deployment Monitoring

### Vercel Dashboard
- Monitor build failures and performance
- Check function duration and memory usage
- Review error logs and analytics

### Application Monitoring
- Test core features regularly
- Monitor API response times
- Check error rates and logs

### Maintenance
- Keep dependencies updated: `npm outdated`
- Review security advisories: `npm audit`
- Monitor database performance (if using DB)
- Backup database regularly (if using DB)

## Rollback Procedure

If deployment has issues:

### GitHub
```bash
# Find previous working commit
git log --oneline

# Reset to previous state
git revert <commit-hash>
git push origin main
```

### Vercel
- Go to Deployments page
- Click on previous successful deployment
- Click "Redeploy"

## Useful Commands

```bash
# Development
npm run dev

# Build & test build
npm run build
npm start

# Database (if using PostgreSQL)
npm run db:push
npm run db:seed
npm run db:studio  # Visual DB explorer

# Linting
npm run lint

# Git
git status
git add .
git commit -m "message"
git push origin main
```

## Support & Documentation

- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **Clerk**: https://clerk.com/docs
- **Prisma**: https://www.prisma.io/docs
- **TailwindCSS**: https://tailwindcss.com/docs

---

**Ready to deploy! 🚀**

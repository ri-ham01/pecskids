# PECS Kids Arabic | بيكس كيدز عربي

منصة تواصل معزز وبديل (AAC) باللغة العربية للأطفال ذوي التوحد وغير الناطقين — مستوحاة من نظام PECS (Picture Exchange Communication System).

## المميزات

- واجهة عربية كاملة (RTL) مع خط Cairo
- لوحة تواصل سريعة بالصور
- بناء جمل بالسحب والإفلات (dnd-kit)
- تحدث بالعربية (Web Speech API)
- مكتبة صور رمزية مع فئات وبحث
- المفضلة وسجل التواصل
- لوحة الوالدين ولوحة الإدارة
- الوضع الداكن، تباين عالي، تقليل الحركة
- تصميم هادئ مناسب للأطفال ذوي التوحد

## التقنيات

| الطبقة | التقنية |
|--------|---------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, Framer Motion, Zustand, shadcn/ui |
| Backend | Next.js API Routes + Server Actions |
| Database | PostgreSQL + Prisma |
| Auth | Clerk |
| Deploy | Vercel |

## البنية

```
src/
├── app/           # صفحات App Router
├── components/    # مكونات UI مشتركة
├── features/      # ميزات (sentence-builder, home)
├── hooks/         # useArabicTTS, usePictograms
├── lib/           # prisma, utils, actions
├── services/      # طبقة خدمات قاعدة البيانات
├── stores/        # Zustand
├── styles/        # globals.css
├── types/         # TypeScript types
└── utils/         # constants
```

## التشغيل المحلي

### 1. المتطلبات

- Node.js 20+
- PostgreSQL
- حساب [Clerk](https://clerk.com)

### 2. التثبيت

```bash
npm install
cp .env.example .env
```

### 3. إعداد `.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pecs_kids_arabic"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. قاعدة البيانات

```bash
npx prisma db push
npm run db:seed
```

### 5. التشغيل

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## الصفحات

| المسار | الوصف |
|--------|-------|
| `/` | الصفحة الرئيسية |
| `/board` | لوحة التواصل (نقر = تحدث) |
| `/builder` | إنشاء الجمل (سحب + تحدث) |
| `/library` | مكتبة الصور الرمزية |
| `/favorites` | الجمل المحفوظة |
| `/settings` | الإعدادات والوصول |
| `/dashboard` | لوحة الوالدين |
| `/admin` | لوحة الإدارة |

## جعل مستخدم إداري

بعد التسجيل، حدّث الدور في PostgreSQL:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## النشر على Vercel

1. اربط المستودع بـ Vercel
2. أضف متغيرات البيئة من `.env.example`
3. أضف `DATABASE_URL` من [Neon](https://neon.tech) أو [Supabase](https://supabase.com)
4. نفّذ `prisma db push` و `db:seed` من CI أو يدوياً

## مثال التواصل

الطفل يختار: **أنا** + **أريد** + **ماء**  
يضغط **تحدث** → النظام ينطق: «أنا أريد ماء»

## الترخيص

MIT

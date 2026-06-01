# إعداد PostgreSQL — PECS Kids Arabic

## الخطوة 1: إنشاء قاعدة بيانات مجانية (Neon)

1. ادخل **https://neon.tech** وسجّل حساباً مجانياً
2. اضغط **New Project**
3. اختر اسم المشروع: `pecs-kids-arabic`
4. بعد الإنشاء، اذهب إلى **Dashboard → Connection Details**
5. اختر **Connection string** → **URI**
6. انسخ الرابط — يبدو هكذا:

```
postgresql://neondb_owner:AbCdEf123456@ep-cool-name-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## الخطوة 2: تعديل ملف `.env`

افتح الملف: `c:\Users\DELL\Desktop\pictoweb\.env`

استبدل السطر `DATABASE_URL` برابطك الحقيقي:

```env
DATABASE_URL="postgresql://neondb_owner:كلمة_المرور@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require"
USE_DEMO_MODE=false
```

> **مهم:** ضع الرابط بين علامتي `"` ولا تضف مسافات.

---

## الخطوة 3: إنشاء الجداول وملء البيانات

في Terminal:

```powershell
cd c:\Users\DELL\Desktop\pictoweb
npm run db:setup
```

إذا نجح، ستظهر: `✅ Seed completed!`

---

## الخطوة 4: تشغيل الموقع

```powershell
npm run dev
```

افتح: **http://localhost:3000/api/status**

يجب أن ترى:
```json
{ "mode": "postgresql", "connected": true, "hasUrl": true }
```

---

## الخطوة 5: الاستضافة على Vercel

في **Vercel → Settings → Environment Variables** أضف:

| المتغير | القيمة |
|---------|--------|
| `DATABASE_URL` | نفس رابط Neon |
| `USE_DEMO_MODE` | `false` |
| `NEXT_PUBLIC_APP_URL` | `https://اسم-مشروعك.vercel.app` |

---

## العودة للوضع التجريبي (بدون DB)

في `.env`:
```env
USE_DEMO_MODE=true
```

---

## مشاكل شائعة

| الخطأ | الحل |
|-------|------|
| `Can't reach database server` | تحقق من رابط DATABASE_URL و `sslmode=require` |
| `P1001` | قاعدة Neon نائمة — افتح Neon Dashboard لتنشيطها |
| `Seed failed` | نفّذ `npm run db:push` أولاً ثم `npm run db:seed` |

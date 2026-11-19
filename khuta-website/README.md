# Khuta خطى — Agency Website

موقع ثابت (Static) ثنائي اللغة (English / العربية) لوكالة Khuta.
HTML + CSS + JavaScript خام، بدون Framework وبدون أي Dependencies.

## المواصفات التقنية

| البند | القيمة |
|---|---|
| Framework Preset (Vercel) | **Other** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | لا شيء (لا توجد dependencies) |
| Node.js | 18 أو أحدث |
| Environment Variables | **لا شيء مطلوب** |

## التشغيل محلياً

```bash
npm run dev        # http://localhost:3000  (يخدم الملفات مباشرة)
npm run build      # ينشئ مجلد dist ويتحقق من أن كل الملفات المشار إليها موجودة
npm run preview    # يخدم مجلد dist لمعاينة نسخة الإنتاج
```

يمكنك أيضاً فتح `index.html` مباشرة من المتصفح، لكن استخدام الخادم المحلي أفضل.

## النشر على Vercel

**الطريقة 1 — عبر GitHub (موصى بها)**
1. أنشئ مستودعاً جديداً على GitHub وارفع محتويات هذا المجلد.
2. في Vercel: **Add New → Project** ثم اختر المستودع.
3. الإعدادات تُقرأ تلقائياً من `vercel.json` (Framework: Other، Build: `npm run build`، Output: `dist`). اضغط **Deploy**.
4. لربط الدومين: **Project → Settings → Domains** ثم أضف `www.khutaes.com`.

**الطريقة 2 — عبر Vercel CLI**
```bash
npm i -g vercel
vercel          # معاينة
vercel --prod   # إنتاج
```

## بنية المشروع

```
index.html              الصفحة الرئيسية (الهيكل فقط)
css/styles.css          كل التنسيقات (الوضع الفاتح/الداكن، RTL، Responsive)
js/app.js               كل المنطق والمحتوى والترجمة (EN/AR)
assets/fonts/           خط Thmanyah Sans (للعناوين العربية)
assets/img/             الشعار (نسخ فاتحة وداكنة)
assets/partners/        شعارات المنصات والشركاء
assets/tools/           أيقونات الأدوات
scripts/                build.mjs و serve.mjs
vercel.json             إعدادات Vercel (Headers وCache)
```

## ملاحظات مهمة

- **لا يوجد Backend أو قاعدة بيانات.** نموذج التواصل ومقدّر المشروع يجهّزان رسالة جاهزة ثم يفتحان واتساب أو البريد الإلكتروني، ولا يرسلان بيانات لأي خادم.
- **الخطوط:** Bricolage Grotesque وIBM Plex Sans Arabic تُحمَّل من Google Fonts (يتطلب اتصالاً بالإنترنت). خط Thmanyah Sans مضمّن محلياً.
- **التوجيه:** يعتمد على الـ hash (`#contact`, `#case-1`…) فلا يحتاج Rewrites في الاستضافة.

## محتوى مؤقت يجب تحديثه لاحقاً (موجود في `js/app.js` و`index.html`)

الموقع الآن يعمل بالمحتوى الأصلي كما هو. هذه البيانات تجريبية:

| العنصر | ما يحتاج تحديثاً |
|---|---|
| رقم واتساب | `966500000000` (يظهر في عدة أماكن) |
| رقم الهاتف | `+966110000000` |
| البريد / الدومين | `hello@khutaes.com` و`www.khutaes.com` |
| أمثلة الأعمال (Portfolio) | القوائم `WK` و`PW` في `js/app.js` (أسماء ونتائج تجريبية) |
| أرقام النتائج (+240%, −58%, 3.1x…) | أرقام توضيحية |
| العملاء والآراء (Testimonials) | أسماء واقتباسات تجريبية |
| المدونة | مقالات تجريبية، وزر "View all articles" غير مربوط بعد |
| حسابات التواصل الاجتماعي | روابط صفحة التواصل |
| ملف `favicon` / `apple-touch-icon` | مولّد من شعار Khuta الحالي |

للبحث السريع: `grep -n "966500000000" -r index.html js/`

## ربط النموذج بخدمة حقيقية (اختياري لاحقاً)

في `js/app.js` ابحث عن `TODO: also POST the form`. أنشئ Serverless Function في `/api/contact.js`، وضع المفاتيح في **Vercel → Settings → Environment Variables** (انظر `.env.example`)، ولا تضع أي مفتاح سري داخل ملفات الواجهة.

## النشر على Hostinger

1. شغّل `npm run build` (أو استخدم ملف dist الجاهز).
2. في hPanel افتح **Files → File Manager** وادخل إلى `public_html`.
3. ارفع **محتويات** مجلد `dist` (وليس المجلد نفسه) بما فيها الملف المخفي `.htaccess`، أو ارفعها مضغوطة ثم **Extract** داخل `public_html`.
4. يجب أن يكون `index.html` مباشرة داخل `public_html`.

ملف `.htaccess` يطبّق على Apache نفس الـ Headers والكاش الموجودة في `vercel.json`.

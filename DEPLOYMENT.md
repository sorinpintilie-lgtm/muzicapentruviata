# Ghid de Deployment - Muzică pentru Viață

## 🚀 Deployment Rapid pe Netlify

### Opțiunea 1: Deploy Automat prin Git (Recomandat)

1. **Creează un repository pe GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Muzică pentru Viață website"
git branch -M main
git remote add origin https://github.com/USERNAME/muzicapentruviata.git
git push -u origin main
```

2. **Conectează la Netlify:**
   - Mergi pe [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Selectează "GitHub" și autorizează accesul
   - Alege repository-ul `muzicapentruviata`
   - Netlify detectează automat setările din `netlify.toml`:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Deploy automat la fiecare modificare:**
   - Orice `git push` pe branch-ul `main` va declanșa un deploy automat
   - Netlify va rula `npm install` și `npm run build` automat

### Opțiunea 2: Deploy Manual (Drag & Drop)

1. **Build local:**
```bash
npm install
npm run build
```

2. **Deploy pe Netlify:**
   - Mergi pe [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Deploy manually"
   - Drag & drop directorul `dist/` în zona de upload
   - Așteaptă finalizarea deployment-ului

## 🌐 Configurare Domeniu Custom

După deployment, poți configura un domeniu personalizat:

1. În dashboard-ul Netlify, mergi la **"Domain settings"**
2. Click **"Add custom domain"**
3. Introdu domeniul dorit (ex: `muzicapentruviata.ro`)
4. Urmează instrucțiunile pentru configurarea DNS:
   - Dacă domeniul este la un registrar extern, adaugă un record CNAME sau A
   - Dacă transferi domeniul la Netlify, procesul este automat

## 📊 Verificare După Deployment

După deployment, verifică:

1. **Homepage (`/`):**
   - ✓ Logo "Muzică pentru Viață" vizibil
   - ✓ Headline emoțional: "Împreună construim primul spital..."
   - ✓ Buton "DONEAZĂ ACUM" funcțional (duce la oncohelp.ro/donatii/)
   - ✓ Countdown timer funcționează (14 decembrie, ora 19:00)
   - ✓ Imagine eveniment vizibilă
   - ✓ Sponsori afișați corect

2. **Navigație:**
   - ✓ Toate link-urile din nav funcționează
   - ✓ Tranziții smooth între pagini
   - ✓ Nav sticky la scroll

3. **Perete Mulțumiri (`/multumiri`):**
   - ✓ Nume afișate ca string continuu
   - ✓ Ultimul donator colorat în roz
   - ✓ Nume mai mari pentru donații mai mari
   - ✓ Separator "•" între nume

4. **Live & Video (`/live`):**
   - ✓ Placeholder pentru stream live
   - ✓ Text emoțional despre eveniment

5. **Galerie (`/galerie`):**
   - ✓ Imagini afișate în grid
   - ✓ Hover effects funcționează
   - ✓ Captions vizibile

6. **Despre OncoHelp (`/despre-oncohelp`):**
   - ✓ Text despre fundație
   - ✓ Explicații despre proiect

7. **Sponsori (`/sponsori`):**
   - ✓ Radio România Reșița ca organizator
   - ✓ Dacus și Sky Radio ca parteneri
   - ✓ Fără OncoHelp în lista de sponsori

8. **Footer:**
   - ✓ Audio player cu melodia campaniei

## 🔧 Troubleshooting

### Build eșuează

```bash
# Șterge node_modules și reinstalează
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Rutele nu funcționează pe Netlify

Verifică că [`netlify.toml`](netlify.toml:1) conține:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Imaginile nu se încarcă

Asigură-te că toate asset-urile (imagini, SVG-uri, audio) sunt în directorul root al proiectului, nu în `public/`. Vite le va copia automat în `dist/` la build.

## 📱 Testare pe Dispozitive Mobile

După deployment, testează pe:
- **Desktop:** Chrome, Firefox, Safari, Edge
- **Mobile:** iOS Safari, Android Chrome
- **Tablet:** iPad, Android tablets

Verifică:
- Responsive design funcționează
- Countdown timer se actualizează
- Butoanele sunt ușor de apăsat
- Textul este lizibil
- Imaginile se încarcă rapid

## 🔄 Actualizări Viitoare

Pentru a actualiza site-ul:

1. **Modifică fișierele necesare**
2. **Testează local:**
```bash
npm run dev
```
3. **Build și verifică:**
```bash
npm run build
npm run preview
```
4. **Deploy:**
   - **Git:** `git add . && git commit -m "Update" && git push`
   - **Manual:** Drag & drop noul `dist/` pe Netlify

## 📞 Suport

Pentru probleme tehnice:
- Verifică [documentația Netlify](https://docs.netlify.com)
- Verifică [documentația Vite](https://vitejs.dev)
- Verifică [documentația React Router](https://reactrouter.com)

---

**Site-ul este gata de deployment! 🎉**
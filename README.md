# Muzică pentru Viață - Website pentru Donații Spital Oncologic Reșița

Un site modern, emoțional și centrat pe donații, construit cu React, Vite și React Router pentru campania "Muzică pentru Viață" în sprijinul construirii primului spital oncologic din Reșița.

## 🎯 Caracteristici Principale

- **Homepage = Pagina de Donații**: Prima pagină pe care o văd vizitatorii este formularul de donații, pentru a maximiza conversiile
- **Perete Dinamic de Mulțumiri**: Numele donatorilor sunt afișate cu dimensiuni proporționale cu suma donată, primele 5 fiind evidențiate
- **Multiple Pagini**: Navigare fluidă între Donații, Live & Video, Galerie, Despre OncoHelp, Wall Mulțumiri și Sponsori
- **Design Emoțional**: Copy sentimental, culori calde, animații subtile pentru a inspira donații
- **Responsive**: Optimizat pentru desktop, tabletă și mobil
- **Persistență Date**: Donatorii sunt salvați în localStorage

## 📁 Structura Proiectului

```
muzicapentruviata/
├── public/                          # Asset-uri statice
│   ├── Logo Muzica pentru viata.svg
│   ├── onco-help-logo-d.png
│   ├── 16.jpg
│   └── ...
├── src/
│   ├── pages/                       # Componente pagină
│   │   ├── DonatePage.jsx          # Homepage - Formular donații
│   │   ├── WallPage.jsx            # Perete mulțumiri (nume + sume)
│   │   ├── LivePage.jsx            # Live stream & video
│   │   ├── GalleryPage.jsx         # Galerie foto
│   │   ├── AboutOncohelpPage.jsx   # Despre OncoHelp
│   │   └── SponsorsPage.jsx        # Sponsori & parteneri
│   ├── App.jsx                      # Layout & routing
│   ├── DonorContext.jsx             # Context pentru donatori
│   ├── main.jsx                     # Entry point React
│   └── styles.css                   # Stiluri globale
├── index.html                       # HTML entry Vite
├── package.json
├── vite.config.js
└── netlify.toml                     # Configurare Netlify

```

## 🚀 Instalare și Rulare Locală

### Cerințe
- Node.js 18+ și npm

### Pași

1. **Instalează dependențele:**
```bash
npm install
```

2. **Rulează serverul de dezvoltare:**
```bash
npm run dev
```

Site-ul va fi disponibil la `http://localhost:5173`

3. **Build pentru producție:**
```bash
npm run build
```

Fișierele optimizate vor fi generate în directorul `dist/`

4. **Preview build local:**
```bash
npm run preview
```

## 🌐 Deployment pe Netlify

### Opțiunea 1: Deploy Automat prin Git

1. **Push codul pe GitHub/GitLab/Bitbucket**

2. **Conectează repository-ul la Netlify:**
   - Mergi pe [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Selectează repository-ul
   - Netlify va detecta automat setările din `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Deploy automat:**
   - Fiecare push pe branch-ul principal va declanșa un deploy automat

### Opțiunea 2: Deploy Manual (Drag & Drop)

1. **Build local:**
```bash
npm run build
```

2. **Deploy pe Netlify:**
   - Mergi pe [netlify.com](https://netlify.com)
   - Click "Add new site" → "Deploy manually"
   - Drag & drop directorul `dist/` în zona de upload

### Configurare Domeniu Custom

După deploy, poți configura un domeniu custom:
1. În dashboard-ul Netlify, mergi la "Domain settings"
2. Click "Add custom domain"
3. Urmează instrucțiunile pentru configurarea DNS

## 🎨 Personalizare

### Culori și Branding

Editează variabilele CSS în [`src/styles.css`](src/styles.css:1):

```css
:root {
  --accent: #d81b60;        /* Culoare principală (roz) */
  --accent-soft: #fce4ec;   /* Fundal soft pentru accent */
  --text-main: #222222;     /* Text principal */
  --muted: #666666;         /* Text secundar */
  --border-soft: #f0f0f0;   /* Borduri subtile */
}
```

### Adăugare Video Live

În [`src/pages/LivePage.jsx`](src/pages/LivePage.jsx:1), înlocuiește placeholder-ul cu un iframe YouTube:

```jsx
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Muzică pentru Viață Live"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>
```

### Modificare Donatori Inițiali

Editează array-ul `INITIAL_DONORS` în [`src/DonorContext.jsx`](src/DonorContext.jsx:1)

## 📱 Pagini și Rute

| Rută | Pagină | Descriere |
|------|--------|-----------|
| `/` | Donații | Homepage - formular donații (PRIMA PAGINĂ) |
| `/donatii` | Donații | Alias pentru homepage |
| `/live` | Live & Video | Stream live și video-uri |
| `/galerie` | Galerie | Fotografii de la evenimente |
| `/despre-oncohelp` | Despre OncoHelp | Informații despre beneficiar |
| `/multumiri` | Wall Mulțumiri | Perete cu numele donatorilor |
| `/sponsori` | Sponsori | Mulțumiri sponsori și parteneri |

## 🎯 Flux Donație

1. **Vizitator intră pe site** → Vede direct formularul de donații (homepage)
2. **Completează formular:**
   - Nume (sau "În memoria lui...")
   - Sumă (cu sugestii rapide: 50, 100, 250, 500, 1000 lei)
   - Mesaj opțional
3. **Submit formular** → Numele este adăugat pe Wall-ul de Mulțumiri
4. **Redirect automat** → Pagina `/multumiri` unde vede numele evidențiat
5. **Donație reală** → Link către `oncohelp.ro/donatii/` pentru plata efectivă

## 🔧 Tehnologii Utilizate

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool modern și rapid
- **CSS3** - Stilizare custom (fără framework CSS)
- **LocalStorage** - Persistență date donatori

## 📊 Perete de Mulțumiri - Logică

- **Ordine**: Cel mai recent donator apare primul
- **Dimensiune nume**: Proporțională cu suma donată
  - 0-49 lei: foarte mic
  - 50-199 lei: mic
  - 200-499 lei: mediu
  - 500-999 lei: mare
  - 1000-1999 lei: foarte mare
  - 2000+ lei: extra mare
- **Evidențiere**: Primele 5 nume au fundal colorat și shadow

## 🤝 Contribuții

Pentru modificări sau îmbunătățiri:
1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Deschide un Pull Request

## 📞 Contact

Pentru întrebări despre campanie:
- **OncoHelp**: [oncohelp.ro](https://oncohelp.ro)
- **Radio România Reșița**: Organizator principal

## 📄 Licență

Acest proiect este creat pentru campania "Muzică pentru Viață" în sprijinul construirii spitalului oncologic din Reșița.

---

**Fiecare donație contează. Împreună construim speranță. ❤️**
# A Little Birthday Surprise 💗 — Interactive Birthday Website

A charming, romantic, mobile-friendly birthday surprise website crafted with pure **HTML5, CSS3, and Vanilla JavaScript**.

Designed specifically for her 25th birthday (10 October 2026 at 12:00 AM IST) with no photo requirements, featuring pure CSS shapes, interactive love-letter envelope animations, a multi-stage gift box, and celebratory floating particles.

---

## ✨ Features & Journey

1. **Screen 1 — Secret Countdown Lock 🔒**: Live real-time countdown calculating remaining time to `10 October 2026, 00:00:00 IST (+05:30)`. Automatically unlocks at midnight or opens immediately if loaded post-midnight.
2. **Screen 2 — The Age Reveal 🎂**: Animated reveal of her new age (**25 💗**) with soft celebratory confetti.
3. **Screen 3 — The Birthday Wish 💖**: Warm, sincere birthday message with an illustrated CSS birthday cake.
4. **Screen 4 — Personal Love Letter 💌**: Interactive 3D envelope that unseals on click and presents a heartfelt letter card.
5. **Screen 5 — Secret Gift Box 🎁**: Interactive gift box that opens and sequentially reveals 3 special reasons/wishes with progressive counters.
6. **Screen 6 — Final Dreamy Screen 🌙**: Peaceful night-sky aesthetic with stars, floating hearts, and closing wish.

---

## 📁 Project Structure

```
birthday-surprise/
├── index.html       # Semantic layout and 6 romantic screens
├── style.css        # Responsive styling, glassmorphism, CSS animations
├── script.js        # Countdown logic, interactive triggers, canvas particles
└── README.md        # Documentation & deployment guide
```

---

## 🚀 How to Run & Test Locally

### Option A: Direct Browser Open
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Safari, Firefox).

### Option B: Local Live Server (Recommended for Mobile Testing)
If you have Python or Node installed:

```bash
# Using Python
python -m http.server 8000

# Or using npx
npx serve .
```
Then visit `http://localhost:8000` (or `http://localhost:3000`).

---

## 🧪 Testing the Birthday Flow Before Midnight

Before the birthday unlocks, the website will display **Screen 1 (The Countdown)**.

You can preview the entire unlocked experience beforehand in two easy ways:

1. **One-Click Test Button**: On the countdown screen, click the subtle link at the bottom: **`⚙️ Test Mode: Preview Birthday Flow`**.
2. **URL Parameter**: Open your page with `?preview=birthday` in the browser address bar:
   `http://localhost:8000/?preview=birthday`

---

## ✏️ How to Personalize the Messages

All customizable copy is neatly organized at the top of [`script.js`](file:///c:/Projects/birthday-surprise/script.js#L14-L35) and inside [`index.html`](file:///c:/Projects/birthday-surprise/index.html):

* **Target Date & Time**: Configured in `script.js` under `BIRTHDAY_CONFIG.targetIsoString` (`2026-10-10T00:00:00+05:30`).
* **Letter Text**: Edit the paragraphs inside `<article class="letter-sheet">` in `index.html`.
* **Gift Box Reasons**: Edit the `reasons` array in `script.js`.

---

## 🌐 Free Deployment with GitHub Pages

Deploying takes under 2 minutes:

1. Create a free account at [GitHub.com](https://github.com).
2. Click **New Repository**, name it `birthday-surprise`, and keep it **Public**.
3. Upload `index.html`, `style.css`, and `script.js` directly through the GitHub web uploader (or `git push`).
4. In your repository, go to **Settings** ➔ **Pages** (in the left sidebar).
5. Under **Build and deployment** ➔ **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. GitHub will generate your live URL within ~60 seconds:
   `https://<your-username>.github.io/birthday-surprise/`
7. Copy the link, test it on your smartphone, and send it to her before midnight!

> **Note on Client-Side Time Locks**: Static websites perform client-side clock comparison. While it creates a delightful surprise for your girlfriend, visitors with developer tools could inspect source files. For a personal romantic gift, this is standard and ideal.

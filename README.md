# AI Cooking Assistant 🍳

An intelligent, full-featured cooking companion with hands-free voice-guided "Cook With Me" mode, dynamic recipe personalization, ingredient matching, mistake recovery, deterministic serving scaling, and multilingual support (English, Telugu, Hindi, Spanish).

## 📸 Project Preview

![AI Cooking Assistant Preview](./screenshots/ai-cooking-assistant-preview.png)

## ✨ Key Features

- **Hands-Free "Cook With Me" Studio**: Step-by-step full-screen cooking mode with voice narration, step navigation, interactive timers, and authentic high-resolution culinary photography.
- **Top 4 Famous Recipes**: Instant 1-click access to Pani Puri, Hyderabadi Dum Biryani, Golden Crispy Masala Dosa, and Molten Chocolate Lava Cake.
- **Restaurant Menu & Recipes**: Filterable specialty catalog covering Breakfast, Chef's Mains, Street Food, Royal Sweets, and Quick Under 30-minute meals.
- **Smart Pantry Matcher ("What Can I Cook?")**: Enter ingredients in your fridge/pantry to discover delicious matches with substitution intelligence and pantry staples detection.
- **Dynamic Math & Mistake Rescue**: Deterministic ingredient scaling from 1 to 24 servings, Restaurant vs. Homestyle mode adjustments, and actionable culinary recovery guides.
- **Multilingual Kitchen**: Full voice narration and translations for English, Telugu (తెలుగు), Hindi (हिंदी), and Spanish (Español).
- **Personalized Taste Profiles & Demo Mode**: One-click demo login (`Demo Chef`) and custom user preference tracking.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` (optional, for Gemini AI custom recipe generation):
```bash
cp .env.example .env
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Building for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion
- **Backend**: Node.js, Express, tsx
- **Audio/Speech**: Web Speech API & HTML5 Audio

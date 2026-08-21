# 📚 Aayush Raj Portfolio - Comprehensive Documentation & Customization Guide

Welcome to the full documentation for **Aayush Raj's Developer Portfolio**. This guide is written in clear, simple terms so you can customize any text, video, image, project, skill, animation speed, or education credential yourself whenever you want.

---

## 🗂️ 1. Project Directory & File Map

Here is the exact map of every file in this codebase and what it is responsible for:

| File Path | Purpose & What It Controls |
| :--- | :--- |
| **`/src/data/portfolioData.ts`** | **🔥 Central Data Hub:** All your personal info, education (B.Tech CSE AI 2030, IIT Madras 2025), languages (English, Hindi, Japanese), projects list, skills confidence %, and goals are defined here. |
| **`/src/types.ts`** | **TypeScript Interfaces:** Defines the structure for `UserProfile`, `Project`, `Skill`, and `LabExperiment`. |
| **`/src/App.tsx`** | **Main App Container:** Assembles the sections in order (Header, Hero, Lab, Work, Arsenal, About, Say Hello, Modals). |
| **`/src/index.css`** | **Global Styling & Print Rules:** Tailwind imports, font configurations, custom scrollbars, and single-page print optimization for your CV. |
| **`/index.html`** | **HTML Entrypoint:** SEO tags, page title, favicon, and Google Fonts (Bricolage Grotesque, Inter, Sora, Geist Mono). |
| **`/src/components/Header.tsx`** | **Navigation Bar:** Fixed header with logo brand, active section pill indicator, and direct "Say Hi" email button. |
| **`/src/components/Hero.tsx`** | **Landing Hero Section:** Your headline, AI/Data Science subtitle, desktop/mobile portrait photos, and CTA buttons. |
| **`/src/components/LabSection.tsx`** | **Interactive Lab & Game:** 60 FPS multi-wave Orbital Energy Collector game + Interactive Terminal CLI mode switcher. |
| **`/src/components/InteractiveTerminal.tsx`** | **Developer CLI Emulator:** Terminal simulator supporting `help`, `aayush --education`, `aayush --skills`, `aayush --projects`, etc. |
| **`/src/components/WorkSection.tsx`** | **Selected Work (2x2 Grid):** Shows your 1st project (Intro Webpage & Portfolio) and reserved slots for future projects with edge-to-center spring animations. |
| **`/src/components/ProjectModal.tsx`** | **Case Study Modal:** Opens when a project card is clicked, showing architectural blueprints, key features, and live links. |
| **`/src/components/StackSection.tsx`** | **Arsenal (Skills & Tools):** Filterable category tabs with proficiency progress bars and click-to-open skill details dialog. |
| **`/src/components/AboutSection.tsx`** | **About Me Section:** Scroll-based word illumination, quick badges, and expandable education focus accordion. |
| **`/src/components/SayHelloSection.tsx`** | **Contact & Footer:** Giant "Say hello" email client trigger, clipboard copy button, and social links. |
| **`/src/components/ResumeModal.tsx`** | **Resume / CV Modal:** Single-page A4 print-ready Curriculum Vitae with your B.Tech CSE (AI) 2030, IIT Madras 2025, and languages. |
| **`/src/components/ContactModal.tsx`** | **Contact Form Modal:** Popup transmission form with particle confetti celebration upon message dispatch. |

---

## ✏️ 2. How to Change Details in the Future

### 1. How to Change Personal Details, Bio & Email
- **File:** `/src/data/portfolioData.ts`
- **What to edit:** Look at the `USER_PROFILE` and `PERSONAL_INFO` objects:
  ```ts
  export const USER_PROFILE: UserProfile = {
    name: 'Aayush Raj',
    role: 'Computer Science (AI) Student & IIT Madras Data Science Scholar',
    email: 'aayushraj05@zohomail.in',
    location: 'India • Available Worldwide',
    languages: ['English', 'Hindi', 'Japanese'],
    ...
  };
  ```

### 2. How to Add or Change Videos & Embeds
- **To add a video to a project modal (`/src/components/ProjectModal.tsx`):**
  1. Add an `iframe` (e.g., YouTube or Vimeo embed) or an HTML5 `<video>` tag inside `ProjectModal.tsx`:
  ```tsx
  {/* Example Video Embed */}
  <div className="aspect-video w-full rounded-xl overflow-hidden my-4">
    <iframe
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
      title="Project Video Demo"
      className="w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
  ```
- **To add an HTML5 Local Video file (`.mp4` / `.webm`):**
  1. Place the video file in `/src/assets/videos/my_demo.mp4`.
  2. Import it: `import demoVideo from '../assets/videos/my_demo.mp4';`
  3. Render it:
  ```tsx
  <video src={demoVideo} controls autoPlay loop muted className="w-full rounded-xl" />
  ```

### 3. How to Change or Replace Images & Background Photos
- **Hero Desktop & Mobile Portraits (`/src/components/Hero.tsx`):**
  - Desktop image: `/src/assets/images/new-6-(1).png`
  - Mobile image: `/src/assets/images/aayush-mobile-image.png`
  - In `Hero.tsx`, imports are at lines 20-25. Simply swap the file or update the import path.
- **Project Card Images (`/src/data/portfolioData.ts`):**
  - In `PROJECTS` array, update the `image` field with any URL or imported local asset.

### 4. How to Unlock Reserved Projects (Projects 2, 3, and 4)
- **Files:** `/src/data/portfolioData.ts` and `/src/components/WorkSection.tsx`
- When you build your 2nd or 3rd project:
  1. In `/src/data/portfolioData.ts`, change `title: 'Reserved for future'` to your real project title (e.g., `'AI Health Diagnostics'`).
  2. Fill in `shortDescription`, `tags`, `liveUrl`, and `githubUrl`.
  3. In `/src/components/WorkSection.tsx`, uncomment the tags & description JSX blocks.

### 5. How to Edit Skills & Proficiency Percentages
- **File:** `/src/data/portfolioData.ts`
- Edit the `SKILLS` array:
  ```ts
  {
    id: 'python-ai',
    name: 'Python & Data Science Basics',
    category: 'Core Fundamentals',
    proficiency: 80, // Change this number from 0 to 100
    level: 'Comfortable',
    iconName: 'Sparkles',
    description: 'Python syntax, NumPy, Pandas, and ML algorithms.',
    popularFor: ['Data Science', 'Python 3', 'AI'],
  }
  ```

### 6. How to Edit the Single-Page Printable Resume
- **Files:** `/src/components/ResumeModal.tsx` and `/src/index.css`
- The resume is mathematically constrained to fit onto **exactly 1 standard A4 page** when printed or downloaded as PDF.
- To print or save as PDF, click the **"Download PDF / Print"** button in the top right of the CV modal.

---

## 🎨 3. Color Palette & Visual Theme

- **Obsidian Deep Background:** `#0c1324`
- **Elevated Card Surface:** `#151b2d`
- **Deep Navy Container Surface:** `#070d1f`
- **Electric Accent Blue:** `#008ef1` / `#4fb4ff`
- **Warm Amber Accent:** `#ffbc4d` / `#fbbf24`
- **Emerald Green:** `#34d399` / `#10b981`

---

## 🚀 4. How to Run Locally

1. Open a terminal in the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

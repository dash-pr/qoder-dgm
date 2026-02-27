# Onboard - Enterprise SaaS Onboarding AI Agent Landing Page

A modern, elegant landing page built with Next.js for the Onboard AI agent product.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page (imports all sections)
│   └── globals.css         # Global styles & animations
├── components/
│   ├── Nav.tsx             # Fixed navigation bar
│   ├── Hero.tsx            # Hero section with headline & CTAs
│   ├── Stats.tsx           # 4-column stats bar
│   ├── Demo.tsx            # Interactive terminal demo (client component)
│   ├── HowItWorks.tsx      # 4-step process + comparison card
│   ├── Security.tsx        # 6-card security features grid
│   ├── Testimonials.tsx    # 3-column testimonials
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer with logo & tagline
├── tailwind.config.ts      # Tailwind with custom colors & fonts
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Design System

### Colors
- **Background**: `#FAFAF8`
- **Foreground**: `#1A1A1A`
- **Accent Gold**: `#B8860B`
- **Muted**: `#F5F3F0`
- **Border**: `#E8E4DF`

### Typography
- **Headlines**: Playfair Display (serif)
- **Body/UI**: Source Sans 3 (sans-serif)
- **Labels/Code**: IBM Plex Mono (monospace)

### Key Patterns
- Section labels with flanking gold rule lines
- Paper texture overlay on body
- Generous whitespace (py-32 to py-40)
- 1px warm borders on cards
- Hover effects: `-translate-y-px` + enhanced shadows

## ✨ Features

- **Responsive Design**: Mobile-friendly, stacks to 1-column on small screens
- **Smooth Animations**: Fade-up entrance animations, respects `prefers-reduced-motion`
- **Interactive Demo**: Live terminal pipeline animation with step-by-step execution
- **Sticky Navigation**: Fixed nav with smooth scroll to sections
- **Accessible**: Semantic HTML, proper heading hierarchy, min 44px touch targets

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display, Source Sans 3, IBM Plex Mono)

## 📝 Editing Tips

### Adding a New Section
1. Create a new component in `components/YourSection.tsx`
2. Import and add it to `app/page.tsx`
3. Use the `section-label` class for consistent section headers

### Modifying Colors
Edit `tailwind.config.ts` under `theme.extend.colors`

### Adjusting Animations
Edit `app/globals.css` where keyframes are defined

## 🎯 Hackathon-Optimized

This setup is designed for quick iterations:
- Single-page architecture
- Component-per-section for easy collaboration
- No complex state management
- Minimal dependencies
- Fast hot-reload with Next.js

---

Built with ❤️ for the Onboard AI Agent

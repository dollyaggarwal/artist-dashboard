# 🎨 Artista — Artist Discovery Dashboard

A modern artist discovery platform where users can browse, search, filter, and upgrade artist profiles. Built with React, Tailwind CSS, and Framer Motion.

## 🚀 Live Demo

> Deploy to Vercel and paste your URL here

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework (functional components + hooks) |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations and transitions |
| React Hot Toast | Toast notifications |
| React Icons | Icon library |
| Axios | API data fetching |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── animations/
│   │   ├── Aurora.jsx          # Animated mesh gradient background
│   │   ├── Particles.jsx       # Floating connected dots canvas effect
│   │   ├── MagneticButton.jsx  # Cursor-following magnetic button
│   │   ├── SpotlightButton.jsx # Cursor spotlight hover effect
│   │   ├── ShimmerText.jsx     # Moving shimmer gradient text
│   │   └── CustomCursor.jsx    # Custom glowing cursor on upgrade elements
│   ├── Header.jsx              # Sticky nav with dark mode toggle
│   ├── SearchFilters.jsx       # Search bar + category + sort dropdowns
│   ├── ArtistCard.jsx          # Artist grid card with upgrade button
│   ├── SkeletonCard.jsx        # Loading placeholder card
│   ├── UpgradeModal.jsx        # Multi-step payment simulation modal
│   └── FeaturedBanner.jsx      # Premium artists banner on discover page
├── pages/
│   ├── HomePage.jsx            # Main discovery page
│   ├── FeaturedPage.jsx        # Dedicated featured artists page (/featured)
│   └── ProfilePage.jsx         # Artist detail + portfolio page
├── context/
│   └── ArtistContext.js        # Global state (artists, dark mode, premium)
├── hooks/
│   ├── useDebounce.js          # Debounce hook for search input
│   ├── useFilteredArtists.js   # Filter + sort logic
│   └── usePagination.js        # Infinite-scroll pagination (8 per page)
├── services/
│   └── artistService.js        # randomuser.me API fetch + data mapping
├── utils/
│   └── formatters.js           # formatFollowers, getCategoryColor
└── data/
    └── artists.js              # Category constants + sort options
```

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/dollyaggarwal/artist-dashboard.git

# 2. Navigate into the folder
cd artist-dashboard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm start
```

App will run at `http://localhost:3000`

---

## ✨ Features

### Core
- ✅ Fetches 20 artists from `randomuser.me` API
- ✅ Browse artists in a responsive grid (4 col → 2 col → 1 col)
- ✅ Search by name or location (debounced 350ms)
- ✅ Filter by art category
- ✅ Sort by Most Followers / Name A–Z / Name Z–A
- ✅ Infinite scroll pagination (8 artists per page)
- ✅ Artist profile page with portfolio gallery + lightbox
- ✅ Premium upgrade modal with simulated payment flow

### Premium Features (on upgrade)
- ✅ Gold Premium badge on artist card
- ✅ Priority listing (premium artists appear first in Discover)
- ✅ Full 6-image portfolio gallery (free = 4 images)
- ✅ Featured banner on Discover page homepage
- ✅ Listed on dedicated Featured page (`/featured`)
- ✅ Custom profile banner image
- ✅ External website link unlocked

### Featured Page (`/featured`)
- ✅ Aurora animated hero banner at the top
- ✅ All premium artists displayed as large expandable cards
- ✅ Click any card to expand — shows bio, portfolio strip, social links
- ✅ Non-premium artists shown below with "Get Featured" upgrade prompt
- ✅ Empty state with upgrade CTA when no premium artists exist

### Animations
- ✅ Aurora animated background in upgrade modal and featured page (Canvas)
- ✅ Floating particles with connecting lines in modal header (Canvas)
- ✅ ShimmerText on premium headings and payment flow
- ✅ SpotlightButton — cursor spotlight on upgrade CTAs
- ✅ MagneticButton — cursor-following Pay button
- ✅ Custom glowing cursor on all upgrade elements
- ✅ Portfolio gallery — ripple on click, slide lightbox, zoom + drag
- ✅ Framer Motion — card entrance, modal spring, staggered reveals
- ✅ Skeleton loading cards on first visit

### Bonus
- ✅ Dark mode toggle (persisted via localStorage)
- ✅ Debounced search
- ✅ Persistent filters (sessionStorage)
- ✅ Premium status persisted via localStorage

---

## 🎨 Design Decisions

- **Font pairing**: Syne (display/headings) + DM Sans (body)
- **Color system**: Orange-to-pink gradient accent on a clean light/dark neutral base
- **Context API**: Global state for artists and dark mode — avoids prop drilling
- **Custom hooks**: `useFilteredArtists`, `useDebounce`, `usePagination` fully decoupled from UI
- **Payment simulation**: Multi-step flow (Plan → Card Form → Processing → Success) with validation
- **Premium priority listing**: Applied inside `useFilteredArtists` — always floats premium artists first

---

## 📦 Available Scripts

```bash
npm start       # Start development server
npm run build   # Production build
npm test        # Run tests
```

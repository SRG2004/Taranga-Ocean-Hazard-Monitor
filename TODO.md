# Tarang UI Development TODO

## 1. Project Initialization [ ]
- Run `npx create-react-app tarang-ui` in d:/Tarang to scaffold the React app.
- Confirm success from user response.
- Run `cd tarang-ui && npm install react-router-dom framer-motion` to add dependencies for routing and animations.
- Confirm success.

## 2. Core Layout and Styling [ ]
- Update src/App.js: Set up BrowserRouter, Routes for all pages, AnimatePresence for transitions, layout with Sidebar and main content (motion.div).
- Create src/components/Sidebar.js: Vertical nav with links, motion for slide-in/hover.
- Create src/components/Card.js: Reusable animated card component.
- Create src/components/Header.js: Mobile toggle for sidebar.
- Update src/styles/App.css: CSS variables for neutral+blue theme, keyframes for animations (fadeIn, slideUp, pulse), styles for sidebar/main/cards/buttons, responsive media queries.
- Update public/index.html: Title, meta tags.
- Update src/index.js: Import App.css.
- Confirm files created/updated via user response.

## 3. Home Page Implementation [x]
- Create src/pages/Home.js: Hero section (motion.div fade-in), about paragraph (staggered), helpline Card (animated, blue button), safety measures ul (staggered li slide-up), ocean hazards gallery (motion.div grid of 4 img Cards with external URLs for Indian hazards, staggered fade-in/hover zoom).
- Update src/App.js to include route for / (Home).
- Confirm and test home layout/animations.

## 4. Remaining Pages [ ]
- Create src/pages/VolunteerRegistration.js: Animated form in Card.
- Create src/pages/CitizenDashboard.js: Welcome + grid of 5 animated Cards.
- Create src/pages/Reports.js: Tabs + loading spinner animation.
- Create src/pages/Support.js: Subtitle + Cards + status table (hover transitions).
- Create src/pages/Analytics.js: Sections with animated bars/lists.
- Create src/pages/HazardAnalysis.js: Chart placeholders (animate heights) + table.
- Create src/pages/Donations.js: Stats Cards + form + list (staggered).
- Create src/pages/SocialMonitoring.js: Grid sections with animate fills/staggers.
- Create src/pages/SocialPosts.js: List of animated Cards (staggered, pulse badges).
- Create src/pages/MapView.js: Filters + map div (placeholder bg/SVG) + legend + popup modal (slide-down) + stats badges.
- Create src/pages/Settings.js: Profile form with input animations.
- Create src/pages/Official.js: Dashboard with extra animated buttons.
- Create src/pages/App.js: Overview with intro animation.
- Add all routes to src/App.js.
- Confirm each creation iteratively.

## 5. Testing and Verification [ ]
- Run `npm start` in tarang-ui to launch localhost:3000.
- Use browser_action to launch http://localhost:3000, navigate pages, verify: neutral+blue theme, left sidebar (toggle on mobile), home (hero + about + helpline + safety tips + animated Indian hazard image gallery, no original cards), animations/transitions (fades, slides, hovers, staggers), responsive layout.
- Update TODO.md with [x] after each major step.
- If issues, debug with console logs or edits.

## 6. Completion [ ]
- All features implemented and tested.
- Use attempt_completion with result summary and `npm start` command for demo.

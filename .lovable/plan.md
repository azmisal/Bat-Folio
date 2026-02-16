

# 🦇 The Batcomputer — Azmi Saleem's 3D Portfolio

## Visual Identity & Theme
- **Color palette**: Deep Carbon Black (#020617), Bat-Suit Grey (#1E293B), Vigilante Yellow (#EAB308), Justice Blue (#38B2AC)
- **Typography**: Monospaced font (JetBrains Mono via Google Fonts) for that brutalist, high-tech feel
- **UI style**: Sharp edges, thick borders, scan-line effects, glitch text animations

## 3D Experience (React Three Fiber)
- **Hero**: A slowly rotating 3D wireframe Bat-Symbol that shatters into particles on mouse hover and reforms when the cursor leaves
- **Background**: A scrolling 3D point-cloud cityscape (Gotham) that reacts to scroll depth — parallax and particle density shift as you scroll
- **Mobile**: 3D simplifies to a clean tactical HUD grid with subtle particle effects for performance

## Section Architecture

### 1. Hero / Landing
- The hook: *"I don't wear a cape. I have production access — same thing."*
- Subtext about being a Master of Backend Shadows
- Animated Bat-Symbol 3D element
- "Illuminate the Signal" CTA button with glow effect

### 2. "The Batcave" — About Me
- Your summary adapted to the Batman persona: *"I don't have superpowers. I have logic, 10,000 hours of debugging, and better tools than you."*
- Real info: ~3 years experience at TCS, full-stack background, B.Tech in CS from GEC Thrissur
- Animated stats: 5+ projects delivered, 3 years experience, enterprise clients (J&J, Stryker)

### 3. "Case Files" — Projects (Classified Dossiers)
Each project displayed as a classified file with a "scanning" animation on viewport entry:
- **Cryptmaster** — Crypto trading practice platform (React, Node, MongoDB)
- **FocusPilot** — AI-driven task manager (React, FastAPI, MongoDB)
- **Offcet & Edges+** — Carbon offsetting platforms (client work at MetaShot)
- **IPfy** — Blockchain IP registration system
- **Runner** — Online coding platform
- **Saviour** — Secure file/password storage
- Each card shows: Status (Live/In Progress), Tech Stack, and "Evidence of Problem Solving" instead of description

### 4. "The Utility Belt" — Skills
Three categories with animated progress indicators:
- **Shadow Ops (Backend)**: Node.js, Express.js, MongoDB, MySQL, PostgreSQL, RESTful APIs, Java
- **Combat Tactics (Frontend)**: React.js, Next.js, HTML5/CSS3, Three.js, Figma
- **Detective Work (Problem Solving)**: Debugging legacy code, production support, cross-functional collaboration

### 5. "Mission Log" — Work Experience Timeline
- **TCS — System Engineer** (July 2024 – Present): Healthcare enterprise apps for J&J and Stryker
- **MetaShot — Frontend Developer Intern** (Jul–Oct 2023): Carbon offsetting platform
- **Mezmo Solutions — Full Stack Developer** (Mar 2022 – Dec 2023): Client-facing web apps

### 6. "Achievements & Operations"
- Web Master ISTE, event organizer roles (Proxy22, NUEVA, Matrix, Summer Startup Festival)
- Displayed as mission badges/commendations

### 7. Contact / CTA Footer
- "Illuminate the Signal" button linking to email (azmisaleem96@gmail.com)
- Links to LinkedIn, GitHub, and existing portfolio
- Phone: +91 9072760818

## Interactive Features
- **Night Vision Toggle**: Flips entire site to neon green (#00FF41) on black — classic night-vision aesthetic
- **Smooth scroll** between sections with scroll-linked 3D background animations
- **Viewport-triggered animations**: Scanning/glitch effects as sections enter view
- **Fully responsive**: Desktop gets full 3D experience, mobile gets simplified tactical HUD layout


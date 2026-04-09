Interactive Wall Calendar (Frontend Challenge)
A premium, interactive React/Next.js calendar component that bridges the gap between a physical wall calendar aesthetic and modern digital functionality. Built with a focus on smooth UX, micro-interactions, and clean architecture.

Key Features
Skeuomorphic Wall Design: Styled to emulate a physical hanging calendar with paper-depth shadows and a dedicated hero image anchor.

Intelligent Range Selection: Select a start and end date with a fluid, translucent highlight across the grid (Powered by date-fns).

Integrated Notes Module: A dedicated sidebar/bottom-sheet for jottings that persists across sessions using localStorage.

Ultra-Responsive: Flawless transition from a side-by-side Desktop layout to a vertically stacked Mobile view.

Polished Animations: Smooth month-switching transitions using Framer Motion.

🛠 Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript (for type-safety and robust code)

Styling: Tailwind CSS

Animations: Framer Motion

Date Logic: date-fns

Demo & Links
Live Demo: [Insert Your Render/Vercel Link Here]

Video Walkthrough: [Insert Loom/YouTube Link Here]

Getting Started
Follow these steps to run the project locally:

Clone the repository:

Bash
 git clone https://github.com/Anubhavspeaks01/calendar-challenge.git
cd calendar-challenge
Install dependencies:

Bash
npm install
# or
yarn install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

 Engineering Decisions
Modular Components: Split the UI into CalendarGrid, HeroSection, and NotesSidebar for better maintainability.

Custom Hooks: Implemented a useCalendar hook to decouple date logic from the UI.

UX Focus: Added "Today" snap-back functionality and hover-states for better visual feedback.

Zero-Backend: Used localStorage for data persistence to keep the project lightweight and strictly frontend-focused.

Developed with ❤️ by Anubhav Singh

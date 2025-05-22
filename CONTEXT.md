# AI Study Tool - Design-Focused Developer Documentation

## 🧠 Overview

The AI Study Tool is a web-based platform that empowers educators and students through intuitive, AI-driven learning experiences. With seamless Canvas LMS integration and generative AI at its core, the tool prioritizes clean UX, responsive UI, and thoughtful feature design to maximize usability and engagement.

---

## 🎭 Roles and UX Considerations

### 👩‍🏫 Professor

* **User Goals**: Easily set up courses, manage content, and track student performance.
* **Design Focus**: Admin-friendly dashboards with modular cards, quick toggles, and visual data summaries.
* **Permissions**:

  * Connect Canvas account (OAuth)
  * Upload documents (PDF, DOCX, PPTX)
  * Manage classroom settings and feature visibility
  * View performance analytics with interactive visualizations
  * Generate shareable course codes

### 👨‍🎓 Student

* **User Goals**: Practice efficiently, track growth, and stay motivated.
* **Design Focus**: Gamified interfaces, clean feedback visuals, and easy navigation.
* **Permissions**:

  * Join courses via code or link
  * Take custom quizzes (topics, difficulty, format)
  * Generate AI-based questions with dynamic explanations
  * View performance trends and earn rewards

---

## 🔄 Application UX Flow

### Professor Journey

1. **🎫 Onboarding**

   * Simple sign-up with tooltip-guided steps
   * Canvas connection via OAuth modal
   * Create course via a minimal input form (title, description, Canvas URL)

2. **📁 Course Material Interface**

   * Drag-and-drop upload zone with progress bar
   * File preview and document parsing confirmation before publishing

3. **⚙️ Classroom Settings**

   * Feature toggles with tooltips
   * Student visibility filters using smart tags (e.g., topic-based access)

4. **📊 Analytics Dashboard**

   * Heatmaps, bar graphs, and pie charts
   * Side-by-side class vs. individual comparison
   * Export CSV/PDF options

---

### Student Journey

1. **🚀 Quick Join Flow**

   * Sign-up with minimal friction
   * Enter code > Instant access > Clean landing dashboard

2. **🧪 Quiz Experience**

   * Select from dropdowns (topic, difficulty, format)
   * LLM-generated questions rendered with smooth transitions
   * Feedback with score + visual explanation (progress bar, icons)

3. **📈 Performance Tracking**

   * Trend lines over time, color-coded topics
   * “Next Step” suggestions in card format
   * Quiz history with retry option

4. **🏆 Gamification**

   * XP tracker, badge grid, and animated progress milestones
   * Leaderboard UI inspired by gaming dashboards

---

## 🌐 Professor Dashboard Overview

The main dashboard for professors is structured as a two-column layout with top-level navigation and modular cards, enabling quick access and clarity. Inspired by the structure of modern educational dashboards, each section is spaced for readability and interaction.

### 🤖 Dashboard Structure and Elements

* **Left Sidebar Navigation** (minimizable/maximizable)

  * Dashboard (default landing)
  * Analytics
  * Calendar
  * Inbox
  * Courses (expandable)
  * Class Settings, Notifications, Students

* **Main Panel (Left Column)**

  * **Course Overview Cards**

    * Modular cards per course
    * Includes title, number of students, quiz stats
    * Icon buttons for quick access (roster, materials, analytics)

  * **At-Risk Student Alerts**

    * Displays flagged students based on performance analytics
    * Links to suggested interventions

* **Right Panel**

  * **Upcoming Milestones Calendar**

    * Interactive calendar pulling Canvas events
    * Optional AI-suggested review sessions button
    * Toggle view: Day, Week, Month

  * **Engagement Stats Panel**

    * Circular progress tracker showing completion %
    * Toggle between “To Do” and “Done” states
    * Displays recent class activity, quiz counts, average score

  * **System Announcements Banner**

    * Fixed position for platform updates and release notes

Each element is built as a collapsible and modular widget for custom visibility and space management.

---

## 🧑‍🎓 Student Dashboard Overview

The student dashboard is structured similarly to the professor dashboard with a focus on study flow, gamification, and personal progress. The layout uses a two-column structure with icon-only navigation and modular panels for quick access.

### 🧭 Dashboard Structure and Elements

* **Left Sidebar Navigation**

  * Dashboard (default landing)
  * Analytics
  * Calendar
  * Inbox
  * Courses (expandable)
  * Notifications
  * Study Path

  **Icon Widget Grid (2x2 layout)**

  * Located between the logo and the main navigation items in the sidebar
  * Arranged in a 2-by-2 grid layout for quick access with Icons only and tooltips defining the element
  * Widgets:

    * Pomodoro Timer
    * AI Chat Assistant
    * Notes
    * Reminders

* **Main Panel (Left Column)**

  * **Joined Courses View**

    * Display all active courses with title, instructor, and summary of topics to review (this should not be that emphasized)
    * Quick buttons for quiz mode or notes mode

* **Right Panel**

  * **Streak Counter Widget**

    * Shows consecutive study days with motivational feedback
    * Includes streak badge milestones and reset warnings

  * **Recommended Topics Panel**

    * AI-generated suggestions based on weak performance areas
    * “Start Practice” button beside each topic

  * **Progress Summary Widget**

    * Pie chart or bar showing quiz completion and mastery by topic

Widgets are modular, collapsible, and optimized for daily study routines.

---

## 🌚 Core Features with Design Lens

### 🎓 Canvas LMS Integration

* **Design Note**: OAuth flow with modal confirmation and success animation
* Imports syllabus, assignments, and rosters with progress indicators

### 📂 File Upload & Parsing

* **Design Note**: UI offers drag-and-drop, success/error feedback, and file format tips
* Content shown in readable segments post-parse

### ❓ AI-Powered Question Generation

* **Design Note**: Uses a floating side panel to adjust prompt settings
* Generated content appears inline with “regenerate” and “save” buttons

### 📝 Quiz Engine

* Infinite regeneration with a “spin” animation
* Optional timers and toggleable audio/image explanations
* Scoring feedback in colored cards (green = correct, red = incorrect)

### 📊 Performance Analytics

* Line charts for improvement
* Pie charts for topic mastery
* Expandable sections for drill-down details

### ⚖️ Admin Controls

* Feature toggle UI with switch components and helper text
* Limit content access per student group using tag-based filters

### 🛁 Gamification System

* Progress bar with milestone checkpoints
* Tooltip explanations for each badge
* Leaderboard with optional profile pictures

---

## 🗺️ Site Map Structure

### 👩‍🏫 Professor Site Map

```
[Login / Signup Page]
   ↓
[Professor Dashboard Landing Page]
   ├── [Analytics Page]
   ├── [Calendar Page]
   ├── [Inbox Page]
   ├── [Courses Page]
   │     └── [Course Detail Page]
   │           ├── [Student Roster Page]
   │           ├── [Uploaded Materials Page]
   │           ├── [Classroom Settings Page]
   │           └── [Course Analytics Page]
   ├── [Notifications Page]
   └── [System Announcements Page]
```

### 👨‍🎓 Student Site Map

```
[Login / Signup Page]
   ↓
[Student Dashboard Landing Page]
   ├── [Analytics Page]
   ├── [Calendar Page]
   ├── [Inbox Page]
   ├── [Courses Page]
   │     └── [Course Detail Page]
   │           ├── [Course Quiz Page]
   │           ├── [Course Notes Page]
   │           └── [Performance Page]
   ├── [Study Path Page]
   ├── [Pomodoro Timer Widget Page]
   ├── [AI Chat Assistant Widget Page]
   ├── [Notes Widget Page]
   └── [Reminders Widget Page]
```

## 🧱 Frontend Architecture

* **Framework**: React + Tailwind CSS
* **Routing**: Next.js  with lazy-loaded pages
* **Design System**: Reusable UI components (`/components/ui`)
* **Color Theme**: Primary `#17A2FE` with light/dark mode toggle

---

## 🛠 Developer Notes

* Modular components = consistent UX
* Prioritize responsiveness and mobile compatibility
* Ensure seamless fallback states (loading, error, empty data)
* Use component libraries where possible for speed (shadcn/ui)
  
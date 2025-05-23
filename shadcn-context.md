# Shadcn UI Components Used

This file lists all Shadcn UI components currently used in the project. 

- card
- button
- tooltip
- resizable
- sidebar
- separator
- sheet
- input
- skeleton
- breadcrumb
- label
- chart
- select
- tabs
- table
- toggle-group
- toggle
- badge
- checkbox
- dropdown-menu
- drawer
- avatar
- sonner
- calendar 
- form
- switch
- progress
- textarea
- alert-dialog
- command
- popover
- dialog
- radio-group

## Quick Actions Pages

Added comprehensive quick action tools accessible from the sidebar:

### Pomodoro Timer (`/student/quick-actions/pomodoro`)
- **Full Timer Functionality**: Work sessions, short breaks, long breaks with automatic transitions
- **Customizable Settings**: Adjustable work duration (15-45 min), break durations
- **Session Tracking**: Completed pomodoros count, total sessions, study time tracking
- **Progress Visualization**: Live countdown, progress bars, session indicators
- **Smart Logic**: Automatic 4-session cycles with long break triggers
- **Components Used**: Progress, Select, Badge with session-specific color schemes

### AI Chat Assistant (`/student/quick-actions/ai-chat`)
- **Interactive Chat Interface**: Real-time conversation with simulated AI responses
- **Subject-Specific Help**: Math, CS, Physics problem solving with contextual responses
- **Quick Questions**: Pre-defined question templates for common topics
- **Message History**: Persistent conversation tracking with timestamps
- **Responsive Design**: Full chat interface with message bubbles and avatars
- **Components Used**: Avatar, Textarea, Badge with online status indicators

### Notes Management (`/student/quick-actions/notes`)
- **Full CRUD Operations**: Create, read, update, delete notes with rich editing
- **Advanced Organization**: Category and subject-based filtering and tagging
- **Search Functionality**: Full-text search across titles and content
- **Statistics Dashboard**: Total notes, word counts, subject distribution, recent activity
- **Modal Interfaces**: Create and edit modals with form validation
- **Content Management**: Word count tracking, timestamps, preview functionality
- **Components Used**: Dialog, Textarea, Input with advanced search capabilities

### Reminders & Tasks (`/student/quick-actions/reminders`)
- **Task Management**: Complete reminder system with priority levels and categories
- **Due Date Tracking**: Calendar integration with overdue and due-soon indicators
- **Priority System**: High/Medium/Low priority with color-coded badges
- **Completion Tracking**: Checkbox interface with progress statistics
- **Advanced Filtering**: Multi-dimensional filtering by priority, category, subject, completion status
- **Date Intelligence**: Smart due date formatting (today, tomorrow, overdue calculations)
- **Components Used**: Calendar, Popover, Checkbox with date-fns integration

### Design Features Across Quick Actions:
- **Consistent Navigation**: Back-to-dashboard breadcrumb navigation
- **Modal Interfaces**: Standardized create/edit dialogs across all tools
- **Statistics Cards**: Real-time metrics and usage tracking
- **Responsive Layout**: Mobile-first design with grid layouts
- **State Management**: Advanced local state management with persistence patterns
- **Icon Integration**: Contextual Lucide icons for visual hierarchy
- **Color Coding**: Semantic color schemes for status, priority, and categories

### Components Used for Quick Actions:
- **Dialog & DialogContent**: Modal interfaces for creating and editing content
- **Calendar & Popover**: Date selection and scheduling functionality
- **Checkbox**: Task completion and filtering options
- **Textarea & Input**: Rich text input and search capabilities
- **Select**: Dropdown selections for categories, priorities, and filters
- **Progress**: Visual progress indicators and completion tracking
- **Avatar**: User and AI representation in chat interfaces
- **Badge**: Status indicators, priority levels, and categorization

## Course Page Design Philosophy

The course pages have been completely redesigned with a comprehensive dashboard approach that emphasizes gamification, exam preparation, and activity tracking:

### New Top Navigation Structure:
1. **Overview** - Main dashboard with comprehensive metrics and gamification
2. **Uploaded Materials** - Course resources and reference materials in organized list format
3. **Notes** - Personal study notes with topic categorization and editing capabilities
4. **Learn** - Interactive practice modes and quick study features

### Overview Tab - Comprehensive Dashboard:
- **Exam Countdown Card**: Days remaining, exam date, and preparation progress tracking
- **Quick Stats Cards**: Files, notes, and exercise counts with subject-specific icons
- **Score Summary**: Exercise completion, current grade, and progress to next grade level
- **XP Tracker**: Level-based progression system with experience points and level advancement
- **Daily Goal Progress**: Today's study/practice goals with progress tracking
- **Upcoming Tasks**: Prioritized task list with due dates and priority badges
- **Smart Suggestions**: AI-generated study recommendations based on performance
- **Weekly Activity Chart**: Visual representation of daily study sessions
- **Top/Bottom Topics**: Performance comparison showing strongest areas and improvement needs
- **Achievements & Badges**: Gamified badge collection with earned/unearned status
- **Leaderboard Access**: Social comparison features for motivation

### Learn Tab - Practice Modes:
- **Multiple Choice**: Quiz-style questions with immediate feedback
- **Flashcards**: Interactive card system with difficulty levels and flip functionality
- **Subject-Specific Practice**: Coding problems (CS), problem solving (Physics), open questions (Math)
- **Exam Simulation**: Full exam experience with timing and real conditions
- **AI Tutor**: Intelligent tutoring system for personalized help
- **Quick Practice Section**: Featured flashcard with navigation and practice statistics

### Design Features:
- **Gamification Elements**: XP tracking, level progression, badge collection, streak counters
- **Subject-Specific Customization**: 
  - Math: Focus on formulas, calculus, linear algebra with calculator icons
  - CS: Coding emphasis with terminal, code, and debugging themes
  - Physics: Problem-solving focus with atom, calculator, and lab equipment icons
- **Progress Visualization**: Multiple progress bars, circular indicators, and trend charts
- **Activity Monitoring**: Daily/weekly activity tracking with visual representations
- **Exam Preparation**: Countdown timers, preparation progress, and readiness indicators
- **Smart Recommendations**: AI-driven suggestions based on performance analytics

### Materials Tab Design:
- **List Format**: Clean, organized display with file metadata
- **Quick Actions**: Preview and download buttons for immediate access
- **Topic Categorization**: Badge system organizing materials by subject areas
- **File Information**: Type, size, upload date, and topic classification
- **Hover Effects**: Subtle interaction feedback for better user experience

### Notes Tab Design:
- **Personal Organization**: User-created notes with topic categorization
- **Edit/View Actions**: Quick access to note editing and viewing functionality
- **Word Count Tracking**: Content length indicators for study planning
- **Recent Activity**: Last modified timestamps for organization

### Components Used for New Course Pages:
- **Card & CardContent**: Comprehensive layout structure for all dashboard sections
- **Tabs & TabsList**: Top-level navigation with horizontal layout
- **Progress**: Multiple progress indicators for goals, XP, preparation, and topics
- **Badge**: Priority levels, topic categories, difficulty indicators, achievement status
- **Button**: Interactive elements, practice mode access, and navigation controls
- **Calendar, Trophy, Zap, BarChart3**: Dashboard-specific iconography for visual appeal
- **Flame, Target, Brain**: Gamification and achievement icons
- **Subject Icons**: FileText/Calculator (Math), Code/Terminal (CS), Atom/Beaker (Physics)

### Key Design Principles:
- **Dashboard-First Approach**: Comprehensive overview as the primary landing experience
- **Gamification Integration**: Achievement systems, progress tracking, and social elements
- **Subject Specialization**: Tailored content and iconography for different academic disciplines
- **Performance Analytics**: Data-driven insights and recommendations for study optimization
- **Exam Preparation Focus**: Countdown timers, readiness tracking, and preparation milestones
- **Activity Monitoring**: Study habit tracking and engagement measurement
- **Interactive Learning**: Multiple practice modes and immediate feedback systems 
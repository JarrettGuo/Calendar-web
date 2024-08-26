# Calendar Demo - Frontend

## Project Overview

This project is a calendar-based scheduling application built using React. It utilizes Redux for state management, Tailwind CSS for styling, and several other libraries to enhance functionality.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management for predictable state container.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **shadcn/ui**: Custom components and UI utilities.
- **ahooks**: A collection of React hooks for common functionalities.
- **React Router DOM**: Declarative routing for React applications.
- **FullCalendar**: JavaScript calendar library for managing events.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or above)
- **npm** (v6.x or above)

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JarrettGuo/Calendar-web.git
   cd calendar-demo-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

```plaintext
src/
|-- components/      # Reusable components
|-- pages/           # Page components
|-- store/           # Redux store and slices
|-- utils/           # Utility functions
|-- App.tsx          # Main application component
|-- index.tsx        # Entry point of the application
```

## Additional Notes

- **Environment Variables**: Make sure to configure any required environment variables in a `.env` file.
- **Styling**: Tailwind CSS is used for styling, with some custom components styled using shadcn.

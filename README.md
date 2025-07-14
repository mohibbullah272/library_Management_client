# 📚 Minimal Library Management System

A clean and functional client-side Library Management System built with React, Redux Toolkit Query (RTK Query), and TypeScript. This app enables users to manage books, perform borrowing operations, and view a borrow summary—all without authentication or complex UI overhead.

## 📖 Table of Contents

- Introduction
- Features
- Installation
- Usage
- Project Structure
- Available Routes
- Dependencies
- Configuration
- Examples
- Troubleshooting
- Contributors


## 🧩 Introduction

This project is a minimal, public-access library system demonstrating effective use of React, RTK Query, and TypeScript. It focuses on book inventory management and borrowing operations using a RESTful API for data persistence and retrieval.

## ✨ Features

1. **Public Routes** 🚀

   - No login or authentication required. All features are open to use for demonstration purposes.

2. **Book Management** 🛠️

   - List all books in a table format.
     - Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions.
     - Actions:
       - ✏️ Edit Book
       - 🗑️ Delete Book (with confirmation)
       - 📘 Borrow Book
   - **Add New Book**:
     - Fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional).
     - Redirect to book list on successful addition.
   - **Business Logic**: If copies = 0, book is marked unavailable.

3. **Borrow Book** 📘

   - Borrow a book from the book list.
   - Form includes Quantity and Due Date.
   - **Business Rules**:
     - Quantity cannot exceed available copies.
     - If borrowed quantity causes copies = 0, mark as unavailable.
   - Redirects to Borrow Summary with success feedback.

4. **Borrow Summary** 📊

   - Aggregated list of all borrowed books.
   - Columns: Book Title, ISBN, Total Quantity Borrowed.

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/library-management-system.git
cd library-management-system

# Install dependencies
npm install

# Run the app
npm start
```

Make sure your backend API server is running and accessible.

## ▶️ Usage

- Navigate to `/books` to view all available books.
- Use **Add Book** to add a new book.
- Use **Edit** or **Delete** buttons to manage existing entries.
- Click **Borrow** on a book to borrow it (if available).
- View all borrow activity on the `/borrow-summary` page.

## 🧱 Project Structure

```plaintext
src/
├── api/           # RTK Query API slices
├── components/    # UI Components (Table, Form, Navbar, Footer)
├── features/      # Redux slices and logic
├── pages/         # Route components (Books, Create, Edit, Borrow, Summary)
├── types/         # TypeScript interfaces and types
├── App.tsx
├── main.tsx
└── routes.tsx     # Route definitions
```

## 🗺️ Available Routes

| Route Path | Description |
| --- | --- |
| `/books` | List all books |
| `/create-book` | Add a new book |
| `/books/:id` | View single book details |
| `/edit-book/:id` | Edit an existing book |
| `/borrow/:bookId` | Borrow a selected book |
| `/borrow-summary` | View summary of all borrowed books |

## 📦 Dependencies

- React
- React Router DOM
- Redux Toolkit
- RTK Query
- TypeScript
- Tailwind CSS (or other styling framework, if applicable)
- Axios (optional, if used within API abstraction)

## 🔧 Configuration

Ensure `.env` contains the base URL for the API:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the API slice (RTK Query) to use this env variable.

## 📌 Examples

- **Borrow a Book**:
  - Select a book → Click Borrow → Enter quantity and due date → Submit → Redirect to summary.
- **Add Book**:
  - Click Add Book → Fill out form → Submit → Redirect to book list.

## 🧰 Troubleshooting

- **Book not updating?**
  - Ensure API response updates the store. Use `refetchOnMountOrArgChange`.
- **API error or 404?**
  - Confirm the backend API is running and route paths are correct.
- **TypeScript errors?**
  - Check interface definitions in `/types` and props passed to components.

## 👥 Contributors

- Your Name

Want to contribute? Submit a pull request!


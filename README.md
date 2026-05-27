# Book Management System

A React-based Book Management System built for the assignment requirement. The app lets users view, add, update, delete, search, and filter books using a hosted MockAPI endpoint.

## Features

- View books with title, author, genre, and publication year
- Add new books
- Edit existing books with prefilled form data
- Delete books with a confirmation popup
- Search books by title or author
- Filter books by genre
- Loading state while books are fetched
- User-facing error messages for API failures
- Responsive UI styled with Tailwind CSS

## Tech Stack

- React
- Vite
- Tailwind CSS
- MockAPI for mock API CRUD operations

## API

This project uses MockAPI as the hosted mock backend.

```txt
https://6a15d28491ff9a63de08d841.mockapi.io/api/v1/books
```

Supported operations:

- `GET /books` - fetch all books
- `POST /books` - add a new book
- `PUT /books/:id` - update a book
- `DELETE /books/:id` - delete a book

## Project Structure

```txt
src/
  components/
    BookForm.jsx
    BookInfo.jsx
    BookList.jsx
    FilterDropdown.jsx
    SearchBar.jsx
  pages/
    Home.jsx
  services/
    api.js
  App.jsx
  main.jsx
```

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The app can be deployed on Vercel, Netlify, or any static hosting provider that supports Vite apps.

Build command:

```bash
npm run build
```

Output directory:

```txt
dist
```

## Submission Links

GitHub repository link:

```txt
Add your GitHub repository URL here
```

Live deployed URL:

```txt
Add your deployed app URL here
```

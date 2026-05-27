import { useState } from "react";
import { deleteBook } from "../services/api";
import FilterDropdown from "./FilterDropdown";
import BookInfo from "./BookInfo";
import SearchBar from "./SearchBar";

function BookList({ books, setBooks, onEditBook }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const genres = [
    ...new Set(books.map((book) => book.genre?.trim()).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase() ?? "";
    const author = book.author?.toLowerCase() ?? "";
    const genre = book.genre?.trim() ?? "";
    const matchesSearch =
      !normalizedSearchTerm ||
      title.includes(normalizedSearchTerm) ||
      author.includes(normalizedSearchTerm);
    const matchesGenre = !selectedGenre || genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setDeleteError("");
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete.id);
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
      setBookToDelete(null);
      setDeleteError("");
    } catch (error) {
      setDeleteError(
        error.message || "Failed to delete book. Please try again.",
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
        Book List
      </h2>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <FilterDropdown
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>

      {books.length === 0 ? (
        <p className="text-gray-500 italic">No books available.</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500 italic">No matching books found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <BookInfo
                  label="Title"
                  value={book.title}
                  className="text-lg max-w-[220px]"
                />

                <BookInfo
                  label="Author"
                  value={book.author}
                  className="max-w-[180px]"
                />

                <BookInfo
                  label="Genre"
                  value={book.genre}
                  className="max-w-[140px]"
                />

                <BookInfo label="Published" value={book.year} />

                {/* Buttons */}
                <div className="flex gap-0.5 md:justify-end">
                  <button
                    onClick={() => onEditBook(book)}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete this book?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete "{bookToDelete.title}"?
            </p>

            {deleteError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-1">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
              >
                Yes
              </button>

              <button
                type="button"
                onClick={handleCancelDelete}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;

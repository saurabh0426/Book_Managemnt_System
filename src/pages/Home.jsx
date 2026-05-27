import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { getBooks } from "../services/api";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setFetchError("");
      } catch (error) {
        setFetchError(
          error.message || "Failed to load books. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenAddForm = () => {
    setEditingBook(null);
    setShowAddForm(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setEditingBook(null);
    setShowAddForm(false);
  };

  const handleBookSaved = (savedBook) => {
    if (!savedBook) return;

    setBooks((prevBooks) => {
      const alreadyExists = prevBooks.some((book) => book.id === savedBook.id);

      if (alreadyExists) {
        return prevBooks.map((book) =>
          book.id === savedBook.id ? savedBook : book,
        );
      }

      return [...prevBooks, savedBook];
    });

    handleCancelForm();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-10xl mx-auto px-6 py-4">
        {/* Header */}
        <div className="m-0 p-0 border-b border-gray-200">
          <div className="text-left mb-1 gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Book Manager
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Organize your personal library with simplicity
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          {/* Top Section */}
          <div className="px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between bg-white">
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="bg-gray-50 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-100 transition">
                <p className="text-sm text-gray-500">Books</p>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {books.length}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-100 transition">
                <p className="text-sm text-gray-500">Authors</p>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {new Set(books.map((book) => book.author)).size}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-100 transition">
                <p className="text-sm text-gray-500">Genres</p>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {new Set(books.map((book) => book.genre)).size}
                </h3>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleOpenAddForm}
              className="mt-6 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              + Add Book
            </button>
          </div>

          {/* Form */}
          {showAddForm && (
            <div className="p-8 border-b border-gray-100 bg-gray-50">
              <BookForm
                editingBook={editingBook}
                onBookSaved={handleBookSaved}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          {/* List */}
          <div className="p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
                <p className="mt-4 text-lg font-medium text-gray-700">
                  Loading books...
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Fetching your library from the API
                </p>
              </div>
            ) : fetchError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                {fetchError}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-7xl mb-5">📚</div>

                <h2 className="text-2xl font-bold text-gray-700">
                  No Books Added
                </h2>

                <p className="text-gray-500 mt-2">
                  Add your first book to get started
                </p>
              </div>
            ) : (
              <BookList
                books={books}
                setBooks={setBooks}
                onEditBook={handleEditBook}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

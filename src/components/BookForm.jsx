import { useEffect, useState } from "react";
import { addBook, updateBook } from "../services/api";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  year: "",
};

function BookForm({ editingBook, onBookSaved, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const [error, setError] = useState("");
  const isEditing = Boolean(editingBook);

  useEffect(() => {
    if (!editingBook) {
      setFormData(emptyForm);
      setError("");
      return;
    }

    setFormData({
      title: editingBook.title ?? "",
      author: editingBook.author ?? "",
      genre: editingBook.genre ?? "",
      year: editingBook.year ?? "",
    });
    setError("");
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !String(formData.year).trim()
    ) {
      setError("Please fill in all fields!");
      return;  
    }

    if (!/^\d{4}$/.test(formData.year)) {
      setError("Year must be a 4-digit number (e.g., 2003).");
      return;
    }

    try {
      const savedBook = isEditing
        ? await updateBook(editingBook.id, formData)
        : await addBook(formData);

      onBookSaved(savedBook);
      setFormData(emptyForm);
      setError("");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

 return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 w-full max-w-2xl rounded-2xl shadow-2xl p-8 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Edit Book" : "Add New Book"}
        </h2>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Genre
          </label>

          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genre"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Published Year
          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-0.5">

         <button
          type="submit"
className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"        >
          {isEditing ? "Update Book" : "Add Book"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
           className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
          >
            Cancel
          </button>
        )}

       

      </div>
    </form>
  </div>
);
}

export default BookForm;

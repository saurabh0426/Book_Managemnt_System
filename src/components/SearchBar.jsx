function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by title or author..."
      className="border rounded p-2 w-full"
      aria-label="Search books by title or author"
    />
  );
}

export default SearchBar;

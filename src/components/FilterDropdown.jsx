function FilterDropdown({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      className="border rounded p-2 w-full md:w-56"
      aria-label="Filter books by genre"
    >
      <option value="">All genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default FilterDropdown;

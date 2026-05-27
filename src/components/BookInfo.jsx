function BookInfo({ label, value, className = "" }) {
  return (
    <div>
      <p className="text-gray-800">{label}</p>

      <p
        className={`text-xs text-gray-500 uppercase tracking-wide truncate ${className}`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

export default BookInfo;

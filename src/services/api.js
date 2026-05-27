const API_URL = "https://6a15d28491ff9a63de08d841.mockapi.io/api/v1/books";

const handleResponse = async (response, action) => {
  if (!response.ok) {
    throw new Error(`Failed to ${action}. Please try again.`);
  }

  return response.json();
};

export const getBooks = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response, "load books");
};

export const addBook = async (book) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  return handleResponse(response, "add book");
};

export const updateBook = async (id, book) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  return handleResponse(response, "update book");
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response, "delete book");
};

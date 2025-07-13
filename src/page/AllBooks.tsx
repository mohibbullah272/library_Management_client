import { useGetBooksQuery } from "@/feature/bookApi/bookApi";
import type { IBook } from "@/types/Book_interface";



const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError || !data?.data) {
    return <div className="text-center py-10 text-red-500">Error loading books</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((book:IBook) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            <p className="text-gray-600 mt-1">by {book.author}</p>
            <p className="text-gray-500 text-sm mt-1">Genre: {book.genre}</p>
            <p className="text-gray-500 text-sm">ISBN: {book.isbn}</p>
            <p className="text-gray-600 mt-2">{book.description}</p>
            <p className="text-gray-500 text-sm mt-2">Copies: {book.copies}</p>
            <p className="text-sm mt-1">
              Status: <span className={book.available ? "text-green-500" : "text-red-500"}>
                {book.available ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
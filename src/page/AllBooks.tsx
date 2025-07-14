import BookCard from "@/components/bookCard/BookCard";
import { useGetBooksQuery } from "@/feature/bookApi/bookApi";
import type { IBook } from "@/types/Book_interface";
import LoadingPage from "./LoadingPage";



const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <LoadingPage></LoadingPage>
  }

  if (isError || !data?.data) {
    return <div className="text-center py-10 text-red-500">Error loading books</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((book:IBook) => <BookCard item={book} key={book._id}></BookCard> )}
      </div>
    </div>
  );
};

export default AllBooks;
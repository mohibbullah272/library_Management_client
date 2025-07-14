import { useDeleteBookByIdMutation, useGetBookByIdQuery } from "@/feature/bookApi/bookApi";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "./LoadingPage";
import BorrowBookForm from "@/components/BorrowBookForm/BorrowBookForm";
import { useState } from "react";
import Swal from 'sweetalert2'
const BookDetails = () => {
    const { id } = useParams();
    const navigate=useNavigate()
    const [DeleteBook]=useDeleteBookByIdMutation()
    const { data, isLoading } = useGetBookByIdQuery(id);
    const [open,setOpen]=useState(false)
    const handleDelete =()=>{
   
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteBook(id)
              
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                    navigate('/')
                
            }
          });
    }
  
    if (isLoading) {
        return <LoadingPage></LoadingPage>
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600 text-lg font-medium">Book not found</div>
            </div>
        );
    }

    return (
<>
<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
<div className="max-w-6xl mx-auto">
<div className="bg-white rounded-lg shadow-lg overflow-hidden">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                        {/* Left Side - Book Image */}
<div className="flex justify-center lg:justify-start">
 <div className="w-full max-w-md">
 <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300 border-dashed">
 <div className="text-center text-gray-500">
<img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?_gl=1*1290nvu*_ga*MTMyOTE3MDQ0NS4xNzUyMTY0MTk3*_ga_8JE65Q40S6*czE3NTI0MzI0MzgkbzIkZzEkdDE3NTI0MzI0NjgkajMwJGwwJGgw" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Book Details */}
                        <div className="space-y-6">
                            {/* Book Title and Author */}
                            <div className="space-y-2">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {data.data.title}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    by <span className="font-medium">{data.data.author}</span>
                                </p>
                            </div>

                            {/* Book Information */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Genre</p>
                                        <p className="text-base text-gray-900">{data.data.genre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">ISBN</p>
                                        <p className="text-base text-gray-900">{data.data.isbn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Copies</p>
                                        <p className="text-base text-gray-900">{data.data.copies}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Availability</p>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                data.data.available
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {data.data.available ? "Available" : "Not Available"}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                                    <p className="text-gray-700 leading-relaxed">{data.data.description}</p>
                                </div>

                                {/* Timestamps */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <p className="font-medium">Created At</p>
                                        <p>{new Date(data.data.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Updated At</p>
                                        <p>{new Date(data.data.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                    onClick={()=>setOpen(true)}
                                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                                           data.data.available
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-400 text-white cursor-not-allowed"
                                        }`}
                                        disabled={!data.data.available}
                                    >
                                        {data.data.available ? "Borrow Book" : "Not Available"}
                                    </button>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="flex-1 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                                        Edit Book
                                    </button>
                                    <button onClick={handleDelete} className="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
                                        Delete Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<BorrowBookForm open={open} borrowDetails={data.data} onOpenChange={setOpen}>
</BorrowBookForm>
</>
    );
};

export default BookDetails;
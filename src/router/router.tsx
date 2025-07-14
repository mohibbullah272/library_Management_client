import Main from "@/layout/Main";
import AddBookForm from "@/page/AddBook";
import AllBooks from "@/page/AllBooks";
import BookDetails from "@/page/BookDetails";
import BorrowSummary from "@/page/BorrowSummary";
import Home from "@/page/Home";
import {
    createBrowserRouter
  } from "react-router";


  let router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:([
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/allBooks',
            element:<AllBooks></AllBooks>
        },
        {
          path:'/book-Details/:id',
          element:<BookDetails></BookDetails>
        },
        {
          path:'/borrow-summary',
          element:<BorrowSummary></BorrowSummary>
        },
        {
          path:'/create-book',
          element:<AddBookForm></AddBookForm>
        }
      ]) 
    },
 
  ]);


  export default router
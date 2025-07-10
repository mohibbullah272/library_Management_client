import Main from "@/layout/Main";
import AllBooks from "@/page/AllBooks";
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
        }
      ]) 
    },
 
  ]);


  export default router
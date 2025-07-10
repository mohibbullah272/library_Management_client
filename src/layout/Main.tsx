import Navbar from "@/components/navbar/Navbar";
import { useGetBooksQuery } from "@/feature/bookApi/bookApi";
import { Outlet } from "react-router";


const Main = () => {
    const {data}= useGetBooksQuery(undefined)
    console.log(data)
    return (
        <div>
         <Navbar></Navbar>
         <Outlet></Outlet>
        </div>
    );
};

export default Main;
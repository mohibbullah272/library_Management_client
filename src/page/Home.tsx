import { useGetBooksQuery } from '@/feature/bookApi/bookApi';
import Banner from '../components/banner/Banner';
import BookCard from '@/components/bookCard/BookCard';
import type { IBook } from '../types/Book_interface';
import Stats from '@/components/Stats/Stats';
import LoadingPage from './LoadingPage';




const Home = () => {
    const {data:books,isLoading}=useGetBooksQuery(undefined)

    console.log(books,isLoading)
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    return (
        <div>
            <Banner></Banner>
    
            <h3 className='text-3xl text-center font-bold text-gray-800 my-10'>Popular Books</h3>
            {/* cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  items-stretch gap-10 md:px-10 px-5'>
{
books.data.slice(0,6).map((book: IBook)=><BookCard item={book} key={book._id}></BookCard>)
}
            </div>
            <h3 className='text-3xl text-center font-bold text-gray-800 my-10'>Our Achievement</h3>
            <Stats></Stats>
      
        </div>
    );
};

export default Home;
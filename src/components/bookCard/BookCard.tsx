import { CalendarDays, Copy } from 'lucide-react';
import type { IBook } from '../../types/Book_interface';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Link } from 'react-router';

type BookCardProps = {
  item: IBook;
};

const BookCard = ({ item }: BookCardProps) => {
  return (
    <div className="h-full">
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <CardDescription className="mb-3">{item.description}</CardDescription>

          <p className="flex items-center gap-2 my-3 text-sm">
            <Copy />
            Available : {item.copies}
          </p>

          <p className="flex items-center gap-2 my-3 text-sm">
            <CalendarDays />
            Added At:{' '}
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardContent>

        <CardFooter>

   <button className="bg-blue-600 w-full text-white py-2 px-1 rounded-3xl hover:bg-blue-700 transition">
   <Link to={`/book-Details/${item._id}`}>
            View Details
            </Link>
          </button>

        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;

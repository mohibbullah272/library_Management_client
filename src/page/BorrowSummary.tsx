import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  User, 
  ArrowLeft, 
  CheckCircle, 
  Hash,
  Library,
  TrendingUp,
  Clock
} from "lucide-react";
import { useGetBorrowSummaryQuery } from "@/feature/bookApi/bookApi";
import LoadingPage from './LoadingPage';

interface BorrowedBook {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowedBook[];
}

const BorrowSummary = () => {

  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  const getTotalBooks = () => {
    if (!data?.data) return 0;
    return data.data.reduce((total: any, item: { totalQuantity: any; }) => total + item.totalQuantity, 0);
  };

  const getUniqueBooks = () => {
    return data?.data?.length || 0;
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>
  
  }

  if (!data?.success || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="text-center py-8">
            <div className="text-red-500 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load borrowed books
            </h2>
            <p className="text-gray-600 mb-4">
              {error ? 'There was an error retrieving your borrow summary.' : 'No data available.'}
            </p>
            <Button 
        
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Books</p>
                  <p className="text-3xl font-bold text-blue-600">{getTotalBooks()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

     
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Titles</p>
                  <p className="text-3xl font-bold text-indigo-600">{getUniqueBooks()}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Library className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

    
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">Active</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

    
        <Card className="bg-white shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-10 w-10" />
              Borrowed Books Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!data?.data || data.data.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No borrowed books
                </h3>
                <p className="text-gray-600">
                  You haven't borrowed any books yet. Start exploring the library!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {data.data.map((item:any) => (
                  <div 
                    key={item.book.isbn}
                    className="p-6 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg mt-1">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.book.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Hash className="h-4 w-4" />
                              <span>ISBN: {item.book.isbn}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge 
                            variant="secondary" 
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {item.totalQuantity} {item.totalQuantity === 1 ? 'copy' : 'copies'}
                          </Badge>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {item.totalQuantity}
                          </p>
                          <p className="text-xs text-gray-500">
                            Borrowed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

   
      </div>
    </div>
  );
};

export default BorrowSummary;
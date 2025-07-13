
import { createApi,fetchBaseQuery  } from "@reduxjs/toolkit/query/react";




export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://library-managment-server-psi.vercel.app',
      mode: 'cors',

    }),
   
    endpoints: (builder) => ({
      getBooks: builder.query({
        query: () => '/api/books'
      }),
      getBookById : builder.query({
        query: (id)=>`/api/books/${id}`
      }),
      getBorrowSummary: builder.query({
        query: ()=> `/api/borrow`
      })
    })
  });

  export const {useGetBooksQuery,useGetBookByIdQuery,useGetBorrowSummaryQuery} = bookApi
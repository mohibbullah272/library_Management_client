
import { createApi,fetchBaseQuery  } from "@reduxjs/toolkit/query/react";




export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://library-managment-server-psi.vercel.app',
      mode: 'cors',

    }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
      
      getBooks: builder.query({
        
        query: () => '/api/books',
        providesTags: ['books'],
      }
      
      ),
      getBookById : builder.query({
        query: (id)=>`/api/books/${id}`
      }),
      DeleteBookById:builder.mutation({
        query:(id)=>({
          url:`/api/books/${id}`,
          method:"DELETE"
        }),
        invalidatesTags: ['books']
      }),
      getBorrowSummary: builder.query({
        query: ()=> `/api/borrow`
      }),
      createBook:builder.mutation({
        query:(body)=>({
          url:'/api/books',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['books']
        
      }),
      createBorrowBook:builder.mutation({
        query:(body)=>({
          url:'/api/borrow',
          method:"POST",
          body:body
        }),
        invalidatesTags: ['books']
      }) 
    })
  });

  export const {
    useGetBooksQuery
    ,useGetBookByIdQuery
    ,useGetBorrowSummaryQuery,
    useCreateBookMutation,
    useCreateBorrowBookMutation,
    useDeleteBookByIdMutation
  } = bookApi
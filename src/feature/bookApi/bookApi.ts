
import { createApi,fetchBaseQuery  } from "@reduxjs/toolkit/query/react";




export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://library-managment-server-pi.vercel.app'
    }),
    endpoints: (builder) => ({
      getBooks: builder.query({
        query: () => '/api/books'
      })
    })
  });

  export const {useGetBooksQuery} = bookApi
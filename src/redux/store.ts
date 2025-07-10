import { bookApi } from '@/feature/bookApi/bookApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {

    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(bookApi.middleware),


})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
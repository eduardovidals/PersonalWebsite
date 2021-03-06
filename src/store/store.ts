import { configureStore } from '@reduxjs/toolkit'
import headerReducer from 'store/home/home.slice';
import formScreenReducer from 'store/formScreen/formScreen.slice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    formScreen: formScreenReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

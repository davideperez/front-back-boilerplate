import { configureStore } from '@reduxjs/toolkit'
import foldersReducer from './foldersSlice'


// Configures the Redux store and registers/lists the available slices. 
export const store = configureStore({
    reducer: {
        folders: foldersReducer,
    }
})

// Exports the store state type, in enable TS autocomplete
// when accessing the store state in components.
export type RootState = ReturnType<typeof store.getState>

// Exports the custom dispatch type so TypeScript knows the available 
// methods and thunks that can be dispatched.
export type AppDispatch = typeof store.dispatch;
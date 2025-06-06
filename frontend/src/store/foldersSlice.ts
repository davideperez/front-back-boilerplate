import { FolderDetailType } from "@/types/folder";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { deleteFolderThunk, fetchFoldersThunk } from "./folders.thunks";


// 2 The Type definition for the Folder slice state
interface FolderState {
    folders: FolderDetailType[],
    pagination: {
        page: number
        pageSize: number
        totalPages: number
        totalItems: number
    },
    loading: boolean
    error: string | null
}

// 3 The initial state for Folder slice state
const initialState: FolderState = {
    folders: [],
    pagination: {
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 1,
    },
    loading: false,
    error: null
}

const handleFetchFolders = (builder: ActionReducerMapBuilder<FolderState>) => {
  builder
    .addCase(fetchFoldersThunk.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchFoldersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.folders = action.payload.items
        state.pagination = action.payload.pagination
    })
    .addCase(fetchFoldersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
    })
}

const handleDeleteFolder = (builder: ActionReducerMapBuilder<FolderState>) => {
    builder
        .addCase(deleteFolderThunk.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteFolderThunk.fulfilled, (state, action) => {
            state.loading = false
            state.folders = state.folders.filter(f => f._id !== action.payload._id)
        })
        .addCase(deleteFolderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
}


// 4 The Folder Slice definition 
const foldersSlice = createSlice({
    // name: is the key under which this slice state will be 
    // stored in the root reducer. (seems internal to Redux toolkit)
    name: 'folders',
    // Simply the initial state of the slice.
    initialState,
    // Methods (actions) that synchronously updates the state internally.
    reducers: {},
    // Methods (actions or thunks?) that include async calls to third parties like fetchFolders.
    extraReducers: builder => { 
        handleFetchFolders(builder)
        handleDeleteFolder(builder)
    }
})

// 5 Exports the slice reducer to be registered in the store
export default foldersSlice.reducer;
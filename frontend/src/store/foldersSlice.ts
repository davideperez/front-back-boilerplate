import { getFolders } from "@/api/folders-api";
import { FolderDetailType, GetFoldersParamsType } from "@/types/folder";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 1. Thunk function: A Redux wrapper, for the axios call to fetch folders from the API.
export const fetchFolders = createAsyncThunk(
    '/folders', // Action type prefix used internally by Redux. (doesn't need to match endpoint)
    async (filters: GetFoldersParamsType, thunkAPI) => {
        try {
            const response = await getFolders(filters)
            console.log("/src/store/foldersSlice.ts > fetchFolders(Thunk) > response: ", response)
            console.log("/src/store/foldersSlice.ts > fetchFolders(Thunk) > response.data: ", response.data)

            return {
                items: response.data.items,
                pagination: response.data.pagination
            }
        } catch (error: unknown) {
            let message = "Error al traer los legajos"

            if (error instanceof Error) {
                message = error.message
            }

            return thunkAPI.rejectWithValue(message)
        }
    }
)

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
        builder
            .addCase(fetchFolders.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFolders.fulfilled, (state, action) => {
                state.loading = false
                state.folders = action.payload.items
                state.pagination = action.payload.pagination
            })
            .addCase(fetchFolders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

// 5 Exports the slice reducer to be registered in the store
export default foldersSlice.reducer;
import { deleteFolder, getFolder, getFolders } from "@/api/folders-api";
import { GetFoldersParamsType } from "@/types/folder";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 1. Thunk function: A Redux wrapper, for the axios call to fetch folders from the API.

export const fetchFolderThunk = createAsyncThunk(
    '/folder/:folderId', // Action type prefix used internally by Redux. (doesn't need to match endpoint)
    async (folderId: string, thunkAPI) => {
        try {
            const response = await getFolder(folderId)

            return response
        } catch (error: unknown) {
            let message = "Error al traer los legajos"

            if (error instanceof Error) {
                message = error.message
            }
            return thunkAPI.rejectWithValue(message)

        }
    }
)


export const fetchFoldersThunk = createAsyncThunk(
    '/folders', // Action type prefix used internally by Redux. (doesn't need to match endpoint)
    async (filters: GetFoldersParamsType, thunkAPI) => {
        try {
            const response = await getFolders(filters)

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

export const deleteFolderThunk = createAsyncThunk(
    '/folders/delete',
    async ({ folderId, userId }: { folderId: string; userId: string } , thunkAPI ) => {
        try {
            const deleted = await deleteFolder(folderId, userId)
            
            return deleted
            
        } catch (error: unknown) {
            let message = "Error al borrar legajo."

            if (error instanceof Error) {
                message = error.message
            }
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)
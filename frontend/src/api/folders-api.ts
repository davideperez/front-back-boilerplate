import { FolderDetailType, GetFoldersParamsType, getAllFoldersResponseType } from "@/types/folder"
import { axiosInstance as api } from "./axios"

export const getFolders = async (params: GetFoldersParamsType ): Promise<getAllFoldersResponseType> => {
    const res = await api.get('/folders', { params })
    const FoldersResponse: getAllFoldersResponseType = res.data
    // console.log("/src/api/folders-api.ts > getFolders() > res: ", res)
    // console.log("/src/api/folders-api.ts > getFolders() > res.data: ", res.data)
    return FoldersResponse
}

export const deleteFolder = async (folderId: string, userId: string): Promise<FolderDetailType> => {
    const res = await api.delete(`/folders/${folderId}`, {
         data: { userId }
    })
    
    const deleteFolderResponse = res.data
    
    // console.log("/src/api/folders-api.ts > deleteFolder() > res: ", res)
    // console.log("/src/api/folders-api.ts > deleteFolder() > res.data: ", res.data)

    return deleteFolderResponse
}

export const createFolder = async (formData: FormData ): Promise<FolderDetailType> => {
    const res = await api.post('/folders', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    const CreateFolderResponse: FolderDetailType = res.data
    // console.log("/src/api/folders-api.ts > getFolders() > res: ", res)
    // console.log("/src/api/folders-api.ts > getFolders() > res.data: ", res.data)
    return CreateFolderResponse
}
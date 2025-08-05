import { 
    FolderDetailType, 
    GetFoldersParamsType, 
    getAllFoldersResponseType 
} from "@/types/folder"

import { axiosInstance as api } from "./axios"


export const getFolder = async (id: string ): Promise<
    {
        message: string,
        data: FolderDetailType
    }
    > => {
    const res = await api.get(`/folders/${id}`)
    const FolderResponse = res.data
    console.log("This is the folder that was just requested: ", FolderResponse)
    return FolderResponse
}

export const getFolders = async (params: GetFoldersParamsType ): Promise<getAllFoldersResponseType> => {
    const res = await api.get('/folders', { params })
    const FoldersResponse: getAllFoldersResponseType = res.data
    return FoldersResponse
}

export const deleteFolder = async (folderId: string, userId: string): Promise<FolderDetailType> => {
    const res = await api.delete(`/folders/${folderId}`, {
         data: { userId }
    })
    const deleteFolderResponse = res.data
    return deleteFolderResponse
}

export const createFolder = async (formData: FormData ): Promise<FolderDetailType> => {
    const res = await api.post('/folders', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    const createFolderResponse: FolderDetailType = res.data
    return createFolderResponse
}

export const updateFolder = async (formData: FormData, folderId: string ): Promise<FolderDetailType> => {
    console.log('Hi from updateFolder!')
    console.log('updateFolder > formData prop: ', formData)
    console.log('updateFolder > folderId prop: ', folderId)
    const res = await api.put(`/folders/${folderId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    const updateFolderResponse: FolderDetailType = res.data
    console.log('updateFolder > updateFolderResponse: ', updateFolderResponse)

    return updateFolderResponse
}
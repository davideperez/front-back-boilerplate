import { GetFoldersParamsType, getAllFoldersResponseType } from "@/types/folder"
import { axiosInstance as api } from "./axios"

export const getFolders = async (params: GetFoldersParamsType ): Promise<getAllFoldersResponseType> => {
    const res = await api.get('/folders', { params })
    const FoldersResponse: getAllFoldersResponseType = res.data
    console.log("/src/api/folders-api.ts > getFolders() > res: ", res)
    console.log("/src/api/folders-api.ts > getFolders() > res.data: ", res.data)
    return FoldersResponse
}
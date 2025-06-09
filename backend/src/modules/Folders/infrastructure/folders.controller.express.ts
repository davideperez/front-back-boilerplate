
import { Request, Response } from 'express'

import { GetFolderByIdUseCase } from '../usecases/getFolderById.usecase'

import { GetAllFoldersUseCase } from '../usecases/getAllFolders.usecase'
import { GetAllFoldersQuerySchema } from '../domain/dtos/read/getAllFoldersResponse.dto'

import { CreateFolderUseCase } from '../usecases/createFolder.usecase'

import { UpdateFolderByIdUseCase } from '../usecases/updateFolderById.usecase'

import { DeleteFolderByIdUseCase } from '../usecases/deleteFolderById.usecase'

import { UpdateFolderSchema } from '../domain/dtos/update/updateFolders.dto'

import { MongoIdSchema } from '../../../shared/dtos/mongoId.Schema'

import { Folder, FolderSchema } from '../domain/folders.entity'
import { uploadImageToCloudinary } from '../../../connections/cloudinary.connection'

export class ExpressFoldersController {
  private readonly getFolderByIdUseCase: GetFolderByIdUseCase
  private readonly getAllFoldersUseCase: GetAllFoldersUseCase
  private readonly createFolderUseCase: CreateFolderUseCase
  private readonly updateFolderByIdUseCase: UpdateFolderByIdUseCase
  private readonly deleteFolderByIdUseCase: DeleteFolderByIdUseCase

  constructor (input: {
    readonly getFolderByIdUseCase: GetFolderByIdUseCase,
    readonly getAllFoldersUseCase: GetAllFoldersUseCase,
    readonly createFolderUseCase: CreateFolderUseCase,
    readonly updateFolderByIdUseCase: UpdateFolderByIdUseCase,
    readonly deleteFolderByIdUseCase: DeleteFolderByIdUseCase,
  } 
  ) {
    this.getFolderByIdUseCase = input.getFolderByIdUseCase
    this.getAllFoldersUseCase = input.getAllFoldersUseCase
    this.createFolderUseCase = input.createFolderUseCase
    this.updateFolderByIdUseCase = input.updateFolderByIdUseCase
    this.deleteFolderByIdUseCase = input.deleteFolderByIdUseCase
  }
    httpGetFolderById = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1 Extract the data
            const folderId: string = req.params.id;

            // 2 Validate the data

            if(!folderId) {
                res.status(400).json({ error: 'Folder Id is required' });
            }
            // 3 Call the usecase. 
            const folder = await this.getFolderByIdUseCase.execute(folderId)

            // 4 Handle usecase exception.
            if (!folder) {
                res.status(404).json({ error: 'Folder not found' });
                return;
            }

            // 5 Response
            res.status(200).json({ 
                message: "Folder succesfully retrieved.", 
                data: folder
            })
        } catch (err: any) {
            console.error(`Error Getting Folder By ID: ${err.message}`);
            res.status(500).json({ error: err.message  })
        }
    }

    httpGetAllFolders = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1 Validate the types of the Query.
            const parsedQuery = GetAllFoldersQuerySchema.safeParse(req.query)

            // 1.1 Handle validation exception.
            if (!parsedQuery.success) { 
                res.status(422).json({ errors: parsedQuery.error.format()}); // 422 Unprocessable Entity
                return;
            }

            // 2 Extract the data
            const { search, sortBy, sortOrder, page, pageSize } = parsedQuery.data

            // 3 Builds the pagination properties
            const skip = (page - 1) * pageSize
            const limit = pageSize

            const foldersFromDBRequest = {
                search: search,
                sortBy: sortBy,
                sortOrder: sortOrder,
                skip: skip,
                limit: limit,
            }
            // 4 Call the usecase
            const queryResponse = await this.getAllFoldersUseCase.execute(foldersFromDBRequest)

            // 4.1 Handle usecase exception.
            if (!queryResponse?.folders) {
                res.status(500).json({ error: 'Unexpected response: folders missing' });
                return;
            }

            // 4.2 Handle empty folders exception.
            if (queryResponse.folders.length === 0) {
                res.status(200).json({ 
                    error: 'No folders found',
                    data: {
                        items: [],
                        pagination: {
                            page: 1,
                            pageSize: pageSize,
                            totalPages: 1,
                            totalItems: 0,
                        }    
                    }
                });
                return;
            }

            // 5 Build the response
            const totalItemsCount = queryResponse.totalItemsCount

            // Round the total pages up if the division gives you zero.
            const totalPages = Math.ceil(totalItemsCount / pageSize)

            // 6 Sends Response
            res
            .status(200)
            .json({
                message: 'Folders retrieved successfully.',
                data: {
                    items: queryResponse.folders,
                    pagination: {
                        page: page,
                        pageSize: pageSize,
                        totalPages: totalPages,
                        totalItems: queryResponse.totalItemsCount,
                    }
                }
            })
        } catch (err: any) {
            console.error(`Error Getting All the Folders: ${err.message}`);
            res
            .status(500)
            .json({ // TODO: Review if it is ok to send this empty data here.
                error: err.message,
                data: null
            })
        }
    }
    httpCreateFolder = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1 Extract the data
            const folderData = req.body;
            const folderDataImage = req.file?.buffer; // Get the image from the request

            // 2 Complete the profilePicture property with the string of the Cloudinary URL, or null.
            if (folderDataImage) {
                const imageUrl = await uploadImageToCloudinary(folderDataImage)
                folderData.profilePicture = imageUrl
            } else  {
                folderData.profilePicture = null // Set to null if no image is provided 
            }

            // 3 Builds the placeOfBirth property
            folderData.placeOfBirth = {
                country: folderData.country,
                state: folderData.state,
                city: folderData.city,
            }

            // 4.1 Validate the data
            const validatedFolderData = FolderSchema.safeParse(folderData)

            // 4.2 Handle validation exception.
            if (!validatedFolderData.success) {
                const formatedErrors = validatedFolderData.error.format()
                console.log("This are the errors of the 422: ", formatedErrors)
                res.status(422).json({ errors: validatedFolderData.error.format()}); // 422 Unprocessable Entity
                return;
            }

            if (!folderDataImage) {
                res.status(422).json({ error: 'Image is required' }); // 422 Unprocessable Entity
                return;
            }

            // 5.1 Call the usecase. 
            const newFolder = await this.createFolderUseCase.execute(validatedFolderData.data)

            // 5.2 Handle usecase exception
            if (!newFolder) {
                res.status(400).json({ error: 'Folder creation failed' }); // 400 Bad Request
                return;
            }
            // 6.1 Response
             // 201 Created
            res.status(201).json({ 
                message: 'Folder created successfully.', 
                data: newFolder 
            })
            // 6.2 Handle unexpected exceptions.
        } catch (err: any) {
            console.error(`Error creating Folder: ${err.message}`);
            res.status(500).json({error: err.message}) // 500 Internal Server Error
        }
    }
    httpUpdateFolderById = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1 Extract the data
            const folderId = MongoIdSchema.safeParse(req.params.id)
            const parsedFolder = UpdateFolderSchema.safeParse(req.body)

            // 2 Validate the data
            if (!parsedFolder.success) {
                res.status(422).json({ errors: parsedFolder.error.format()})
                return
            }

            if (!folderId.success) {
                res.status(422).json({ errors: folderId.error.format()})
                return
            }

            // 3 Call the usecase. 
            const folder = await this.updateFolderByIdUseCase.execute(folderId.data, parsedFolder.data)

            // 4 
            if(!folder) {
                res.status(400).json({ message: "Folder not found"})
            }
            // 5 Response
            res.status(200).json({ 
                message: "Folder updated succesfully", 
                updatedFolder: folder
            })
        } catch (err: any) {
            console.error(`Error Updating Folder By ID: ${err.message}`);
            res.status(500).json({ error: err.message })
        }
    }
    httpDeleteFolderById = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1 Extract the data
            const folderId = req.params.id;
            const userId = req.body.userId;

            // 2 Validate the data
            const validatedFolderId = MongoIdSchema.safeParse(folderId)
            const validatedUserId = MongoIdSchema.safeParse(userId)
            
            if (!validatedFolderId.success) {
                throw new Error('A Folder Id is required')
            }

            if (!validatedUserId.success) {
                throw new Error('A User Id is required')
            }

            // 3 Call the usecase
            const deletedFolder = await this.deleteFolderByIdUseCase.execute(
                validatedFolderId.data,
                validatedUserId.data
            )

            // 3.1 Handle usecase exception.
            if(!deletedFolder) {
                res.status(400).json({ message: "Folder not found"})
            }
            
            // 4 Response
            res.status(202).json({
                message: "Folder succesfully deleted.",
                data: deletedFolder

            })
        } catch (err: any) {
            console.error(`Error Deleting Folder: ${err.message}`);
            res.status(500).json({error: err.message})
        }
    }
}

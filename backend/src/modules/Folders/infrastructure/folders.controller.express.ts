
import { Request, Response } from 'express'
import { GetFolderByIdUseCase } from '../usecases/getFolderById.usecase'
import { GetAllFoldersUseCase } from '../usecases/getAllFolders.usecase'
import { CreateFolderUseCase } from '../usecases/createFolder.usecase'
import { UpdateFolderByIdUseCase } from '../usecases/updateFolderById.usecase'
import { DeleteFolderByIdUseCase } from '../usecases/deleteFolderById.usecase'
import { FolderSchema } from '../domain/folders.entity'
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
    console.log('Hi from httpGetFolderById!')
    try {
      // 1 Extract the data
      const folderId = req.params.id;

      // 2 Validate the data

      // 3 Call the usecase. 
      const folder = await this.getFolderByIdUseCase.execute(folderId)

      // 4 Handle usecase exception.
      if (!folder) {
        res.status(404).json({ error: 'Folder not found' });
        return;
      }

      // 5 Response
      res.status(200).json(folder)
    } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
    }
  }
  httpGetAllFolders = async (req: Request, res: Response): Promise<void> => {
    console.log('Hi from httpGetAllFolders!')
    try {
    // 1 Extract the data
    
    // 2 Validate the data

    // 3 Call the usecase. 
    const folders = await this.getAllFoldersUseCase.execute()

    // 4 Handle usecase exception.

    // 5 Response
    res.status(200).json(folders)

    } catch (err: any) {
      res.status(500).json({
          error: err.message,
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
        res
            .status(201) // 201 Created
            .json({message: 'Folder created successfully: ', newFolder})
        // 6.2 Handle unexpected exceptions.
    } catch (err: any) {
        console.error(`Error creating Folder: ${err.message}`);
        res.status(500).json({error: err.message}) // 500 Internal Server Error
    }
  }
  httpUpdateFolderById = async (req: Request, res: Response): Promise<void> => {
      console.log('Hi from httpUpdateFolderById!')
      try {
      // 1 Extract the data
      const folderId = req.params.id;
      const folderData = req.body;

      // 2 Validate the data

      // 3 Call the usecase. 
      const folder = await this.updateFolderByIdUseCase.execute(folderId, folderData)

      // 4 Handle usecase exception.

      // 5 Response
      res.status(200).json(folder)
      } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
      }
  }
  httpDeleteFolderById = async (req: Request, res: Response): Promise<void> => {
      console.log('Hi from httpDeleteFolderById!')
      try {
      // 1 Extract the data
      const folderId = req.params.id;
  
      // 2 Validate the data
  
      // 3 Call the usecase. 
      await this.deleteFolderByIdUseCase.execute(folderId)
  
      // 4 Handle usecase exception.
  
      // 5 Response
      res.status(204).send()
      } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
      }
  }
}

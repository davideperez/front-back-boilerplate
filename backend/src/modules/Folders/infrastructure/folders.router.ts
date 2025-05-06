import express from 'express';
import { foldersController } from '../../../setup';
import { upload } from '../../../configs/multer.config';

const foldersRouter = express.Router()

// Read
foldersRouter.get('/', foldersController.httpGetAllFolders);
foldersRouter.get('/:id', foldersController.httpGetFolderById);

// Create
foldersRouter.post('/', upload.single('image'), foldersController.httpCreateFolder);

// Update

foldersRouter.put('/:id', foldersController.httpUpdateFolderById);

// Delete
foldersRouter.delete('/:id', foldersController.httpDeleteFolderById);

export default foldersRouter;
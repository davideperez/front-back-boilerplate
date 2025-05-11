import { FoldersRepository } from '../../domain/folders.repository';
import { createFolder } from './createFolder.mongo';
import { getFolderById } from './getFolderById.mongo';
import { getFolders } from './getFolders.mongo';
import { updateFolderById } from './updateFolderById.mongo';
import { softDeleteFolderById } from './softDeleteFolderById.mongo';
import { folderExistsByFirstAndLastName } from './folderExistsByFirstAndLastName.mongo';

export class FoldersMongoRepository implements FoldersRepository {
  // TODO: Revisar el tipo de folderDB y de client.
  // Dejarlo como para que se pueda usar cualquier cliente de mongoDB e incluso un mock

  // private folderDB: typeof FolderDB;

  // constructor(client: typeof FolderDB) {
  //     this.folderDB = client; 
  // }
  createFolder = createFolder;
  getFolderById = getFolderById;
  getFolders = getFolders;
  updateFolderById = updateFolderById;
  softDeleteFolderById = softDeleteFolderById;
  folderExistsByFirstAndLastName = folderExistsByFirstAndLastName;
}

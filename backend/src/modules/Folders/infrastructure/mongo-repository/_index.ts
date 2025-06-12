import { FoldersRepository } from '../../domain/folders.repository';
import { createFolder } from './createFolder.mongo';
import { getFolderById } from './getFolderById.mongo';
import { getFolders } from './getFolders.mongo';
import { updateFolderById } from './updateFolderById.mongo';
import { softDeleteFolderById } from './softDeleteFolderById.mongo';
import { folderExistsByFirstAndLastName } from './folderExistsByFirstAndLastName.mongo';

export class FoldersMongoRepository implements FoldersRepository {
  // TODO: SYNTHAX: Review if something is missing here and if so, why.

  createFolder = createFolder;
  getFolderById = getFolderById;
  getFolders = getFolders;
  updateFolderById = updateFolderById;
  softDeleteFolderById = softDeleteFolderById;
  folderExistsByFirstAndLastName = folderExistsByFirstAndLastName;
}

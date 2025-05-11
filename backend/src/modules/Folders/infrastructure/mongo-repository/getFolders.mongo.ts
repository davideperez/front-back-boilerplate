import { GetFoldersFromDBRequestDTO, GetFoldersFromDBResponseDTO } from '../../domain/dtos/read/getAllFoldersResponse.dto';
import { FolderDB } from '../schemas/folders.schema.mongoose';


export async function getFolders(input: GetFoldersFromDBRequestDTO): Promise<GetFoldersFromDBResponseDTO> {
    // 1. Extract the input
    const { search, sortBy, sortOrder, skip, limit } = input

    // 2. Construct a filter object based on the search term
    const filter = {
        $and: [
            {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                ],
            },
            { deletedAt: null },
            { deletedBy: null }
        ]
    };

    // 3. Construct a sort object based on the sortBy and sortOrder parameters
    type SortOrder = 1 | -1;
    const sort: { [key: string]: SortOrder }  = {};
    
    if (sortBy) {
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1
    }

    // 4 Construct the query to get the folders from the database
    const query = FolderDB.find(filter).sort(sort)
    
    if(typeof skip === 'number') query.skip(skip)
        if (typeof limit === 'number') query.limit(limit);
    
    // 5. Execute the query to get the folders from the database
    const folders = await query.exec();
    
    // 5.1 Handle the case when no folders are found
    if (!folders || folders.length === 0) {
        return {
            folders: [],
            totalItemsCount: 0,
        };
    }

    // 6. Get the total count of items in the collection
    const totalItemsCount = await FolderDB.countDocuments(filter).exec();
    
    // 7. Return the result as an object containing the folders and total items count
    return {
        folders,
        totalItemsCount,
    };
}
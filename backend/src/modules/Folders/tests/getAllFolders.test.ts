import app from "../../../app";
import request from 'supertest';
import { FolderDB } from "../infrastructure/schemas/folders.schema.mongoose";
import { validFolderData } from "./__mocks__/folders.mocks";


describe('GET /v1/folders', () => {
    beforeEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Cleaning the database before each test...');
    });

    afterEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Folder DB is empty.');

    })

    it('🧪 should return all folders successfully and a 200', async () => {
        // Creates 4 users
        const folder1 = new FolderDB(validFolderData);

        const validFolderData2 = JSON.parse(JSON.stringify(validFolderData))
        validFolderData2.firstName = 'Zack'
        const folder2 = new FolderDB(validFolderData2);
        
        const validFolderData3 = JSON.parse(JSON.stringify(validFolderData))
        validFolderData3.firstName = 'Alan'
        const folder3 = new FolderDB(validFolderData3);

        const validFolderData4 = JSON.parse(JSON.stringify(validFolderData))
        validFolderData4.firstName = 'Laurie'
        const folder4 = new FolderDB(validFolderData4);

        await folder1.save();
        await folder2.save();
        await folder3.save();
        await folder4.save();
        
        // Makes the request
        const response = await request(app)
            .get('/v1/folders')
            .query({ search: '', sortBy: 'firstName', sortOrder: 'asc', page: 1, pageSize: 3 })

        // Measures the response
        expect(response.statusCode).toBe(200);
        expect(response.body.data.items.length).toBe(3);
        expect(response.body.data.items[0].firstName).toBe(folder3.firstName);
        expect(response.body.data.pagination.totalItems).toBe(4);

    });

    // it('should return a 200 even if all query params are empty') {}
})
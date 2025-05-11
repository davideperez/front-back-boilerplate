import app from "../../../app";
import request from 'supertest';
import { FolderDB } from "../infrastructure/schemas/folders.schema.mongoose";
import { validFolderData } from "./__mocks__/folders.mocks";


describe('DELETE /v1/folders/:id', () => {
    beforeEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Cleaning the database before each test...');
    });

    afterEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Folder DB is empty.');

    })

    it('🧪 should response with the folder requested by id and a 200', async () => {
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
        
        console.log("=======================> folder1._id: ", folder1._id)
        // Makes the request
        const response = await request(app)
            .delete(`/v1/folders/${folder1._id}`)
            .send({userId: "whateverUserID"})

        console.log("=======================> response.body: ", response.body)
        // Measures the response
        expect(response.statusCode).toBe(202)
        expect(response.body.message).toBe("Folder succesfully deleted.")
        
        await request(app).delete(`/v1/folders/${folder2._id}`).send({userId: "whateverUserID"})
        await request(app).delete(`/v1/folders/${folder3._id}`).send({userId: "whateverUserID"})
        await request(app).delete(`/v1/folders/${folder4._id}`).send({userId: "whateverUserID"})
        
        const getAllFolders = await request(app)
            .get('/v1/folders')
            .query({ search: '', sortBy: 'firstName', sortOrder: 'asc', page: 1, pageSize: 3 })
        console.log("=======================> getAllFolders.body: ", getAllFolders.body)
        expect(getAllFolders.body.data.items.length).toBe(0)
    });

    // it('should return a 200 even if all query params are empty') {}
})
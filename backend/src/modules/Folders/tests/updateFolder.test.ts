import request from 'supertest';
import app from '../../../app';
import { validFolderData } from './__mocks__/folders.mocks';
import { FolderDB } from '../infrastructure/mongo-repository/folders.schema.mongoose';

describe('PUT /v1/folders/:id', () => {
    beforeEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Cleaning the database before each test...');
    });

    afterEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Folder DB is empty.');
    })

    it('🧪 should update a folder succesfully', async() => {
        const folder1 = new FolderDB(validFolderData);
        await folder1.save();
        
        const response = await request(app)
            .put(`/v1/folders/${folder1._id}`)
            .send({ lastName: 'Gomez'})
        
            console.log("=============================> This is response.body:  ", response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body.updatedFolder).toHaveProperty('_id')
        expect(response.body.updatedFolder.lastName).toBe('Gomez')
    })
})

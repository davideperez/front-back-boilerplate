import path from 'path';
import request from 'supertest';
import { testApp } from '../../../index';
import { validFolderData } from './__mocks__/folders.mocks';

describe('GET /ping', () => {
    it('should return pong', async () => {
        const response = await request(testApp).get('/ping');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('pong');
    });
})

describe('POST /v1/folders', () => {
    it('should create a new folder succesfully', async() => {
        const response = await request(testApp)
            .post('/v1/folders')
            .field('firstName', validFolderData.firstName)
            .field('lastName', validFolderData.lastName)
            .field('birthDate', validFolderData.birthDate)
            .field('country', validFolderData.country)
            .field('state', validFolderData.state)
            .field('city', validFolderData.city)
            .field('sex', validFolderData.sex)
            .field('nationality', validFolderData.nationality)
            .field('identityDocumentType', validFolderData.identityDocumentType)
            .field('identityDocumentNumber', validFolderData.identityDocumentNumber)
            .field('identityDocumentExpirationDate', validFolderData.identityDocumentExpirationDate)
            .field('school', validFolderData.school)
            .field('schoolYear', validFolderData.schoolYear)
            .field('createdBy', validFolderData.createdBy)
            .field('updatedBy', validFolderData.updatedBy)
            // Imagen aparte con .attach()
            .attach('profilePicture', path.join(__dirname, './assets/profile-picture-test-image.avif'));
        
            // console.log('This is the response: ', response)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe('myName')
    })
})

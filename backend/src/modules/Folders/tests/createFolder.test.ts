import path from 'path';
import request from 'supertest';
import app from '../../../app';
import { missingFirstNameFolderData, validFolderData } from './__mocks__/folders.mocks';
import { FolderDB } from '../infrastructure/schemas/folders.schema.mongoose';

describe('GET /ping', () => {
    it('🧪 should return pong', async () => {
        const response = await request(app).get('/ping');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('pong');
    });
})

describe('POST /v1/folders', () => {
    beforeEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Cleaning the database before each test...');
    });

    afterEach(async () => {
        await FolderDB.deleteMany({});
        console.log('🧹 Folder DB is empty.');
    })

    it('🧪 should create a new folder succesfully', async() => {
        const response = await request(app)
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
            .attach('image', path.join(__dirname, './assets/profile-picture-test-image.jpg'))
        
        expect(response.statusCode).toBe(201)
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data.firstName).toBe('Juan')
    })

    it('🧪 should return 400 if name is missing', async() => {
        const response = await request(app)
            .post('/v1/folders')
            .field('lastName', missingFirstNameFolderData.lastName)
            .field('birthDate', missingFirstNameFolderData.birthDate)
            .field('country', missingFirstNameFolderData.country)
            .field('state', missingFirstNameFolderData.state)
            .field('city', missingFirstNameFolderData.city)
            .field('sex', missingFirstNameFolderData.sex)
            .field('nationality', missingFirstNameFolderData.nationality)
            .field('identityDocumentType', missingFirstNameFolderData.identityDocumentType)
            .field('identityDocumentNumber', missingFirstNameFolderData.identityDocumentNumber)
            .field('identityDocumentExpirationDate', missingFirstNameFolderData.identityDocumentExpirationDate)
            .field('school', missingFirstNameFolderData.school)
            .field('schoolYear', missingFirstNameFolderData.schoolYear)
            .field('createdBy', missingFirstNameFolderData.createdBy)
            .field('updatedBy', missingFirstNameFolderData.updatedBy)
            // Imagen aparte con .attach()
            .attach('image', path.join(__dirname, './assets/profile-picture-test-image.jpg'))
        
        expect(response.statusCode).toBe(422)
        expect(response.body).toHaveProperty('errors');
    })
    it('should return 409, if a folder with this name and lastname already exists', async() => {
        // First creation
        await request(app)
            .post('/v1/folders')
            .field('firstName', validFolderData.firstName)
            .field('lastName', missingFirstNameFolderData.lastName)
            .field('birthDate', missingFirstNameFolderData.birthDate)
            .field('country', missingFirstNameFolderData.country)
            .field('state', missingFirstNameFolderData.state)
            .field('city', missingFirstNameFolderData.city)
            .field('sex', missingFirstNameFolderData.sex)
            .field('nationality', missingFirstNameFolderData.nationality)
            .field('identityDocumentType', missingFirstNameFolderData.identityDocumentType)
            .field('identityDocumentNumber', missingFirstNameFolderData.identityDocumentNumber)
            .field('identityDocumentExpirationDate', missingFirstNameFolderData.identityDocumentExpirationDate)
            .field('school', missingFirstNameFolderData.school)
            .field('schoolYear', missingFirstNameFolderData.schoolYear)
            .field('createdBy', missingFirstNameFolderData.createdBy)
            .field('updatedBy', missingFirstNameFolderData.updatedBy)
            // Imagen aparte con .attach()
            .attach('image', path.join(__dirname, './assets/profile-picture-test-image.jpg'))
        
        // Second creation with the same name and lastname
        const response = await request(app)
            .post('/v1/folders')
            .field('firstName', validFolderData.firstName)
            .field('lastName', missingFirstNameFolderData.lastName)
            .field('birthDate', missingFirstNameFolderData.birthDate)
            .field('country', missingFirstNameFolderData.country)
            .field('state', missingFirstNameFolderData.state)
            .field('city', missingFirstNameFolderData.city)
            .field('sex', missingFirstNameFolderData.sex)
            .field('nationality', missingFirstNameFolderData.nationality)
            .field('identityDocumentType', missingFirstNameFolderData.identityDocumentType)
            .field('identityDocumentNumber', missingFirstNameFolderData.identityDocumentNumber)
            .field('identityDocumentExpirationDate', missingFirstNameFolderData.identityDocumentExpirationDate)
            .field('school', missingFirstNameFolderData.school)
            .field('schoolYear', missingFirstNameFolderData.schoolYear)
            .field('createdBy', missingFirstNameFolderData.createdBy)
            .field('updatedBy', missingFirstNameFolderData.updatedBy)
            // Imagen aparte con .attach()
            .attach('image', path.join(__dirname, './assets/profile-picture-test-image.jpg'))
        expect(response.statusCode).toBe(500)
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Ya existe un legajo con el mismo nombre.')
    })
})



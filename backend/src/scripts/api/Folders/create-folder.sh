#!/bin/bash

curl -X POST http://10.255.255.255:3000/v1/folders \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "birthDate": "2010-05-15T00:00:00.000Z",
    "placeOfBirth": {
      "city": "Buenos Aires",
      "state": "Buenos Aires",
      "country": "Argentina"
    },
    "sex": "M",
    "nationality": "Argentina",
    "identityDocumentType": "DNI",
    "identityDocumentNumber": "45123456",
    "identityDocumentExpirationDate": "2030-12-31T00:00:00.000Z",
    "school": "Escuela Primaria Nº12",
    "schoolYear": "5to grado",
    "createdBy": "admin@example.com",
    "updatedBy": "admin@example.com"
  }'

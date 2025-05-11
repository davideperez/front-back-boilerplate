import mongoose from "mongoose"
import { Folder } from '../../domain/folders.entity'

const Schema = mongoose.Schema

const folderSchema = new Schema<Folder>({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        required: true,
    },
    firstName: {
        type: String,
        default: "",
        required: true,
    },
    lastName: {
        type: String,
        default: "",
        required: true,
    },
    birthDate: {
        type: Date,
        default: null,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    placeOfBirth: {
        city: {
            type: String,
            default: "",
            // required: false,
        },
        state: {
            type: String,
            default: "",
            // required: false,
        },
        country: {
            type: String,
            default: "",
            // required: false,
        }
    },
    sex: {
        type: String,
        enum: ["M", "F"],
        default: null,
        required: true,
    },
    nationality: {
        type: String,
        default: null,
    },
    identityDocumentType: {
        type: String,
        default: null,
    },
    identityDocumentNumber: {
        type: String,
        default: null,
    },
    identityDocumentExpirationDate: {
        type: Date,
        default: null,
    },
    school: {
        type: String,
        default: null,
    },
    schoolYear: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        default: null,
    },
    updatedBy: {
        type: String,
        default: null,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deletedBy: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    minimize: false, // No eliminar propiedades vacias.
    strict: true, // No permitir propiedades no definidas en el esquema.
    _id: true, // Crear el campo _id por defecto de mongoose.
    // versionKey: true, Manejo de versiones de los documentos de mongodb
    // id: true, Crear el campo id por defecto de mongoose.
    // Se puede eliminar el campo __v y _id de la respuesta de la base de datos.
    // toJSON: {
    //     transform: (doc, ret) => {
    //         delete ret._id
    //         delete ret.__v
    //         return ret
    //     }
    // },
    // toObject: {
    //     transform: (doc, ret) => {
    //         delete ret._id
    //         delete ret.__v
    //         return ret
    //     }
    // },
})

export const FolderDB = mongoose.model("Folder", folderSchema)

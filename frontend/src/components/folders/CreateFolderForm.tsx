// TODO: Decide if session storage is better than localstorge

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateFolderFormSchema, FolderDetailType } from "@/types/folder";
import { createFolder, getFolder, updateFolder } from "@/api/folders-api";

import { toast } from "sonner";

import { 
    Form, 
    FormItem, 
    FormField, 
    FormLabel, 
    FormControl, 
    FormDescription, 
} from "../ui/form";

import { 
    Card, 
    CardTitle,
    CardHeader, 
    CardContent, 
} from "../ui/card";

import { 
    Select,
    SelectItem, 
    SelectValue, 
    SelectTrigger,
    SelectContent, 
} from "../ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from '../ui/calendar';
import { Separator } from "../ui/separator";
import { formItemClass, h1, h3, small } from "../styles";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "../ui/popover";

interface CreateFolderProps {
    onSuccess: () => void,
    folderId?: string
}

type CreateFolderFormData = z.infer<typeof CreateFolderFormSchema>

const CreateFolderForm = ({ onSuccess }: CreateFolderProps) => {
    console.log('============================================================================================================ > Hi from CreateFolderForm!!!')
    
    const [ folder, setFolder ] = useState<CreateFolderFormData>()
    const [ preview, setPreview ] = useState<string | null>(null);
    const [ showImageInput, setShowImageInput ] = useState<boolean>(false);
    
    const { folderId } = useParams<{ folderId: string }>()
    
    /* Just a logger of the current mode */
    if (folderId) {
        console.log('Hi from CreateFolderForm > EDIT MODE!')
    } else {
        console.log('Hi from CreateFolderForm > CREATE MODE!')
    }

    /* 1 Folder Fetching if EDIT MODE*/
    useEffect(() => {
        if (folderId) {
            const fetchFolder = async () => {
                try {
                    const response: { 
                        message: string, 
                        data: FolderDetailType 
                    } = await getFolder(folderId)

                    console.log("CreateFolderForm > useEffect > fetchFolder > getFolder > response.data:", response.data)
                    setFolder(response.data)
                } catch (error) {
                    console.error(error)                
                }
            }
            fetchFolder()
        }
    },[folderId])

    // console.log("This is CreateFolderForm > folder:", folder)
    
    const savedFormData = typeof window !== 'undefined' 
        ? localStorage.getItem('create-folder-form')
        : null;

    // console.log("This is folder: ", folder)
    
    /* 3 Form Initial Values Setler */
    const defaultValues: CreateFolderFormData = savedFormData
        ? JSON.parse(savedFormData)
        : {
            firstName: 'Nombre de Prueba',
            lastName: '',
            birthDate: new Date(),
            profilePicture: undefined,
            city: '',
            state: '',
            country: '',
            sex: 'M',
            nationality: '',
            identityDocumentType: 'DNI',
            identityDocumentNumber: '',
            identityDocumentExpirationDate: new Date(),
            school: '',
            schoolYear: '',
            createdBy: 'David', // TODO: Replace when user logic is ready
        }

    /*  */

    const form = useForm<CreateFolderFormData>({
        resolver: zodResolver(CreateFolderFormSchema),
        defaultValues
    })

    /* A */
    useEffect(() => {
        console.log("Form state errors", form.formState.errors);
    }, [form.formState]);
    
    /* 2 Form Memory: Local storage management */
    useEffect(() => {
        console.log("ALERT: The Local Storage useEffect triggered, because [] dependencies.")
        const subscription = form.watch(
            (value: unknown) => { // TODO: To review is that unkown safe there?
                try {
                    if(!folder) {
                        localStorage.setItem('create-folder-form', JSON.stringify(value))
                    }
                } catch (error) {
                    console.error("Error saving form data to localStorage", error)
                }
            }
        )
        return () => subscription.unsubscribe();
    }, [form, folder])

    // If edit mode, then fill the form with the current Folder Info.
    useEffect(() => {
        console.log("ALERT: The EDIT useEffect triggered, because [folder, form] dependencies.")
        if (folder) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { profilePicture, placeOfBirth, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy, ...rest } = folder
            console.log("CreateFolderForm > edit mode useEffect > ...rest", rest)

            /* 1 */
            form.reset({
                city: placeOfBirth.city,
                state: placeOfBirth.state,
                country: placeOfBirth.country,
                ...rest
            })
        }
    }, [folder, form,]) // TODO: Why to add form as a dependency here?

    /* 4 Profile Picture Change - Handler  */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0]
        /*  */
        if (file) {
            /* 1 */
            console.log("SETTING VALUEE!!")
            console.log("SETTING VALUEE!! > file: ", file)
            console.log("SETTING VALUEE!! > form", form)
            setPreview(URL.createObjectURL(file))
            
            /* 2 */
            form.setValue("profilePicture", file)
            console.log("SETTING VALUEE!! > form done: ", form)
            console.log("SETTING VALUEE!! > preview: ", preview)
        }
    }

    /* 5 Form Submition - Handler */
    const onSubmit = form.handleSubmit(async (values: z.infer<typeof CreateFolderFormSchema>) => {
        /* Complete the form info with the internal necessary data */
        console.log("Hi from onSubmit button!")
        console.log("Hi from onSubmit button!")

        /* Initializes a form */
        const formData = new FormData()
        console.log("This is formData: ", formData)
        
        for (const [key, value] of formData.entries()) {
            console.log("This is formData before being build: ", key, value)
        }
        
        /* Form object construction */
        Object.entries(values).forEach(
            ([key, value]) => {
                /* File/Images */
                if (key === 'profilePicture' && value instanceof File) {
                    // if (!folder) {
                        console.log("Agregando la imagen al formulario como image.")
                        formData.append("image", value);
                    // } else {
                    //     console.log("Agregando la imagen al formulario como image.")
                    //     formData.append("image", value)
                    // }
                /* Anidated objects properties */
                } else if (typeof value === "object" && value !== null && !(value instanceof Date)) {
                    Object.entries(value).forEach(
                        ([subKey, subValue]) => {
                            formData.append(`${key}.${subKey}`, String(subValue ?? ""))
                        }
                    )
                /* Dates */
                } else if (value instanceof Date) {
                    formData.append(key, value.toISOString())
                
                /* Strings */
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value))
                }
            }
        )

        console.log("///////////////////////////////////////////// formData already build: /////////////////////////////////////////////");
        for (const [key, value] of formData.entries()) {
            console.log(key," : ", value);
        }
        console.log("///////////////////////////////////////////// FIN /////////////////////////////////////////////");

        /* API calls */
        try {
            if(folder && typeof folder._id === "string" ) {
                console.log("SE ESTA POR LLAMAR EL EDIT!!")
                await updateFolder(formData, folder._id)
                toast.success("Los cambios fueron guardados correctamente.")
                onSuccess()
            } else {
                console.log("SE ESTA POR LLAMAR EL CREATE!!")
                await createFolder(formData)
                localStorage.removeItem('create-folder-form')
                toast.success("El legajo fue creado correctamente!")
                onSuccess()
            }
        } catch {
            /* Toast Exception*/
            if(folder) {
                toast.warning("Error al guardar los cambios.")
            } else {
                toast.warning("Error en la creación del legajo")
            }
        }
    })

    /* Form states logger */
   /*  useEffect(() => {
        console.log("USEFFECT form: ", form)
    }, [form]) */

    return (
        <div className="flex flex-col justify-start">
            {
                folder ?
                <h1 className={`${h1} font-semibold`}><span className="font-semibold">Editar: </span> Legajo de {folder.firstName} {folder.lastName}</h1> // TODO: This style is hardcoded. Solve this.
                : <h1 className={h1}>Nuevo Legajo</h1>
            }
            <Card className="m-8 px-12 py-4 w-1/2">
                <CardHeader>
                    <CardTitle>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-y-8"
                            onSubmit={onSubmit}
                        >
                            <h3 className={h3}>Información Básica</h3>
                            {/* firstName */}
                            <FormField
                                name='firstName'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Nombres</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors?.firstName &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.firstName.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* lastName */}
                            <FormField
                                name='lastName'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Apellidos</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors?.lastName &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.lastName.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* sex  */}
                            <FormField
                                name='sex'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Sexo</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccioná una opción" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="M">Hombre</SelectItem>
                                                    <SelectItem value="F">Mujer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {
                                                form.formState.errors?.sex &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.sex.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* profilePicture */}
                            
                            {
                                folder 
                                ? (
                                    <div>
                                        <h4 className={`${small} pb-6`}>Foto del Legajo</h4>
                                        { showImageInput ? (
                                            <>
                                                <Avatar className="min-h-28 h-auto min-w-32 mb-8 items-center">
                                                    <AvatarImage 
                                                        src={preview} 
                                                    />
                                                    <AvatarFallback className=""> Nueva Foto</AvatarFallback>
                                                </Avatar>
                                                <FormField
                                                    name='profilePicture'
                                                    render={
                                                        ({field}) => (
                                                            <FormItem className={`${formItemClass} pb-4`}>
                                                                {/* <FormLabel htmlFor="picture" >Foto del Legajo</FormLabel> */}
                                                                <FormControl>
                                                                    <Input 
                                                                        id="picture" 
                                                                        type="file" 
                                                                        // maxLength={4194304}
                                                                        ref={field.ref}
                                                                        // {...field}
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </FormControl>
                                                                {
                                                                    form.formState.errors?.profilePicture &&
                                                                        <FormDescription>
                                                                            {String(form.formState.errors?.profilePicture?.message || '')}
                                                                        </FormDescription>
                                                                }
                                                            </FormItem>
                                                        )
                                                    }
                                                />
                                            </>
                                        )
                                        :
                                        (
                                            <Avatar className="h-auto min-w-32  mb-8">
                                                <AvatarImage src={String(folder?.profilePicture)} />
                                                <AvatarFallback>Foto del Legajo</AvatarFallback>
                                            </Avatar>
                                        )
                                        }
                                        <button 
                                            onClick={() => {
                                                setShowImageInput(prev => !prev)
                                            }}
                                            type="button"
                                            className={cn(
                                                "w-[180px] font-normal text-blue-500 text-start"
                                            )}
                                        >
                                            { showImageInput ? "Cancelar" : "Cambiar Imagen" } 
                                        </button>

                                    </div>
                                )
                                : (
                                    <FormField
                                        name='profilePicture'
                                        render={
                                            ({field}) => (
                                                <FormItem className={formItemClass}>
                                                    <FormLabel htmlFor="picture" >Foto del Legajo</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            id="picture" 
                                                            type="file" 
                                                            ref={field.ref}
                                                            onChange={handleImageChange}
                                                            // maxLength={4194304}
                                                            // {...field}
                                                        />
                                                    </FormControl>
                                                    {
                                                        form.formState.errors?.profilePicture &&
                                                            <FormDescription>
                                                                {String(form.formState.errors?.profilePicture?.message || '')}
                                                            </FormDescription>
                                                    }
                                                </FormItem>
                                            )
                                        }   
                                    />
                                )
                            }

                            <Separator />
                            <h3 className={h3}>Información de Nacimiento</h3>
                            {/* birthDate */}
                            <FormField 
                                name='birthDate'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Fecha de Nacimiento</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                             {
                                                form.formState.errors?.birthDate &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.birthDate.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            
                            {/* country */}
                            <FormField 
                                name='country'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>País de Nacimiento</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors.placeOfBirth?.country &&
                                                    <FormDescription>
                                                        {String(form.formState.errors.placeOfBirth?.country.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* state  */}
                            <FormField 
                                name='state'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Provincia de Nacimiento</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors.placeOfBirth?.state &&
                                                    <FormDescription>
                                                        {String(form.formState.errors.placeOfBirth?.state.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* city  */}
                            <FormField 
                                name='city'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Ciudad de Nacimiento</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors.placeOfBirth?.city &&
                                                    <FormDescription>
                                                        {String(form.formState.errors.placeOfBirth?.city.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            <Separator />
                            <h3 className={h3}>Documento de Identidad</h3>
                            
                            {/* nationality  */}
                            <FormField
                                name='nationality'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Nacionalidad</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors?.nationality &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.nationality.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* identityDocumentType  */}
                            <FormField
                                name='identityDocumentType'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Tipo de Documento</FormLabel>
                                            <Select 
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccioná una opción" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="DNI">DNI</SelectItem>
                                                    <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                                                    <SelectItem value="CI">Cédula de Identidad</SelectItem>
                                                    <SelectItem value="inProgress">En proceso</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {
                                                form.formState.errors?.identityDocumentType &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.identityDocumentType.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* identityDocumentNumber  */}
                            <FormField
                                name='identityDocumentNumber'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Número de Documento</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                            {
                                                form.formState.errors?.identityDocumentNumber &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.identityDocumentNumber.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* identityDocumentExpirationDate  */}
                            <FormField
                                name='identityDocumentExpirationDate'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Vencimiento del Documento</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            /* date < new Date() ||  */date < new Date("1900-01-01")
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {
                                                form.formState.errors?.identityDocumentExpirationDate &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.identityDocumentExpirationDate.message || '')}
                                                    </FormDescription>
                                            }
                                        </FormItem>
                                    )
                                }
                            />
                            <Separator />
                            <h3 className={h3}>Información de Escolaridad</h3>
                            {/* school  */}
                            <FormField
                                name='school'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Escuela</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                                {
                                                    form.formState.errors?.school &&
                                                        <FormDescription>
                                                            {String(form.formState.errors?.school.message || '')}
                                                        </FormDescription>
                                                }
                                        </FormItem>
                                    )
                                }
                            />
                            {/* schoolYear  */}
                            <FormField
                                name='schoolYear'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Año Escolar</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                                {
                                                    form.formState.errors?.schoolYear &&
                                                        <FormDescription>
                                                            {String(form.formState.errors?.schoolYear.message || '')}
                                                        </FormDescription>
                                                }
                                        </FormItem>
                                    )
                                }
                            />
                            <Button 
                                type="submit" 
                                className="mt-4 min-w-32 w-1/5"
                            >
                                {
                                    folder
                                        ? "Guardar Cambios"
                                        : "Crear Legajo"
                                }
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFolderForm;

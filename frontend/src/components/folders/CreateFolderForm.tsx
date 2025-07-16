// TODO: Decide if session storage is better than localstorge

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { createFolder, getFolder, updateFolder } from "@/api/folders-api";
import { CreateFolderFormSchema } from "@/types/folder";

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
import { formItemClass, h1, h3 } from "../styles";
import { Avatar, AvatarImage,AvatarFallback } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { error } from "console";


interface CreateFolderProps {
    onSuccess: () => void,
    // editMode: boolean,
    folderId?: string
}

type CreateFolderFormData = z.infer<typeof CreateFolderFormSchema>

const CreateFolderForm = ({ onSuccess/*, editMode , folderId  */}: CreateFolderProps) => {
    // folderId = "684af2a8964250763bcdb5f6"
    // editMode = true
    console.log('============================================================================================================ > Hi from CreateFolderForm!!!')
    
    const [ folder, setFolder ] = useState<CreateFolderFormData>()
    
    const { folderId } = useParams<{ folderId: string }>()
    
    if (folderId) {
        console.log('Hi from CreateFolderForm > EDIT!')
    } else {
        console.log('Hi from CreateFolderForm > CREATE!')
    }

    console.log("This is CreateFolderForm > folderId, porque edit mode: ", folderId)

    useEffect(() => {
        if (folderId) {
            const fetchFolder = async () => {
                try {
                    const response = await getFolder(folderId)
                    console.log("This is CreateFolderForm > useEffect > fetchFolder > getFolder > response.data:", response.data)
                    setFolder(response.data)
                } catch (error) {
                    console.error(error)                
                }
            }
            fetchFolder()
        }
    },[folderId])

    console.log("This is CreateFolderForm > folder:", folder)

    /* 1 Implementation of React Hook Form  */
    
    // Local storage memory
    useEffect(() => {
        const subscription = form.watch(
            (value: unknown) => {
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
    })

    const savedFormData = typeof window !== 'undefined' 
        ? localStorage.getItem('create-folder-form')
        : null;
    
    console.log("This is folder: ", folder)
    // TODO: Upgrade this logic, perhaps a form for each case. But it is read a bit messy.
    // If edit, loads the selected Folder in the form, if not, it is createion form fills it with the default or stored values.
    // Edition case
    /*
    {
        firstName: folder.firstName,
        lastName: folder.lastName,
        birthDate: folder.birthDate,
        profilePicture: undefined,
        city: folder.city,
        state: folder.state,
        country: folder.country,
        sex: folder.sex,
        nationality: folder.nationality,
        identityDocumentType: folder.identityDocumentType,
        identityDocumentNumber: folder.identityDocumentNumber,
        identityDocumentExpirationDate: folder.identityDocumentExpirationDate,
        school: folder.school,
        schoolYear: folder.schoolYear,
        createdBy: folder.createdBy,
    }
    */

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
    
    console.log("This is CreateFolderForm > defaultValues: ", defaultValues)
    
    const form = useForm<CreateFolderFormData>({
        resolver: zodResolver(CreateFolderFormSchema),
        defaultValues
    })

    // If edit mode, then fill the form with the current Folder Info.
    useEffect(() => {
        if (folder) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { profilePicture, ...rest } = folder
            form.reset({
                ...rest
            })
        }
    }, [folder, form]) // TODO: Why to add form as a dependency here?

    /* 2 onSubmit */
    const onSubmit = form.handleSubmit(async (values: z.infer<typeof CreateFolderFormSchema>) => {
        /* Complete the form info with the internal necessary data */
        console.log("Hi from onSubmit button!")

        const formData = new FormData()

        Object.entries(values).forEach(
            ([key, value]) => {
                /* Images */
                if (key === 'profilePicture' && value instanceof File) {
                    formData.append("image", value);
                
                    /* Anidated object property */
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
        
        try {
            if(folder) {
                await updateFolder(formData, folder._id)
                toast.success("Los cambios fueron guardados correctamente.")
                onSuccess()
            } else {
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


    useEffect(() => {
        console.log("USEFFECT form: ", form)
    }, [form])
    return (
        <div className="flex flex-col justify-start">
            {
                folder ?
                <h1 className={`${h1} font-semibold`}><span className="font-semibold">Editar: </span> Legajo de {folder.firstName}</h1> // TODO: This style is hardcoded. Solve this.
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
                                                    // maxLength={4194304}
                                                    ref={field.ref}
                                                    // {...field}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> {
                                                        
                                                        const file = e.target.files?.[0]
                                                        
                                                        if (file) {
                                                            console.log("SETTING VALUEE!!")
                                                            console.log("SETTING VALUEE!! > file: ", file)
                                                            console.log("SETTING VALUEE!! > form", form)

                                                            form.setValue("profilePicture", file)

                                                            console.log("SETTING VALUEE!! > form done: ", form)

                                                        }
                                                    }}
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
                            {
                                folder && 
                                    (
                                        <Avatar className="h-auto min-w-32 ">
                                            <AvatarImage src={String(folder?.profilePicture)} />
                                            <AvatarFallback>Foto del Legajo</AvatarFallback>
                                        </Avatar>
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
                                                form.formState.errors?.country &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.country.message || '')}
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
                                                form.formState.errors?.state &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.state.message || '')}
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
                                                form.formState.errors?.city &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.city.message || '')}
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
                            <Button type="submit" className="mt-4 min-w-32 w-1/5">
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


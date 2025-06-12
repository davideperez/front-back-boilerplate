// TODO: Decide if session storage is better than localstorge

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChangeEvent, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { createFolder } from "@/api/folders-api";
import { CreateFolderFormSchema } from "@/types/folder";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from '../ui/calendar';
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "../ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form } from "../ui/form";
import { toast } from "sonner";

interface CreateFolderProps {
    onSuccess: () => void
}

type CreateFolderFormData = z.infer<typeof CreateFolderFormSchema>

const CreateFolderForm = ({ onSuccess }: CreateFolderProps) => {

    /* 1 Implementation of React Hook Form  */
    // Form state,
    // form validations, 
    // and Form initial values.

    useEffect(() => {
        const subscription = form.watch(
            (value) => {
                try {
                    localStorage.setItem('create-folder-form', JSON.stringify(value))
                } catch (error) {
                    console.error("Error saving form data to localStorage", error)
                }
            }
        )
        return () => subscription.unsubscribe();
    })

    const savedFormData = typeof window !== 'undefined' ? localStorage.getItem('create-folder-form') : null;

    const form = useForm<CreateFolderFormData>({
        resolver: zodResolver(CreateFolderFormSchema),
        defaultValues: savedFormData
        ? JSON.parse(savedFormData)
        : {
            firstName: '',
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
    })
    
    /* 2 onSubmit */
    const onSubmit = form.handleSubmit(async (values: z.infer<typeof CreateFolderFormSchema>) => {
        /* Complete the form info with the internal necessary data */

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
            await createFolder(formData)
            localStorage.removeItem('create-folder-form')
            toast.success("El legajo fue creado correctamente!")
            onSuccess()
        } catch {
            /* Toast Exception*/
            toast.warning("Error en la creación del legajo")
        }

    })
    
    /* Tailwind Classes */
    const formItemClass = "flex flex-col gap-y-2 w-1/2"
    const h1 = "ml-8 mt-8 scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance"
    // const h2 = "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    const h3 = "scroll-m-20 text-2xl font-semibold tracking-tight"

    return (
        <div className="flex flex-col justify-start">
            <h1 className={h1}>Nuevo Legajo</h1>
            <Card className="m-8 px-12 py-10 w-1/2">
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
                                                            form.setValue("profilePicture", file)
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
                            <Button className="mt-4 min-w-32 w-1/5">Crear Legajo</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFolderForm;
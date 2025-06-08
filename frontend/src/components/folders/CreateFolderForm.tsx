
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form } from "../ui/form";

import { createFolder } from "@/api/folders-api";
import { CreateFolderFormSchema, CreateFolderFormType } from "@/types/folder";
import DatePicker from "../DatePicker";

interface CreateFolderProps {
    onSuccess: () => void
}

const CreateFolderForm = ({ onSuccess }: CreateFolderProps) => {
    /* 1 Implementation of React Hook Form  */
    // Form state,
    // form validations, 
    // and Form initial values.
    const form = useForm<CreateFolderFormType>({
        resolver: zodResolver(CreateFolderFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            placeOfBirth: {
                city: '',
                state: '',
                country: '',
            },
            sex: 'M',
            nationality: '',
            identityDocumentType: '',
            identityDocumentNumber: '',
            identityDocumentExpirationDate: new Date(),
            school: '',
            schoolYear: '',
            createdBy: 'David', // TODO: Replace when user logic is ready
        }
    })
    
    /* 2 onSubmit */
    const onSubmit = form.handleSubmit((values: CreateFolderFormType) => {
        console.log("This is onSubmit values: ", values)
        createFolder(values)
        onSuccess()
    })
    
    const formItemClass = "flex flex-col gap-y-2"
    const h1 = "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"

    return (
        <div className="flex justify-center">
            <Card className="m-8 px-12 py-10 w-1/2">
                <CardHeader>
                    <CardTitle>
                        <h1 className={h1}>Nuevo Legajo</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-y-8"
                            onSubmit={onSubmit}
                        >
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
                            {/* birthDate */}
                            <FormField
                                name='birthDate'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel>Fecha de Nacimiento</FormLabel>
                                            <FormControl>
                                                {/* <Input type="text" {...field}/> */}
                                                <DatePicker />
                                            </FormControl>
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
                                                form.formState.errors?.placeOfBirth?.country &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.placeOfBirth?.country.message || '')}
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
                                                form.formState.errors?.placeOfBirth?.state &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.placeOfBirth?.state.message || '')}
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
                                                form.formState.errors?.placeOfBirth?.city &&
                                                    <FormDescription>
                                                        {String(form.formState.errors?.placeOfBirth?.city.message || '')}
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
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
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
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
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
                                            <FormLabel>Fecha de Vencimiento del Documento de Identidad</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}/>
                                            </FormControl>
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
                            <Button>Crear Legajo</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateFolderForm;
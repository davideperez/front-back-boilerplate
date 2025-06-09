
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from '../ui/calendar'
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form } from "../ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "../ui/select";

import { cn } from "@/lib/utils";
import { createFolder } from "@/api/folders-api";
import { CreateFolderFormSchema } from "@/types/folder";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CreateFolderProps {
    onSuccess: () => void
}

const CreateFolderForm = ({ onSuccess }: CreateFolderProps) => {
    /* 1 Implementation of React Hook Form  */
    // Form state,
    // form validations, 
    // and Form initial values.
    const form = useForm<z.infer<typeof CreateFolderFormSchema>>({
        resolver: zodResolver(CreateFolderFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            profilePicture: '',
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
    const onSubmit = form.handleSubmit((values: z.infer<typeof CreateFolderFormSchema>) => {
        console.log("This is onSubmit values: ", values)
        const createNewFolderRequest = {
            ...values, 
            createdBy: "David" // TODO: Change this with the logged user id
        }
        console.log("This is ")

        createFolder(createNewFolderRequest)
        onSuccess()
    })
    
    const formItemClass = "flex flex-col gap-y-2 w-1/2"
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
                            {/* profilePicture */}
                            <FormField
                                name='profilePicture'
                                render={
                                    ({field}) => (
                                        <FormItem className={formItemClass}>
                                            <FormLabel htmlFor="picture" >Foto de Legajo</FormLabel>
                                            <FormControl>
                                                <Input id="picture" type="file" {...field}/>
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a verified email to display" />
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
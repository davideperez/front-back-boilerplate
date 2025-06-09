import CreateFolderForm from "@/components/Folders/CreateFolderForm"

const CreateFolderPage = () => {

    return (
        <CreateFolderForm 
            onSuccess={function (): void {
                throw new Error("Function not implemented.")
            }} 
        />
    )
}

export default CreateFolderPage

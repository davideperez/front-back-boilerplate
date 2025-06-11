import CreateFolderForm from "@/components/Folders/CreateFolderForm"
import { useNavigate } from "react-router-dom";

const CreateFolderPage = () => {
    const navigate = useNavigate()
    return (
        <CreateFolderForm 
           onSuccess={() => {
                navigate("/folders");
            }}
        />
    )
}

export default CreateFolderPage

import { Route } from "react-router-dom";

import MainLayout from "@/components/Main/MainLayout";

import { Dashboard } from "@/pages/Dashboard";

import { FoldersPage } from "@/pages/folders/FoldersListPage";
import { ViewFolderPage } from "@/pages/folders/ViewFolderPage";

import { FilePage } from "@/pages/files/FilePage";

import { MyProfilePage } from "@/pages/users/MyProfilePage";
import { UserPage } from "@/pages/users/UserPage";
import { UsersPage } from "@/pages/users/UsersPage";

import { SettingsPage } from "@/pages/SettingsPage";
import CreateFolderPage from "@/pages/folders/CreateFolderPage";
import EditFolderPage from "@/pages/folders/EditFolderPage";

const ProtectedRoutes = () => (
    <>
        <Route path="/" element ={<MainLayout />}>
            <Route index element ={<Dashboard />} />

            <Route path="folders" element ={<FoldersPage />} />
            <Route path="folder:id" element ={<ViewFolderPage />} />
            <Route path="folder:id/edit" element ={<EditFolderPage />} />
            <Route path="folder/create" element ={<CreateFolderPage />} />
            
            <Route path="file:id" element ={<FilePage />} />
            
            <Route path="my-profile" element ={<MyProfilePage />} />
            <Route path="users" element ={<UsersPage />} />
            <Route path="user:id" element ={<UserPage />} />
            <Route path="settings" element ={<SettingsPage />} />
        </Route>
    </>
)

export default ProtectedRoutes;

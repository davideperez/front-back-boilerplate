import { Route } from "react-router-dom";

import MainLayout from "@/components/Main/MainLayout";

import { Dashboard } from "@/pages/Dashboard";

import { FoldersPage } from "@/pages/folders/FoldersPage";
import { FolderPage } from "@/pages/folders/FolderPage";

import { FilePage } from "@/pages/files/FilePage";

import { MyProfilePage } from "@/pages/users/MyProfilePage";
import { UserPage } from "@/pages/users/UserPage";
import { UsersPage } from "@/pages/users/UsersPage";

import { SettingsPage } from "@/pages/SettingsPage";

const ProtectedRoutes = () => (
    <>
        <Route path="/" element ={<MainLayout />}>
            <Route index element ={<Dashboard />} />

            <Route path="folders" element ={<FoldersPage />} />
            <Route path="folder:id" element ={<FolderPage />} />
            
            <Route path="file:id" element ={<FilePage />} />
            
            <Route path="my-profile" element ={<MyProfilePage />} />
            <Route path="users" element ={<UsersPage />} />
            <Route path="user:id" element ={<UserPage />} />
            <Route path="settings" element ={<SettingsPage />} />
        </Route>
    </>
)

export default ProtectedRoutes;
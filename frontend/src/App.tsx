import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './components/ui/theme-provider';

import { Dashboard } from './pages/Dashboard';

import { RegisterPage } from './pages/auth/RegisterPage';
import { LoginPage } from './pages/auth/LoginPage';
import { UsersPage } from './pages/users/UsersPage';
import { UserPage } from './pages/users/UserPage';
import { MyProfilePage } from './pages/users/MyProfilePage';

import { FolderPage } from './pages/folders/FolderPage';
import { FoldersPage } from './pages/folders/FoldersPage';

import { FilePage } from './pages/files/FilePage';

import { SettingsPage } from './pages/SettingsPage';
import MainLayout from './components/Main/MainLayout';

const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						{/* Public Routes */}
						<Route path="register" element={<RegisterPage />}/>
						<Route path="login" element ={<LoginPage />} />
						
						{/* Protected Routes */}
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
					</Routes>
				</BrowserRouter>
		</ThemeProvider>
)};

export default App;
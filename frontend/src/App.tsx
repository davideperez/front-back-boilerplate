import './index.css';
import React from 'react';

import AppRoutes from './routes/_index';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store/store';
import { Provider } from 'react-redux';

import { ThemeProvider } from './components/ui/theme-provider';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	)
};

export default App;
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './components/ui/theme-provider';

import AppRoutes from './routes/_index';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
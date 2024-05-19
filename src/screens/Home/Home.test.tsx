import { fireEvent, render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import i18n from '@/translations';

import Home from './Home';

describe('Home screen should render correctly', () => {
	let storage: MMKV;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: Infinity,
			},
			mutations: {
				gcTime: Infinity,
			},
		},
	});

	beforeAll(() => {
		storage = new MMKV();
	});
});

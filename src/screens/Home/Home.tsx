import { useEffect, useState } from 'react';
import {
	View,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { TreeView } from '@/components/tree-view';

function Home() {
	const { t } = useTranslation(['example', 'welcome']);


	return (
		<SafeScreen>
			<ScrollView>
				<TreeView />
			</ScrollView>
		</SafeScreen>
	);
}

export default Home;

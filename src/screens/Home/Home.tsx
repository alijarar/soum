import {
	ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { TreeView } from '@/components/tree-view';

function Home() {
	const { t } = useTranslation(['example', 'welcome']);


	return (
		<SafeScreen>
			<ScrollView testID="scroll-view">
				<TreeView testID="tree-view" />
			</ScrollView>
		</SafeScreen>
	);
}

export default Home;

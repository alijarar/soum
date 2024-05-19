import { SafeAreaView } from 'react-native';

import type { PropsWithChildren } from 'react';

function SafeScreen({ children }: PropsWithChildren) {

	return (
		<SafeAreaView
			style={{flex:1}}
		>
			{children}
		</SafeAreaView>
	);
}

export default SafeScreen;

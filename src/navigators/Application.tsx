import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from '@/screens';

import type { ApplicationStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;

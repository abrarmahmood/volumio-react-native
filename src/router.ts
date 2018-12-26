import {
    createStackNavigator,
    createAppContainer,
    NavigationScreenProp,
    NavigationParams,
} from "react-navigation";

import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';
import PlayScreen from './screens/Play';


const routes = {
    Home: {
        screen: HomeScreen
    },
    Browse: {
        screen: BrowseScreen
    },
    Play: {
        screen: PlayScreen
    },
};

const routeConfig = {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => {
        return {
            headerStyle: { backgroundColor: '#191919' },
            headerTitleStyle: { color: 'white' },
        }
    }
};

const AppNavigator = createStackNavigator(routes, routeConfig);

export const AppContainer = createAppContainer(AppNavigator);

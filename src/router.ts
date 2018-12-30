import {
    createStackNavigator,
    createAppContainer,
    StackNavigatorConfig,
    NavigationRouteConfigMap,
} from "react-navigation";

import HomeScreen from './screens/Home';
import BrowseScreen from './screens/Browse';
import PlayScreen from './screens/Play';
import QueueScreen from './screens/Queue';


const routes: NavigationRouteConfigMap = {
    Home: {
        screen: HomeScreen
    },
    Browse: {
        screen: BrowseScreen
    },
    Play: {
        screen: PlayScreen
    },
    Queue: {
        screen: QueueScreen
    },
};

const routeConfig: StackNavigatorConfig = {
    initialRouteName: "Home",
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#191919' },
        headerTitleStyle: { color: 'white' },
    }
};

const AppNavigator = createStackNavigator(routes, routeConfig);

export const AppContainer = createAppContainer(AppNavigator);

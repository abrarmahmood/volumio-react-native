import {
    createStackNavigator,
    createAppContainer,
    StackNavigatorConfig,
    NavigationRouteConfigMap,
} from "react-navigation";

import HomeScreen from './screens/Home';
import FoldersScreen from './screens/Folders';
import TracksScreen from './screens/Tracks';
import PlayScreen from './screens/Play';
import QueueScreen from './screens/Queue';
import SearchScreen from './screens/Search';


const routes: NavigationRouteConfigMap = {
    Home: {
        screen: HomeScreen
    },
    Folders: {
        screen: FoldersScreen
    },
    Tracks: {
        screen: TracksScreen
    },
    Play: {
        screen: PlayScreen
    },
    Queue: {
        screen: QueueScreen
    },
    Search: {
        screen: SearchScreen
    },
};

const routeConfig: StackNavigatorConfig = {
    initialRouteName: "Home",
    defaultNavigationOptions: {
        // headerStyle: { backgroundColor: '#191919' },
        // headerTitleStyle: { color: 'white' },
        header: null,
    }
};

const AppNavigator = createStackNavigator(routes, routeConfig);

export const AppContainer = createAppContainer(AppNavigator);

export const getRouteDebugInfo = (routeInfo: any) => {
    try {
        return {
            name: routeInfo.routes[routeInfo.index].routeName,
            params: routeInfo.routes[routeInfo.index].params,
            state: routeInfo.routes[routeInfo.index].params.state,
        }
    } catch (e) {
        return {
            name: routeInfo.routes[routeInfo.index].routeName,
            params: routeInfo.routes[routeInfo.index].params,
            state: undefined,
        }
    }
}
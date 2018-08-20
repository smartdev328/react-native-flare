import { Component } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';

import { BLUETOOTH_LISTENING } from './constants';
import { configureStore } from './store/index';
import * as actions from './actions/index';
import BleManager from './bits/BleManager';
import Colors from './bits/Colors';
import FlareNavBar from './bits/FlareNavBar';
import initialState from './reducers/initialState';
import registerScreens from './screens/index';

console.disableYellowBox = true;
let store = null;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.currentRoot = 'uninitialized';
        Navigation.registerComponent('com.flarejewelry.FlareNavBar', () => FlareNavBar);
        this.bleManager = new BleManager();
        store = configureStore(initialState);

        persistStore(store, null, () => {
            registerScreens(store, Provider);
            store.subscribe(this.onStoreUpdate.bind(this));
            const { root } = store.getState().nav;
            store.dispatch(actions.initializeApp(root));
        });
    }

    onStoreUpdate() {
        const { root } = store.getState().nav;
        if (this.currentRoot !== root) {
            console.debug(`Store update -- new root ${root}, current root ${this.currentRoot}`);
            this.currentRoot = root;
            this.startApp(root);
        }
        if (BLUETOOTH_LISTENING && !this.bleManager.isListening()) {
            this.bleManager.startListening({
                store,
            });
        } else if (!BLUETOOTH_LISTENING) {
            console.warn('Bluetooth is disabled in this environment.');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    startApp(root) {
        switch (root) {
        case 'secure':
            console.debug('Starting secure root.');
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Home',
                },
                drawer: {
                    left: {
                        screen: 'LeftDrawer',
                        disableOpenGesture: true,
                        fixedWidth: 500,
                    },
                },
                animationType: 'fade',
                appStyle: {
                    orientation: 'portrait',
                },
            });
            break;
        default:
            console.debug('Starting insecure root.');
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'SignIn',
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
                animationType: 'fade',
                appStyle: {
                    orientation: 'portrait',
                },
            });
            break;
        }
    }
}

import { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import BackgroundTimer from 'react-native-background-timer';

import { BLUETOOTH_LISTENING } from './constants';
import { configureStore } from './store/index';
import * as actions from './actions/index';
import BleManager from './bits/BleManager';
import Colors from './bits/Colors';
import FlareNavBar from './bits/FlareNavBar';
import { iconsMap } from './bits/AppIcons';
import initialState from './reducers/initialState';
import registerScreens from './screens/index';
import NotificationManager from './bits/NotificationManager';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
let store = null;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.currentRoot = 'uninitialized';
        Navigation.registerComponent('com.flarejewelry.FlareNavBar', () => FlareNavBar);
        store = configureStore(initialState);
        this.notificationManager = new NotificationManager();
        this.bleManager = new BleManager({
            store,
        });

        axios.interceptors.response.use(
            response => response,
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    this.bleManager.shutdown();
                    store.dispatch(actions.signOut());
                }
                return Promise.reject(error);
            },
        );

        persistStore(store, null, () => {
            registerScreens(store, Provider);
            store.subscribe(this.onStoreUpdate.bind(this));
            const { root } = store.getState().nav;
            store.dispatch(actions.initializeApp(root));
        });
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    onStoreUpdate() {
        const { root } = store.getState().nav;
        if (this.currentRoot !== root) {
            // eslint-disable-next-line no-console
            console.debug(`NAVIGATION -- new root ${root}, current root ${this.currentRoot}`);
            this.currentRoot = root;

            const secureRoots = ['secure', 'secure-jewelry', 'secure-manufacturing', 'secure-onboarding'];

            if (secureRoots.indexOf(root) !== -1 && BLUETOOTH_LISTENING && !this.bleManager.isListening()) {
                this.bleManager.startListening({
                    store,
                });
            } else {
                BackgroundTimer.stopBackgroundTimer();
            }

            this.startApp(root);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    startApp(root) {
        switch (root) {
        case 'secure':
            // eslint-disable-next-line no-console
            console.debug('Starting secure root.');
            Navigation.setDefaultOptions({
                topBar: {
                    leftButtons: [{
                        id: 'menuButton',
                        icon: iconsMap.menu,
                        color: Colors.theme.purple,
                    }],
                    title: {
                        component: {
                            name: 'com.flarejewelry.app.FlareNavBar',
                            alignment: 'center',
                        },
                    },
                },
            });
            Navigation.setRoot({
                root: {
                    sideMenu: {
                        left: {
                            component: {
                                name: 'com.flarejewelry.app.LeftDrawer',
                                passProps: {
                                    bleManager: this.bleManager,
                                },
                            },
                        },
                        center: {
                            stack: {
                                id: 'MAIN_UI_STACK',
                                children: [
                                    {
                                        component: {
                                            name: 'com.flarejewelry.app.Home',
                                            passProps: {
                                                bleManager: this.bleManager,
                                                notificationManager: this.notificationManager,
                                                handleBeacon: (dispatch, token, beacon, position) =>
                                                    this.bleManager.handleBeacon(dispatch, token, beacon, position),
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            });
            break;
        case 'secure-jewelry':
            Navigation.setDefaultOptions({
                topBar: {
                    leftButtons: [{
                        id: 'menuButton',
                        icon: iconsMap.menu,
                        color: Colors.theme.purple,
                    }],
                    title: {
                        component: {
                            name: 'com.flarejewelry.app.FlareNavBar',
                            alignment: 'center',
                        },
                    },
                },
            });
            Navigation.setRoot({
                root: {
                    sideMenu: {
                        left: {
                            component: {
                                name: 'com.flarejewelry.app.LeftDrawer',
                                passProps: {
                                    bleManager: this.bleManager,
                                },
                            },
                        },
                        center: {
                            stack: {
                                id: 'JEWELRY_STACK',
                                options: {
                                    topBar: {
                                        visible: false,
                                    },
                                },
                                children: [{
                                    component: {
                                        name: 'com.flarejewelry.app.Jewelry',
                                        passProps: {
                                            bleManager: this.bleManager,
                                        },
                                    },
                                }],
                            },
                        },
                    },
                },
            });
            break;
        case 'secure-manufacturing':
            Navigation.setRoot({
                root: {
                    stack: {
                        id: 'MANUFACTURING_STACK',
                        options: {
                            topBar: {
                                visible: false,
                            },
                        },
                        children: [{
                            component: {
                                name: 'com.flarejewelry.manufacturing.main',
                                passProps: {
                                    bleManager: this.bleManager,
                                },
                            },
                        }],
                    },
                },
            });
            break;
        case 'secure-onboarding':
            console.debug('Starting onboarding root.');
            Navigation.setRoot({
                root: {
                    stack: {
                        id: 'ONBOARDING',
                        options: {
                            topBar: {
                                visible: false,
                            },
                        },
                        children: [{
                            component: {
                                name: 'com.flarejewelry.onboarding.main',
                                passProps: {
                                    bleManager: this.bleManager,
                                },
                            },
                        }],
                    },
                },
            });
            break;
        default:
            // eslint-disable-next-line no-console
            console.debug('Starting insecure root.');
            Navigation.setRoot({
                root: {
                    stack: {
                        children: [{
                            component: {
                                name: 'com.flarejewelry.app.SignIn',
                                options: {
                                    topBar: {
                                        visible: false,
                                        animate: false,
                                    },
                                },
                                passProps: {
                                    notificationManager: this.notificationManager,
                                },
                            },
                        }],
                    },
                },
            });
            break;
        }
    }
}

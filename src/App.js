import { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import { Client } from 'bugsnag-react-native';
import RNLocation from 'react-native-location';

import { LEFT_NAVIGATION_WIDTH } from './constants/Config';
import { configureStore } from './store/index';

import BleProvider from './bits/BleProvider';
import * as actions from './actions/index';
import Colors from './bits/Colors';
import initialState from './reducers/initialState';
import registerScreens from './screens/index';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
let store = null;
export const bugsnag = new Client('a48fda6bc569b8e593d7cf2fe3b6a49c');

RNLocation.configure({
    allowsBackgroundLocationUpdates: true,
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.currentRoot = 'uninitialized';
        store = configureStore(initialState);
        this.bleProvider = new BleProvider({ store });

        axios.interceptors.response.use(
            response => response,
            error => {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    store.dispatch(actions.signOut());
                }
                return Promise.reject(error);
            }
        );

        persistStore(store, null, () => {
            registerScreens(store, Provider);
            store.subscribe(this.onStoreUpdate.bind(this));
            const { root } = store.getState().nav;
            store.dispatch(actions.initializeApp(root));
            this.bleProvider.setStore(store);
        });
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    onStoreUpdate() {
        const { root } = store.getState().nav;
        if (this.currentRoot !== root) {
            // eslint-disable-next-line no-console
            console.debug(
                `NAVIGATION -- new root ${root}, current root ${this.currentRoot}`
            );
            this.currentRoot = root;
            this.bleProvider.setStore(store);
            this.startApp(root);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    startApp(root) {
        // eslint-disable-next-line no-console
        console.info(`Starting root ${root}.`);
        switch (root) {
            case 'secure':
                // eslint-disable-next-line no-console
                console.debug('Starting secure root.');
                Navigation.setRoot({
                    root: {
                        sideMenu: {
                            left: {
                                component: {
                                    name: 'com.flarejewelry.app.LeftDrawer',
                                },
                            },
                            center: {
                                stack: {
                                    id: 'MAIN_UI_STACK',
                                    children: [
                                        {
                                            component: {
                                                name:
                                                    'com.flarejewelry.app.Home',
                                                options: {
                                                    topBar: {
                                                        background: {
                                                            color:
                                                                'transparent',
                                                        },
                                                        leftButtonColor:
                                                            Colors.theme.cream,
                                                        drawBehind: true,
                                                        noBorder: true,
                                                        leftButtons: [
                                                            {
                                                                id:
                                                                    'menuButton',
                                                                // eslint-disable-next-line
                                                                icon: require('./assets/menu-icon.png'),
                                                            },
                                                        ],
                                                        title: {
                                                            component: {
                                                                name:
                                                                    'com.flarejewelry.app.FlareNavBar',
                                                                alignment:
                                                                    'center',
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                            options: {
                                sideMenu: {
                                    animationType: 'slide',
                                },
                                topBar: {
                                    noBorder: true,
                                },
                            },
                        },
                    },
                });
                break;
            case 'secure-jewelry':
                Navigation.setDefaultOptions({
                    topBar: {
                        background: {
                            color: Colors.theme.cream,
                            translucent: false,
                        },
                        leftButtons: [
                            {
                                id: 'menuButton',
                                icon: require('./assets/menu-icon.png'),
                                color: Colors.black,
                            },
                        ],
                        title: {
                            component: {
                                name: 'com.flarejewelry.app.FlareNavBar',
                                alignment: 'center',
                            },
                        },
                        noBorder: true,
                    },
                });
                Navigation.setRoot({
                    root: {
                        sideMenu: {
                            left: {
                                component: {
                                    name: 'com.flarejewelry.app.LeftDrawer',
                                },
                            },
                            center: {
                                stack: {
                                    id: 'JEWELRY_STACK',
                                    children: [
                                        {
                                            component: {
                                                name:
                                                    'com.flarejewelry.app.Jewelry',
                                            },
                                        },
                                    ],
                                },
                            },
                            options: {
                                sideMenu: {
                                    left: {
                                        width: LEFT_NAVIGATION_WIDTH,
                                    },
                                },
                                topBar: {
                                    noBorder: true,
                                },
                            },
                        },
                    },
                });
                break;
            case 'secure-active-event':
                Navigation.setRoot({
                    root: {
                        stack: {
                            id: 'ACTIVE_EVENT_STACK',
                            options: {
                                topBar: {
                                    visible: false,
                                },
                            },
                            children: [
                                {
                                    component: {
                                        name: 'com.flarejewelry.app.HomeActive',
                                    },
                                },
                            ],
                        },
                    },
                });
                break;
            case 'secure-settings':
                Navigation.setDefaultOptions({
                    topBar: {
                        background: {
                            color: Colors.theme.cream,
                            translucent: false,
                        },
                        leftButtons: [
                            {
                                id: 'menuButton',
                                icon: require('./assets/menu-icon.png'),
                                color: Colors.black,
                            },
                        ],
                        title: {
                            component: {
                                name: 'com.flarejewelry.app.FlareNavBar',
                                alignment: 'center',
                            },
                        },
                        noBorder: true,
                    },
                });
                Navigation.setRoot({
                    root: {
                        sideMenu: {
                            left: {
                                component: {
                                    name: 'com.flarejewelry.app.LeftDrawer',
                                },
                            },
                            center: {
                                stack: {
                                    id: 'SETTINGS_STACK',
                                    children: [
                                        {
                                            component: {
                                                name:
                                                    'com.flarejewelry.app.Settings',
                                            },
                                        },
                                    ],
                                },
                            },
                            options: {
                                sideMenu: {
                                    left: {
                                        width: LEFT_NAVIGATION_WIDTH,
                                    },
                                },
                                topBar: {
                                    noBorder: true,
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
                            children: [
                                {
                                    component: {
                                        name:
                                            'com.flarejewelry.manufacturing.main',
                                    },
                                },
                            ],
                        },
                    },
                });
                break;
            case 'secure-onboarding':
                Navigation.setRoot({
                    root: {
                        stack: {
                            id: 'ONBOARDING',
                            options: {
                                topBar: {
                                    visible: false,
                                },
                            },
                            children: [
                                {
                                    component: {
                                        name:
                                            'com.flarejewelry.onboarding.main',
                                    },
                                },
                            ],
                        },
                    },
                });
                break;
            default:
                // eslint-disable-next-line no-console
                console.debug('Root is not secure.');
                Navigation.setRoot({
                    root: {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name:
                                            'com.flarejewelry.onboarding.main',
                                        options: {
                                            topBar: {
                                                visible: false,
                                                animate: false,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
                break;
        }
    }
}

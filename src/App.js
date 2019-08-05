import { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';

import { LEFT_NAVIGATION_WIDTH } from './constants';
import { configureStore } from './store/index';
import { iconsMap } from './bits/AppIcons';
import BleProvider from './bits/BleProvider';
import * as actions from './actions/index';
import Colors from './bits/Colors';
import FlareNavBar from './bits/FlareNavBar';
import initialState from './reducers/initialState';
import registerScreens from './screens/index';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
let store = null;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.currentRoot = 'uninitialized';
        Navigation.registerComponent('com.flarejewelry.FlareNavBar', () => FlareNavBar);
        store = configureStore(initialState);
        this.bleProvider = new BleProvider({ store });

        axios.interceptors.response.use(
            response => response,
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
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
            console.debug(`NAVIGATION -- new root ${root}, current root ${this.currentRoot}`);
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
            Navigation.setDefaultOptions({
                topBar: {
                    background: {
                        color: Colors.theme.cream,
                        translucent: false,
                    },
                    noBorder: true,
                    leftButtons: [
                        {
                            id: 'menuButton',
                            icon: iconsMap.menu,
                            color: Colors.black,
                        },
                    ],
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
                            },
                        },
                        center: {
                            stack: {
                                id: 'MAIN_UI_STACK',
                                children: [
                                    {
                                        component: {
                                            name: 'com.flarejewelry.app.Home',
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
                            icon: iconsMap.menu,
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
                                            name: 'com.flarejewelry.app.Jewelry',
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
                            icon: iconsMap.menu,
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
                                            name: 'com.flarejewelry.app.Settings',
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
                                    name: 'com.flarejewelry.manufacturing.main',
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
                                    name: 'com.flarejewelry.onboarding.main',
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
                                    name: 'com.flarejewelry.app.SignIn',
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

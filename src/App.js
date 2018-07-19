import { Component } from 'react';
import { Provider } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import initialState from './reducers/initialState';
import registerScreens from './screens/index';
import * as actions from './actions/index';
import { configureStore } from './store/index';

import Colors from './bits/Colors';
import FlareNavBar from './bits/FlareNavBar';

console.disableYellowBox = true;
let store = null;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.currentRoot = 'uninitialized';

        Navigation.registerComponent('com.flarejewelry.FlareNavBar', () => FlareNavBar);
        store = configureStore(initialState);
        persistStore(store, null, () => {
            registerScreens(store, Provider);
            store.subscribe(this.onStoreUpdate.bind(this));
            store.dispatch(actions.initializeApp());
        });
    }

    onStoreUpdate() {
        const { root } = store.getState().nav;
        console.debug(`Store update -- new root ${root}, current root ${this.currentRoot}`);
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root);
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
                    navigatorStyle: {
                        navBarCustomViewInitialProps: {},
                        navBarBackgroundColor: Colors.theme.purple,
                        navBarCustomView: 'com.flarejewelry.FlareNavBar',
                        navBarComponentAlignment: 'fill',
                    },
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
            });
            break;
        }
    }

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         lastBeacon: null,
    //         hasActiveFlare: false,
    //         devices: [],
    //         crews: [],
    //     };

    //     const boundDetectedMethod = this.onBeaconDetected.bind(this);
    //     BleManager.startListening({
    //         onBeaconDetected: beacon => boundDetectedMethod(beacon),
    //     });
    // }

    // componentDidMount() {
    //     this.checkDevicesFromLocalStorage();
    //     this.loadCrewsFromLocalStorage();
    // }

    // async onCancelFlare() {
    //     await AsyncStorage.setItem('hasActiveFlare', 'no');
    //     this.setState({
    //         hasActiveFlare: false,
    //     });
    // }

    // onBeaconDetected(beacon) {
    //     console.log(`Processing beacon from device ID ${beacon.deviceID}
    //         with my devices ${JSON.stringify(this.state.devices)}.`);

    //     switch (beacon.type) {
    //     case BeaconTypes.Short.name:
    //         flareAPI.call(beacon)
    //             .catch((status) => {
    //                 if (status === 401 || status === 403) {
    //                     App.signOut();
    //                 }
    //             });
    //         break;
    //     case BeaconTypes.Long.name:
    //         flareAPI.flare(beacon)
    //             .then((response) => {
    //                 console.log(`Started flare: ${response}`);
    //                 AsyncStorage.setItem('hasActiveFlare', 'yes');
    //                 this.setState({
    //                     hasActiveFlare: true,
    //                 });
    //             })
    //             .catch((status) => {
    //                 if (status === 401 || status === 403) {
    //                     // App.signOut();
    //                 }
    //             });
    //         break;
    //     case BeaconTypes.Checkin.name:
    //         flareAPI.checkin(beacon)
    //             .catch((status) => {
    //                 if (status === 401 || status === 403) {
    //                     App.signOut();
    //                 }
    //             });
    //         break;
    //     default:
    //         console.warn(`Unrecognized beacon type ${beacon.type}`);
    //         break;
    //     }

    //     this.setState({
    //         lastBeacon: beacon,
    //     });
    // }

    // async checkDevicesFromLocalStorage() {
    //     AsyncStorage.getItem('devices').then((devicesAsString) => {
    //         const devices = JSON.parse(devicesAsString);
    //         if (typeof devices === 'undefined' || devices === null) {
    //             console.debug('Retrieved invalid list of devices from storage.');
    //             return;
    //         }
    //         this.setState({
    //             devices,
    //         });
    //     });
    // }

    // async loadCrewsFromLocalStorage() {
    //     AsyncStorage.getItem('crews').then((crewsAsString) => {
    //         const crews = JSON.parse(crewsAsString);
    //         if (typeof crews === 'undefined' || crews === null) {
    //             console.debug('Retrieved invalid list of devices from storage.');
    //             return;
    //         }
    //         this.setState({
    //             crews,
    //         });
    //     });
    // }

    // async checkForActiveFlare() {
    //     const hasActiveFlare = await AsyncStorage.getItem('hasActiveFlare');
    //     this.setState({
    //         hasActiveFlare: hasActiveFlare === 'yes',
    //     });
    //     this.checkDevicesFromLocalStorage();
    // }

    // render() {
    //     return (
    //         <AuthenticatedAppStack
    //             screenProps={{
    //                 lastBeacon: this.state.lastBeacon,
    //                 devices: this.state.devices,
    //                 crews: this.state.crews,
    //                 flareAPI,
    //                 hasActiveFlare: this.state.hasActiveFlare,
    //                 onCancelFlare: () => this.onCancelFlare(),
    //                 checkForActiveFlare: () => this.checkForActiveFlare(),
    //             }}
    //         />
    //     );
    // }
}

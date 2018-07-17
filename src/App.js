import { Component } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import registerScreens from './screens/index';
import * as reducers from './reducers/index';
import * as actions from './actions/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
registerScreens(store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(actions.initializeApp());
    }

    onStoreUpdate() {
        const { root } = store.getState().root;
        if (this.currentRoot != root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    startApp(root) {
        switch (root) {
        case 'login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'SignIn',
                    title: 'Welcome',
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                    navigatorButtons: {},
                },
            });
            break;
        case 'after-login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Home',
                    title: 'Get Shit Done',
                    navigatorStyle: {},
                    navigatorButtons: {},
                    overrideBackPress: false,
                },
            });
            break;
        default:
            console.warn('Invalid root.');
            break;
        }
    }

    // static signOut() {
    //     flareAPI.resetAuthentication();
    // }

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

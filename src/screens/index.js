import { Navigation } from 'react-native-navigation';
import Contacts from './Contacts';
import FlareNavBar from '../bits/FlareNavBar';
import Home from './Home';
import LeftDrawer from './LeftDrawer';
import PinCheck from './PinCheck';
import Settings from './Settings';
import SignIn from './SignIn';

export default (store, Provider) => {
    Navigation.registerComponentWithRedux('com.flarejewelry.app.SignIn', () => SignIn, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Home', () => Home, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Contacts', () => Contacts, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.LeftDrawer', () => LeftDrawer, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.PinCheck', () => PinCheck, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.FlareNavBar', () => FlareNavBar, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Settings', () => Settings, Provider, store);
};

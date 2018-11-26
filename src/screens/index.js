import { Navigation } from 'react-native-navigation';
import AddContacts from './AddContacts';
import Home from './Home';
import LeftDrawer from './LeftDrawer';
import PinCheck from './PinCheck';
import Settings from './Settings';
import SignIn from './SignIn';

export default (store, Provider) => {
    Navigation.registerComponent('SignIn', () => SignIn, store, Provider);
    Navigation.registerComponent('Home', () => Home, store, Provider);
    Navigation.registerComponent('AddContacts', () => AddContacts, store, Provider);
    Navigation.registerComponent('LeftDrawer', () => LeftDrawer, store, Provider);
    Navigation.registerComponent('PinCheck', () => PinCheck, store, Provider);
    Navigation.registerComponent('Settings', () => Settings, store, Provider);
};

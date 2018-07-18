import { Navigation } from 'react-native-navigation';
import AddContacts from './AddContacts';
import AuthLoading from './AuthLoading';
import Home from './Home';
import PinCheck from './PinCheck';
import SignIn from './SignIn';

export default (store, Provider) => {
    Navigation.registerComponent('SignIn', () => SignIn, store, Provider);
    Navigation.registerComponent('Home', () => Home, store, Provider);
    Navigation.registerComponent('AddContacts', () => AddContacts, store, Provider);
    Navigation.registerComponent('AuthLoading', () => AuthLoading, store, Provider);
    Navigation.registerComponent('PinCheck', () => PinCheck, store, Provider);
};

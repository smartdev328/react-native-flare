import { Navigation } from 'react-native-navigation';
import AddJewelry from './AddJewelry';
import AddJewelryConfirm from './AddJewelryConfirm';
import AddJewelryManual from './AddJewelryManual';
import Confirm from './Confirm';
import Contacts from './Contacts';
import FlareNavBar from '../bits/FlareNavBar';
import Home from './Home';
import Jewelry from './Jewelry';
import ManufacturingMain from './ManufacturingMain';
import LeftDrawer from './LeftDrawer';
import PinCheck from './PinCheck';
import Settings from './Settings';
import SignIn from './SignIn';

import { MANUFACTURING_MODE_ENABLED } from '../constants';

export default (store, Provider) => {
    Navigation.registerComponentWithRedux('com.flarejewelry.app.AddJewelry', () => AddJewelry, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.AddJewelryConfirm', () => AddJewelryConfirm, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.AddJewelryManual', () => AddJewelryManual, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Confirm', () => Confirm, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Contacts', () => Contacts, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.FlareNavBar', () => FlareNavBar, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Home', () => Home, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Jewelry', () => Jewelry, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.LeftDrawer', () => LeftDrawer, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.PinCheck', () => PinCheck, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.Settings', () => Settings, Provider, store);
    Navigation.registerComponentWithRedux('com.flarejewelry.app.SignIn', () => SignIn, Provider, store);
    if (MANUFACTURING_MODE_ENABLED) {
        Navigation.registerComponentWithRedux('com.flarejewelry.manufacturing.main', () => ManufacturingMain, Provider, store);
    }
};

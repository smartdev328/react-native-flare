import { Navigation } from 'react-native-navigation';
import AddJewelry from './AddJewelry';
import AddJewelryConfirm from './AddJewelryConfirm';
import AddJewelryManual from './AddJewelryManual';
import Confirm from './Confirm';
import Contacts from './Contacts';
import FlareNavBar from '../bits/FlareNavBar';
import Home from './Home';
import HomeActive from './HomeActive';
import Jewelry from './Jewelry';
import ManufacturingMain from './ManufacturingMain';
import LeftDrawer from './LeftDrawer';
import Onboarding from './Onboarding';
import PinCheck from './PinCheck';
import Register from './Register';
import Register2 from './Register2';
import Root from './Root';
import {
    Account,
    Call as SettingsCall,
    Home as Settings,
    Notifications as SetttingsNotifications,
} from './settings';
import SignIn from './SignIn';
import AddHardware from './AddHardware';
import HowToConnect from './AddHardware/HowToConnect';

import { MANUFACTURING_MODE_ENABLED } from '../constants/Config';
import AboutPermissions from './AddHardware/AboutPermissions';
import Scenarios from './Scenarios';
import PermissionsReminder from './Home/PermissionsReminder';

export default (store, Provider) => {
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.AddJewelry',
        () => AddJewelry,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.AddJewelryConfirm',
        () => AddJewelryConfirm,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.AddJewelryManual',
        () => AddJewelryManual,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Confirm',
        () => Confirm,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Contacts',
        () => Contacts,
        Provider,
        store
    );
    Navigation.registerComponent(
        'com.flarejewelry.app.FlareNavBar',
        () => FlareNavBar
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Home',
        () => Home,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.HomeActive',
        () => HomeActive,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.PermissionsReminder',
        () => PermissionsReminder,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Jewelry',
        () => Jewelry,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.LeftDrawer',
        () => LeftDrawer,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.PinCheck',
        () => PinCheck,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Register',
        () => Register,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Register2',
        () => Register2,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.Root',
        () => Root,
        Provider,
        store
    );
    Navigation.registerComponent(
        'com.flarejewelry.app.Settings',
        () => Settings
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.settings.Account',
        () => Account,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.settings.Call',
        () => SettingsCall,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.settings.Notifications',
        () => SetttingsNotifications,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.app.SignIn',
        () => SignIn,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.onboarding.main',
        () => Onboarding,
        Provider,
        store
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.onboarding.addhardware',
        () => AddHardware,
        Provider,
        store
    );
    Navigation.registerComponent(
        'com.flarejewelry.onboarding.addhardware.howtoconnect',
        () => HowToConnect
    );
    Navigation.registerComponent(
        'com.flarejewelry.onboarding.addhardware.aboutpermissions',
        () => AboutPermissions
    );
    Navigation.registerComponentWithRedux(
        'com.flarejewelry.scenarios',
        () => Scenarios,
        Provider,
        store
    );

    if (MANUFACTURING_MODE_ENABLED) {
        Navigation.registerComponentWithRedux(
            'com.flarejewelry.manufacturing.main',
            () => ManufacturingMain,
            Provider,
            store
        );
    }
};

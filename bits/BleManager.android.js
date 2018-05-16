import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    PermissionsAndroid,
    AppState
} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { region } from './BleConstants';

export default class BleManager extends React.Component {
    constructor() {
        super();

        // Request for authorization while the app is open
        // Beacons.requestWhenInUseAuthorization();

        Beacons.startMonitoringForRegion(region);
        Beacons.startRangingBeaconsInRegion(region);

        // Beacons.startUpdatingLocation();

        // Listen for beacon changes
        const subscription = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            // data.region - The current region
            // data.region.identifier
            // data.region.uuid
        
            // data.beacons - Array of all beacons inside a region
            //  in the following structure:
            //    .uuid
            //    .major - The major version of a beacon
            //    .minor - The minor version of a beacon
            //    .rssi - Signal strength: RSSI value (between -100 and 0)
            //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
            //    .accuracy - The accuracy of a beacon
            const numBeacons = data.beacons.length;
            if (numBeacons > 0) {
                const lastBeacon = data.beacons[numBeacons-1];
                const uuid = lastBeacon.uuid.substring(0,7);
                const proximity = lastBeacon.proximity;
                const accuracy = lastBeacon.accuracy;
                this.setState({
                    lastDevice: 'Detected beacon: ' + uuid + ', proximity: ' + proximity + ', accuracy: ' + accuracy
                });
            }

        });        
    }
}
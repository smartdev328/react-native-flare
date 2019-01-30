import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Type from '../bits/Type';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.pink,
    },
    promptBackground: {
        marginBottom: Spacing.huge,
    },
    promptForeground: {
        fontSize: Type.size.medium,
        padding: Spacing.medium,
    },
    scanningArea: {
        flex: 2,
    },
    buttonArea: {
        marginBottom: Spacing.medium,
    },
});

class AddJewelry extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            highestPressCount: {},
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { shortPressCounts } = props;
        const latestShortPress = shortPressCounts[0] || {};
        const { highestPressCount } = state;

        if (latestShortPress.deviceID !== highestPressCount.deviceID ||
            latestShortPress.count !== highestPressCount.count) {
            return {
                highestPressCount: latestShortPress,
            };
        }
        return null;
    }

    onPressManual() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.AddJewelryManual',
            },
        });
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.AddJewelry',
            },
        });
    }

    render() {
        // Choose an image based on the largest number of short presses we've received from any single device.
        // @see BeaconCache.getRecentShortPressCounts
        let image = '';
        switch (this.state.highestPressCount.count) {
        case 0:
            image = require('../assets/add-device-scanning-0.png');
            break;
        case 1:
            image = require('../assets/add-device-scanning-1.png');
            break;
        case 2:
            image = require('../assets/add-device-scanning-2.png');
            break;
        case 3:
        default:
            image = require('../assets/add-device-scanning-3.png');
            break;
        }
        return (
            <View style={styles.container}>
                <View style={styles.promptBackground}>
                    <Text style={styles.promptForeground}>
                        {Strings.jewelry.addNewAuto.prompt}
                    </Text>
                </View>
                <View style={styles.scanningArea}>
                    <Image
                        source={image}
                        style={styles.scanningImage}
                        resizeMode="stretch"
                    />
                </View>
                <View style={styles.buttonArea}>
                    <Button
                        onPress={() => this.onPressManual()}
                        title={Strings.jewelry.addNewManual.buttonLabel}
                        rounded
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        shortPressCounts: state.beacons.recentShortPressCounts,
    };
}

export default connect(mapStateToProps)(AddJewelry);

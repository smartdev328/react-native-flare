import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
        marginBottom: Spacing.small,
    },
});

export default class AddJewelry extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
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
        return (
            <View style={styles.container}>
                <View style={styles.promptBackground}>
                    <Text style={styles.promptForeground}>
                        {Strings.jewelry.addNewAuto.prompt}
                    </Text>
                </View>
                <View style={styles.scanningArea}>
                    <Image
                        source={require('../assets/add-device-scanning.png')}
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

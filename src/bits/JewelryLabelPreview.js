import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Spacing from './Spacing';
import Colors from './Colors';
import Strings from '../locales/en';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: Spacing.small,
        backgroundColor: Colors.black,
        height: 76,
        alignSelf: 'stretch',
    },
    icon: {
        flex: 1,
        padding: Spacing.small,
    },
    barCode: {
        width: 46,
        height: 46,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    details: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    detailsTop: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    detailsForeground: {
        color: Colors.white,
    },
    deviceID: {
        fontSize: Type.size.large + 2,
        textAlignVertical: 'bottom',
        letterSpacing: 1.2,
        marginRight: Spacing.tiny,
    },
    digits: {
        fontSize: Type.size.large + 5,
        textAlignVertical: 'bottom',
        letterSpacing: 1.4,
    },
    fccMessage: {
        fontSize: Type.size.medium - 6,
    },
    highlight: {
        borderColor: Colors.theme.pink,
        borderWidth: 2,
        paddingLeft: 2,
        paddingRight: 2,
    },
});

function JewelryLabelPreview(props) {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.icon}>
                <Image
                    source={require('../assets/barcode-youareloved.png')}
                    style={styles.barCode}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.detailsTop}>
                    <Text style={[styles.deviceID, styles.detailsForeground, props.circleDeviceID && styles.highlight]}>
                        {props.deviceID}
                    </Text>
                    <Text style={[styles.digits, styles.detailsForeground, props.circleTwoFactor && styles.highlight]}>
                        {Strings.jewelry.addNewConfirm.sampleDigits}
                    </Text>
                </View>
                <Text style={[styles.fccMessage, styles.detailsForeground]}>
                    {Strings.jewelry.addNewConfirm.fccMessage}
                </Text>
            </View>
        </View>
    );
}

export default JewelryLabelPreview;

import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../../bits/Colors';

import backwardArrow from '../../assets/backward-arrow.png';
import smallestAuraLogo from '../../assets/smallest-aura-logo.png';
import smallestWhiteLogo from '../../assets/smallest-white-logo.png';

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        height: 30,
        marginTop: 16,
        marginBottom: 26,
        paddingRight: 34,
        marginLeft: 32,
        marginRight: 32,
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    backArrowWrapper: {
        width: 34,
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    backArrow: {
        width: 34,
        resizeMode: 'center',
        flex: 1,
    },
    logo: {
        flex: 1,
        resizeMode: 'center',
    },
    tintBlack: {
        tintColor: Colors.black,
    },
    tintOffWhite: {
        tintColor: '#F8F5F1',
    },
});

const computeTintStyle = (black, offWhite) => {
    if (black) {
        return styles.tintBlack;
    } else if (offWhite) {
        return styles.tintOffWhite;
    } else {
        return undefined;
    }
};

const WhiteBar = ({
    goBack,
    showLogo = true,
    showBack = true,
    black = false,
    aura = false,
    offWhite = false,
}) => {
    const tintStyle = computeTintStyle(black, offWhite);
    return (
        <View style={styles.bar}>
            {showBack && (
                <TouchableOpacity
                    style={styles.backArrowWrapper}
                    onPress={goBack}
                >
                    <Image
                        source={backwardArrow}
                        style={[styles.backArrow, tintStyle]}
                    />
                </TouchableOpacity>
            )}
            {showLogo && (
                <Image
                    source={aura ? smallestAuraLogo : smallestWhiteLogo}
                    style={[styles.logo, tintStyle]}
                />
            )}
        </View>
    );
};

export default WhiteBar;

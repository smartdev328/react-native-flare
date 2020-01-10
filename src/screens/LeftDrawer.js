import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import * as navActions from '../actions/navActions';
import {
    AMBASSADOR_SIGNUP_URL,
    LEFT_NAVIGATION_WIDTH,
} from '../constants/Config';
import Aura from '../bits/Aura';
import Colors from '../bits/Colors';
import RandomImage from '../bits/RandomImage';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

import * as authActions from '../actions/authActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.backgrounds.pink,
        paddingTop: Spacing.small,
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
        paddingBottom: Spacing.small,
        width: LEFT_NAVIGATION_WIDTH,
    },
    menuItem: {
        paddingTop: Spacing.smallish,
        paddingBottom: Spacing.smallish,
        fontSize: Type.size.medium,
        color: Colors.white,
    },
    specialMenuItem: {
        borderWidth: 2,
        borderColor: Colors.white,
        color: Colors.white,
        marginTop: Spacing.large,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: Spacing.smallish,
        width: '85%',
        alignItems: 'flex-start',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    logo: {
        height: 48,
        width: 180,
        resizeMode: 'contain',
        marginTop: Spacing.small,
        padding: 0,
    },
    topImage: {
        width: 180,
        height: 300,
    },
});

const MenuItem = ({ onPress, label }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.menuItem}>{label}</Text>
    </TouchableOpacity>
);

const LeftDrawer = ({ changeAppRoot, signOut }) => {
    const handleHome = React.useCallback(() => {
        changeAppRoot('secure');
    }, [changeAppRoot]);

    const handleJewelry = React.useCallback(() => {
        changeAppRoot('secure-jewelry');
    }, [changeAppRoot]);

    const handleSettings = React.useCallback(() => {
        changeAppRoot('secure-settings');
    }, [changeAppRoot]);

    const ambassadorSignup = React.useCallback(() => {
        Linking.openURL(AMBASSADOR_SIGNUP_URL);
    }, []);

    return (
        <View style={styles.container}>
            <Aura />
            <Image source={{ uri: 'logo-aura' }} style={styles.logo} />
            <RandomImage
                sources={[
                    { uri: 'menu-photo-1' },
                    { uri: 'menu-photo-2' },
                    { uri: 'menu-photo-3' },
                ]}
                style={styles.topImage}
            />
            <View>
                <MenuItem
                    onPress={handleHome}
                    label={Strings.leftDrawer.home}
                />
                <MenuItem
                    onPress={handleJewelry}
                    label={Strings.leftDrawer.jewelry}
                />
                <MenuItem
                    onPress={handleSettings}
                    label={Strings.leftDrawer.settings}
                />
                <MenuItem onPress={signOut} label={Strings.generic.signOut} />
                <TouchableOpacity onPress={ambassadorSignup}>
                    <Text style={[styles.menuItem, styles.specialMenuItem]}>
                        {Strings.leftDrawer.ambassador}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    changeAppRoot: navActions.changeAppRoot,
    signOut: authActions.signOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftDrawer);

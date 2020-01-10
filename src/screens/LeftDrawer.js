import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context';

import * as navActions from '../actions/navActions';
import * as authActions from '../actions/authActions';
import { LEFT_NAVIGATION_WIDTH } from '../constants/Config';
import Colors from '../bits/Colors';
import RandomImage from '../bits/RandomImage';
import Strings from '../locales/en';

import iconCrew from '../assets/menu-item-crew.png';
import iconHome from '../assets/menu-item-home.png';
import iconProfile from '../assets/menu-item-profile.png';
import iconSettings from '../assets/menu-item-settings.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.black,
        paddingHorizontal: 32,
        width: LEFT_NAVIGATION_WIDTH,
    },
    menuItem: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 36,
        alignItems: 'center',
    },
    menuItemIcon: {
        width: 36,
        height: 36,
        resizeMode: 'center',
        marginRight: 12,
    },
    menuItemText: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 16,
        color: Colors.theme.cream,
    },
    topImage: {
        width: 180,
        height: 300,
        marginBottom: 'auto',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});

const MenuItem = ({ onPress, label, icon }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Image source={icon} style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
);

const LeftDrawer = ({ changeAppRoot, signOut }) => {
    const insets = useSafeArea();

    const handleHome = React.useCallback(() => {
        changeAppRoot('secure');
    }, [changeAppRoot]);

    const handleJewelry = React.useCallback(() => {
        changeAppRoot('secure-jewelry');
    }, [changeAppRoot]);

    const handleSettings = React.useCallback(() => {
        changeAppRoot('secure-settings');
    }, [changeAppRoot]);

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + 32,
                    paddingBottom: insets.bottom + 32,
                },
            ]}
        >
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
                    icon={iconHome}
                />
                <MenuItem
                    onPress={handleJewelry}
                    label="My Crew"
                    icon={iconCrew}
                />
                <MenuItem
                    onPress={handleSettings}
                    label={Strings.leftDrawer.settings}
                    icon={iconSettings}
                />
                <MenuItem
                    onPress={handleSettings}
                    label="My Account"
                    icon={iconProfile}
                />
            </View>
        </View>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    changeAppRoot: navActions.changeAppRoot,
    signOut: authActions.signOut,
};

const ConnectedLeftDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftDrawer);

const WrappedDrawer = ({ ...props }) => (
    <SafeAreaProvider>
        <ConnectedLeftDrawer {...props} />
    </SafeAreaProvider>
);

export default WrappedDrawer;

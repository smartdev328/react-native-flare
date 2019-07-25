import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { changeAppRoot } from '../actions';
import { AMBASSADOR_SIGNUP_URL, LEFT_NAVIGATION_WIDTH } from '../constants';
import Aura from '../bits/Aura';
import Colors from '../bits/Colors';
import RandomImage from '../bits/RandomImage';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

import { signOut } from '../actions/authActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.backgrounds.pink,
        paddingTop: Spacing.small,
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
        paddingBottom: Spacing.medium,
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
        marginVertical: Spacing.large,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: Spacing.smallish,
        width: '85%',
        alignItems: 'flex-start',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    logo: {
        height: 64,
        width: 180,
        resizeMode: 'contain',
        margin: 0,
        padding: 0,
    },
    topImage: {
        width: 180,
        height: 300,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class LeftDrawer extends React.Component {
    handleHome() {
        this.props.dispatch(changeAppRoot('secure'));
    }

    handleJewelry() {
        this.props.dispatch(changeAppRoot('secure-jewelry'));
    }

    handleSettings() {
        this.props.dispatch(changeAppRoot('secure-settings'));
    }

    handleSignOut() {
        this.props.dispatch(signOut());
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.LeftDrawer',
            },
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Aura />
                <Image source={{ uri: 'logo-aura.png' }} style={styles.logo} />
                <RandomImage
                    sources={[{ uri: 'menu-photo-1' }, { uri: 'menu-photo-2' }, { uri: 'menu-photo-3' }]}
                    style={styles.topImage}
                />
                <View>
                    <TouchableOpacity onPress={() => this.handleHome()}>
                        <Text style={styles.menuItem}>{Strings.leftDrawer.home}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleJewelry()}>
                        <Text style={styles.menuItem}>{Strings.leftDrawer.jewelry}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleSettings()}>
                        <Text style={styles.menuItem}>{Strings.leftDrawer.settings}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleSignOut()}>
                        <Text style={styles.menuItem}>{Strings.generic.signOut}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(AMBASSADOR_SIGNUP_URL)}>
                        <Text style={[styles.menuItem, styles.specialMenuItem]}>{Strings.leftDrawer.ambassador}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        cancelingActiveFlare: state.user.cancelingActiveFlare,
        hasActiveFlare: state.user.hasActiveFlare,
    };
}

export default connect(mapStateToProps)(LeftDrawer);

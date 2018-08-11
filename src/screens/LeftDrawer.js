import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

import { signOut } from '../actions/authActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.greyLight,
        padding: Spacing.medium,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class LeftDrawer extends React.Component {
    handleSignOut() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.handleSignOut()}>
                    <Text>{Strings.leftDrawer.signOut}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        cancelingActiveFlare: state.user.cancelingActiveFlare,
        hasActiveFlare: state.user.hasActiveFlare,
    };
}

export default connect(mapStateToProps)(LeftDrawer);

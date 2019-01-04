import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Button from '../bits/Button';
import Colors from '../bits/Colors';
import JewelryList from '../bits/JewelryList';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.medium,
    },
    buttonArea: {
        paddingTop: Spacing.small,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class Jewelry extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <JewelryList
                    jewelry={this.props.devices}
                />
                <View style={styles.buttonArea}>
                    <Button
                        rounded
                        primary
                        onPress={() => this.sendTestFlare()}
                        title={Strings.jewelry.addNew}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        devices: state.user.devices,
        loading: state.user.loadingDevices === 'requested',
    };
}

export default connect(mapStateToProps)(Jewelry);

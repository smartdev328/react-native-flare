import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import Button from '../bits/Button';
import JewelryList from '../bits/JewelryList';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

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

    addNewJewelry() {
        console.debug('Add new jewelry');
    }

    removeJewelry(deviceID) {
        console.debug(`Remove jewelry with deviceID ${deviceID}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <JewelryList
                    jewelry={this.props.devices}
                    onRemove={deviceID => this.removeJewelry(deviceID)}
                />
                <View style={styles.buttonArea}>
                    <Button
                        rounded
                        primary
                        onPress={() => this.addNewJewelry()}
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

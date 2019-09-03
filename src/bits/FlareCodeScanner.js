import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
// import RNCamera from 'react-native-camera';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    preview: {
        flex: 1,
        width: '100%',
    },
});

export default class FlareCodeScanner extends React.PureComponent {
    render() {
        return (
            <View style={this.props.containerStyle}>
                {/* <RNCamera
                    onBarCodeRead={e => this.props.onBarCodeRead(e)}
                    style={styles.preview}
                    permissionDialogTitle={Strings.jewelry.addNewManual.cameraPermissionTitle}
                    permissionDialogMessage={Strings.jewelry.addNewManual.cameraPermissionMessage}
                >
                    <View style={styles.preview} />
                </RNCamera> */}
            </View>
        );
    }
}

FlareCodeScanner.propTypes = {
    onBarCodeRead: PropTypes.func.isRequired,
};

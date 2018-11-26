import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';

import { summary as configSummary } from '../constants';
import Colors from '../bits/Colors';
import EnvironmentListing from '../bits/EnvironmentListing';

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
});

class Settings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <EnvironmentListing config={configSummary} />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Settings);

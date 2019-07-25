import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class Root extends React.PureComponent {
    render() {
        return <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>;
    }
}

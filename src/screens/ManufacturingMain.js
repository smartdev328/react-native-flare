import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Strings from '../locales/en';

const styles = StyleSheet.create({
});

export default class ManufacturingMain extends React.Component {
    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.manufacturing.main',
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>{Strings.manufacturing.title}</Text>
                </View>
            </View>
        );
    }
}

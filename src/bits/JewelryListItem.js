/* eslint global-require: "off" */
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { DeviceTypes } from './DeviceConstants';
import Colors from './Colors';
import FlareDeviceID from './FlareDeviceID';
import Spacing from './Spacing';
import Strings from '../locales/en';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.greyLight,
        paddingTop: Spacing.small,
        paddingBottom: Spacing.small,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 256,
    },
    image: {
        position: 'absolute',
        height: 215,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    label: {
        alignSelf: 'center',
    },
    labelBold: {
        fontWeight: 'bold',
    },
    labelText: {
        textAlign: 'center',
        fontSize: Type.size.medium,
    },
});

export default class JewelryListItem extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={DeviceTypes[this.props.item.type - 1].image}
                />
                <View style={styles.label}>
                    <Text style={[styles.labelText, styles.labelBold]}>
                        {Strings.jewelry[`cuffV${this.props.item.type}`].name}
                    </Text>
                    <FlareDeviceID
                        value={this.props.item.id}
                        style={styles.labelText}
                    />
                </View>
                <Button
                    onPress={() => this.saveCustomPrompt()}
                    title={Strings.jewelry.remove}
                    style={{ borderWidth: 1 }}
                />
            </View>
        );
    }
}

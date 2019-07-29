/* eslint global-require: "off" */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DeviceTypes } from './DeviceConstants';
import Button from './Button';
import Colors from './Colors';
import FlareDeviceID from './FlareDeviceID';
import Spacing from './Spacing';
import Strings from '../locales/en';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
        paddingTop: Spacing.small,
        paddingBottom: Spacing.huge,
    },
    imageContainer: {
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
        marginBottom: Spacing.small,
    },
    labelBold: {
        fontWeight: 'normal',
        fontSize: Type.size.large,
        marginTop: Spacing.medium,
        marginBottom: Spacing.small,
    },
    labelText: {
        textAlign: 'center',
        fontSize: Type.size.small,
    },
});

export default class JewelryListItem extends React.PureComponent {
    render() {
        return (
            <View style={styles.container} key={this.props.item.id}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={DeviceTypes[this.props.item.type - 1].image} />
                    <View style={styles.label}>
                        <Text style={[styles.labelText, styles.labelBold]}>
                            {Strings.jewelry[`cuffV${this.props.item.type}`].name}
                        </Text>
                        <FlareDeviceID value={this.props.item.id} style={styles.labelText} />
                    </View>
                </View>
                {this.props.onRemove && (
                    <Button
                        onPress={() => this.props.onRemove(this.props.item.id)}
                        title={Strings.jewelry.remove}
                        primary
                        dark
                    />
                )}
            </View>
        );
    }
}

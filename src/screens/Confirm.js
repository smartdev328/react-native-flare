import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '80%',
        height: '80%',
        marginVertical: '10%',
        marginHorizontal: '10%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.theme.purple,
        color: Colors.white,
    },
    inset: {
        position: 'absolute',
        top: Spacing.medium,
        right: Spacing.medium,
        bottom: Spacing.medium,
        left: Spacing.medium,
        backgroundColor: Colors.theme.purple,
    },
    promptBackground: {
        marginBottom: Spacing.huge,
    },
    promptForeground: {
        fontSize: Type.size.medium,
        padding: Spacing.medium,
        color: Colors.white,
    },
    buttonArea: {
        marginBottom: Spacing.huge,
    },
    secondaryButtonArea: {
        marginTop: Spacing.huge,
    },
});

export default class Confirm extends React.Component {
    static options() {
        return {
            topBar: {
                visible: false,
                animate: false,
                leftButtons: [],
            },
        };
    }

    onConfirm() {
        this.props.onConfirm();
        Navigation.dismissModal(this.props.componentId);
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        Navigation.dismissModal(this.props.componentId);
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Confirm',
            },
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Aura />
                <View style={styles.inset}>
                    <View style={styles.promptBackground}>
                        <Text style={styles.promptForeground}>{this.props.prompt}</Text>
                    </View>
                    <View style={styles.buttonArea}>
                        {this.props.confirmLabel && this.props.onConfirm && (
                            <Button onPress={() => this.onConfirm()} title={this.props.confirmLabel} primary />
                        )}
                        {this.props.cancelLabel && (
                            <View style={styles.secondaryButtonArea}>
                                <Button onPress={() => this.onCancel()} title={this.props.cancelLabel} secondary />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

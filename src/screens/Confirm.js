import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Type from '../bits/Type';

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
        backgroundColor: Colors.backgrounds.pink,
        color: Colors.theme.pink,
    },
    promptBackground: {
        marginBottom: Spacing.huge,
    },
    promptForeground: {
        fontSize: Type.size.medium,
        padding: Spacing.medium,
    },
    buttonArea: {
        marginBottom: Spacing.huge,
    },
});

export default class Confirm extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    onConfirm() {
        this.props.onConfirm();
        Navigation.pop(this.props.componentId);
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        Navigation.pop(this.props.componentId);
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Confirm',
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.promptBackground}>
                    <Text style={styles.promptForeground}>
                        {this.props.prompt}
                    </Text>
                </View>
                <View style={styles.buttonArea}>
                    {this.props.confirmLabel && this.props.onConfirm &&
                        <Button
                            onPress={() => this.onConfirm()}
                            title={this.props.confirmLabel}
                            rounded
                            primary
                        />
                    }
                    {this.props.cancelLabel &&
                        <Button
                            onPress={() => this.onCancel()}
                            title={this.props.cancelLabel}
                            rounded
                        />
                    }
                </View>
            </View>
        );
    }
}

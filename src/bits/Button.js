import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 2,
        alignSelf: 'center',
        height: 40,
        minHeight: 40,
        maxHeight: 40,
        opacity: 1.0,
    },
    left: {
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '900',
        lineHeight: 60,
        height: 60,
        fontSize: Type.size.small,
    },
    fullWidth: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    outlineBackground: {
        backgroundColor: Colors.transparent,
        borderColor: Colors.white,
        borderWidth: 2,
        padding: Spacing.medium,
    },
    outlineForeground: {
        margin: 0,
        textAlign: 'center',
        color: Colors.white,
    },
    primaryBackground: {
        backgroundColor: Colors.transparent,
        borderColor: Colors.white,
        borderRadius: 0,
        borderBottomWidth: 2,
        padding: Spacing.medium,
    },
    primaryForeground: {
        textTransform: 'uppercase',
        color: Colors.white,
    },
    rounded: {
        borderRadius: 32,
    },
    disabledBackground: {
        borderBottomColor: Colors.greyLight,
    },
    disabledForeground: {
        color: Colors.greyLight,
    },
    darkBackground: {
        borderColor: Colors.black,
    },
    darkForeground: {
        color: Colors.black,
    },
    secondaryForeground: {
        color: Colors.white,
        fontWeight: 'normal',
    },
    invisible: {
        display: 'none',
    },
    dev: {
        color: Colors.red,
    },
});

export default class Button extends React.PureComponent {
    handlePress(event) {
        if (!this.props.disabled && this.props.onPress) {
            this.props.onPress(event);
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={e => this.handlePress(e)}
                style={[
                    styles.container,
                    this.props.rounded && styles.rounded,
                    this.props.fullWidth && styles.fullWidth,
                    this.props.primary && styles.primaryBackground,
                    this.props.left && styles.left,
                    this.props.outline && styles.outlineBackground,
                    this.props.dark && styles.darkBackground,
                    this.props.invisible && styles.invisible,
                    this.props.disabled && styles.disabledBackground,
                    this.props.styleBackground,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        this.props.primary && styles.primaryForeground,
                        this.props.outline && styles.outlineForeground,
                        this.props.dark && styles.darkForeground,
                        this.props.secondary && styles.secondaryForeground,
                        this.props.disabled && styles.disabledForeground,
                        this.props.dev && styles.dev,
                        this.props.styleForeground,
                    ]}
                >
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 2,
        alignSelf: 'center',
        height: 60,
        minHeight: 60,
        maxHeight: 60,
    },
    left: {
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '900',
        lineHeight: 60,
        height: 60,
    },
    fullWidth: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    outlineBackground: {
        backgroundColor: Colors.transparent,
        borderColor: Colors.black,
        borderWidth: 2,
        height: 32,
        minHeight: 32,
        maxHeight: 32,
    },
    outlineForeground: {
        padding: 0,
        margin: 0,
        paddingLeft: Spacing.small,
        paddingRight: Spacing.small,
    },
    primaryBackground: {
        backgroundColor: Colors.theme.pink,
        padding: Spacing.large,
    },
    primaryForeground: {
        color: Colors.white,
    },
    rounded: {
        borderRadius: 32,
    },
    disabledBackground: {
        backgroundColor: Colors.grey,
    },
    disabledForeground: {
        color: Colors.greyLight,
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
                    this.props.disabled && styles.disabledBackground,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        this.props.primary && styles.primaryForeground,
                        this.props.outline && styles.outlineForeground,
                        this.props.disabled && styles.disabledForeground,
                    ]}
                    allowFontScaling={false}
                >
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

import * as React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'stretch',
    },
    headline: {
        fontSize: 30,
        lineHeight: 33,
        color: Colors.white,
        fontFamily: 'Nocturno Display Std',
        width: 275,
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
    spacer: {
        flex: 1,
    },
    buttonWrapper: {
        alignSelf: 'center',
        marginBottom: 32,
    },
    accessory: {
        color: Colors.white,
        fontSize: 24,
    },
});

class FlowScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            showPassword: false,
            error: null,
        };
    }

    togglePassword = () =>
        this.setState(({ showPassword }) => ({ showPassword: !showPassword }));

    renderAccessory = () => {
        const { showPassword } = this.state;
        return (
            <TouchableOpacity onPress={this.togglePassword}>
                <Icon
                    style={styles.accessory}
                    name={showPassword ? 'eye-with-line' : 'eye'}
                />
            </TouchableOpacity>
        );
    };

    onChangeText = text => {
        const { action } = this.props;
        action(text);
        this.setState({ error: undefined });
    };

    onSubmit = () => {
        const { validator, onNext, currentValue } = this.props;
        const result = validator(currentValue);
        if (result) {
            this.setState({ error: result });
        } else {
            onNext();
        }
    };

    render() {
        const {
            headline,
            label,
            textFieldRef,
            keyboardType = 'default',
            textContentType,
            password = false,
            currentValue,
        } = this.props;
        const { showPassword, error } = this.state;

        const renderAccessory = password ? this.renderAccessory : undefined;

        const autoCapitalize =
            password || keyboardType === 'email-address' ? 'none' : undefined;

        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={72}
                style={[styles.container]}
            >
                <Text style={styles.headline}>{headline}</Text>
                <TextField
                    ref={textFieldRef}
                    label={label}
                    textColor={Colors.white}
                    tintColor={Colors.white}
                    baseColor={Colors.white}
                    secureTextEntry={password && !showPassword}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={!password}
                    onSubmitEditing={this.onSubmit}
                    returnKeyType="next"
                    keyboardType={keyboardType}
                    textContentType={textContentType}
                    enablesReturnKeyAutomatically
                    renderRightAccessory={renderAccessory}
                    onChangeText={this.onChangeText}
                    value={currentValue}
                    error={error}
                />
                <View style={styles.spacer} />
                <RoundedButton
                    onPress={this.onSubmit}
                    useGradient
                    text="Continue"
                    wrapperStyle={styles.buttonWrapper}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentValue: state.user.reg[ownProps.value],
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const { actionCreator } = ownProps;
    return {
        action: text => dispatch(actionCreator(text)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlowScreen);

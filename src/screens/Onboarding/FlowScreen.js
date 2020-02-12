import * as React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import Headline from './Headline';
import InsetsHOC from '../../bits/InsetsHOC';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'stretch',
    },
    spacer: {
        flex: 1,
    },
    buttonWrapper: {
        alignSelf: 'center',
        marginBottom: 32,
    },
    accessory: {
        color: Colors.theme.cream,
        fontSize: 24,
    },
    squashed: {
        marginBottom: 0,
        fontSize: 24,
        lineHeight: 27,
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
        const { action, password } = this.props;
        action(password ? text : text.trim());
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
            registrationState,
            forceError = undefined,
            insets,
            squashed,
        } = this.props;
        const { showPassword, error } = this.state;

        const renderAccessory = password ? this.renderAccessory : undefined;

        const autoCapitalize =
            password || keyboardType === 'email-address' ? 'none' : 'words';

        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={72 + insets.bottom}
                style={styles.container}
            >
                <Headline style={squashed ? styles.squashed : undefined}>
                    {headline}
                </Headline>
                <TextField
                    ref={textFieldRef}
                    label={label}
                    textColor={Colors.theme.cream}
                    tintColor={Colors.theme.cream}
                    baseColor={Colors.theme.cream}
                    errorColor={
                        forceError && !error ? Colors.theme.cream : Colors.error
                    }
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
                    error={error || forceError}
                    keyboardAppearance="dark"
                />
                <View style={styles.spacer} />
                <RoundedButton
                    onPress={this.onSubmit}
                    text="Continue"
                    wrapperStyle={styles.buttonWrapper}
                    busy={registrationState === 'requested'}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentValue: state.user.reg[ownProps.value],
    registrationState: state.user.registrationState,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const { actionCreator } = ownProps;
    return bindActionCreators({ action: actionCreator }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsetsHOC(FlowScreen));

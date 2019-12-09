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
import { useDispatch, useSelector } from 'react-redux';

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

const FlowScreen = ({
    headline,
    onNext,
    label,
    textFieldRef,
    keyboardType = 'default',
    textContentType,
    password = false,
    actionCreator,
    value,
}) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const currentValue = useSelector(store => store.user.reg[value] || '');

    const renderAccessory = React.useMemo(
        () =>
            password
                ? () => (
                      <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                      >
                          <Icon
                              style={styles.accessory}
                              name={showPassword ? 'eye-with-line' : 'eye'}
                          />
                      </TouchableOpacity>
                  )
                : undefined,
        [password, showPassword, setShowPassword]
    );

    const onChangeText = React.useMemo(
        () => text => dispatch(actionCreator(text)),
        [dispatch, actionCreator]
    );

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
                onSubmitEditing={onNext}
                returnKeyType="next"
                keyboardType={keyboardType}
                textContentType={textContentType}
                enablesReturnKeyAutomatically
                renderRightAccessory={renderAccessory}
                onChangeText={onChangeText}
                value={currentValue}
            />
            <View style={styles.spacer} />
            <RoundedButton
                onPress={onNext}
                useGradient
                text="Continue"
                wrapperStyle={styles.buttonWrapper}
            />
        </KeyboardAvoidingView>
    );
};

export default FlowScreen;

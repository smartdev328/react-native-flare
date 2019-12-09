import * as React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Colors from '../../bits/Colors';
import Aura from '../../bits/Aura';

import backwardArrow from '../../assets/backward-arrow.png';
import smallestWhiteArrow from '../../assets/smallest-white-logo.png';
import FlowScreen from './FlowScreen';
import {
    regSetEmail,
    regSetName,
    regSetPassword,
    regSetPhone,
} from '../../actions/regActions';
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhone,
} from './validators';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.purple,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    bar: {
        flexDirection: 'row',
        height: 30,
        marginTop: 16,
        marginBottom: 26,
        paddingRight: 34,
        marginLeft: 32,
        marginRight: 32,
        alignItems: 'stretch',
    },
    backArrowWrapper: {
        width: 34,
        flexDirection: 'column',
    },
    backArrow: {
        width: 34,
        resizeMode: 'center',
        flex: 1,
    },
    logo: {
        flex: 1,
        resizeMode: 'center',
    },
    flex: { flex: 1 },
});

const Signup = ({ close }) => {
    const [page, setPage] = React.useState(0);
    const pagerRef = React.createRef();
    const fieldRefs = [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ];

    const goBack =
        page === 0
            ? close
            : () => {
                  setPage(page - 1);
                  pagerRef.current.setPage(page - 1);
              };

    const goForward = () => {
        setPage(page + 1);
        pagerRef.current.setPage(page + 1);
    };

    const onPageSelected = ({ nativeEvent: { position } }) => {
        const field = fieldRefs[position];
        if (field && field.current) {
            field.current.focus();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Aura />
            <View style={styles.bar}>
                <TouchableOpacity
                    style={styles.backArrowWrapper}
                    onPress={goBack}
                >
                    <Image source={backwardArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Image source={smallestWhiteArrow} style={styles.logo} />
            </View>
            <ViewPager
                style={styles.flex}
                scrollEnabled={false}
                keyboardDismissMode="none"
                transitionStyle="scroll"
                ref={pagerRef}
                onPageSelected={onPageSelected}
            >
                <View key="name">
                    <FlowScreen
                        headline="We’re so glad you’re here! What’s your name?"
                        onNext={goForward}
                        label="Your name"
                        textFieldRef={fieldRefs[0]}
                        textContentType="name"
                        actionCreator={regSetName}
                        value="name"
                        validator={validateName}
                    />
                </View>
                <View key="email">
                    <FlowScreen
                        headline="Welcome! And what’s your email?"
                        onNext={goForward}
                        label="Your email"
                        textFieldRef={fieldRefs[1]}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        actionCreator={regSetEmail}
                        value="email"
                        validator={validateEmail}
                    />
                </View>
                <View key="phone">
                    <FlowScreen
                        headline="And what about your phone number?"
                        onNext={goForward}
                        label="Your phone number"
                        textFieldRef={fieldRefs[2]}
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        actionCreator={regSetPhone}
                        value="phone"
                        validator={validatePhone}
                    />
                </View>
                <View key="password">
                    <FlowScreen
                        headline={'Last thing:\nEnter a password!'}
                        onNext={goForward}
                        label="Your password"
                        textFieldRef={fieldRefs[3]}
                        password
                        textContentType="password"
                        actionCreator={regSetPassword}
                        value="password"
                        validator={validatePassword}
                    />
                </View>
            </ViewPager>
        </SafeAreaView>
    );
};

export default Signup;

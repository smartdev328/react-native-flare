import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { connect } from 'react-redux';

import Aura from '../../bits/Aura';
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
import WhiteBar from './WhiteBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    flex: { flex: 1 },
});

const extractGreeting = name => {
    if (typeof name === 'string' && name.length > 1) {
        return `Welcome, ${name.split(' ')[0]}!`;
    } else {
        return 'Welcome!';
    }
};

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 0,
        };
        this.fieldRefs = [null, null, null, null];
        this.setFieldRef = this.fieldRefs.map((_, index) => ref => {
            this.fieldRefs[index] = ref;
        });
    }

    goBack = () => {
        const { close } = this.props;
        const { page } = this.state;
        if (page === 0) {
            close();
        } else {
            this.setState({ page: page - 1 });
            this.pagerRef.setPage(page - 1);
        }
    };

    goForward = () => {
        const { page } = this.state;
        this.setState({ page: page + 1 });
        this.pagerRef.setPage(page + 1);
    };

    onPageSelected = ({ nativeEvent: { position } }) => {
        const field = this.fieldRefs[position];
        if (field) {
            field.focus();
        }
    };

    setPagerRef = ref => {
        this.pagerRef = ref;
    };

    render() {
        const { name } = this.props;
        const greeting = extractGreeting(name);

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Aura />
                <WhiteBar goBack={this.goBack} />
                <ViewPager
                    style={styles.flex}
                    scrollEnabled={false}
                    keyboardDismissMode="none"
                    transitionStyle="scroll"
                    ref={this.setPagerRef}
                    onPageSelected={this.onPageSelected}
                >
                    <View key="name">
                        <FlowScreen
                            headline="We’re so glad you’re here! What’s your name?"
                            onNext={this.goForward}
                            label="Your name"
                            textFieldRef={this.setFieldRef[0]}
                            textContentType="name"
                            actionCreator={regSetName}
                            value="name"
                            validator={validateName}
                        />
                    </View>
                    <View key="email">
                        <FlowScreen
                            headline={`${greeting} And what’s your email?`}
                            onNext={this.goForward}
                            label="Your email"
                            textFieldRef={this.setFieldRef[1]}
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
                            onNext={this.goForward}
                            label="Your phone number"
                            textFieldRef={this.setFieldRef[2]}
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
                            onNext={this.goForward}
                            label="Your password"
                            textFieldRef={this.setFieldRef[3]}
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
    }
}

const mapStateToProps = ({
    user: {
        reg: { name },
    },
}) => ({
    name,
});

export default connect(mapStateToProps)(Signup);

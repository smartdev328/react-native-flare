import * as React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { navOptions, styles } from './styles';

const Account = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.subhead}>Account</Text>
        </SafeAreaView>
    );
};

Account.options = () => navOptions('Account');

export default connect()(Account);

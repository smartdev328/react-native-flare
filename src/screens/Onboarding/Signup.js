import * as React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../bits/Colors';
import Aura from '../../bits/Aura';

import backwardArrow from '../../assets/backward-arrow.png';
import smallestWhiteArrow from '../../assets/smallest-white-logo.png';

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
});

const Signup = ({ close }) => {
    const [page, setPage] = React.useState(0);

    const goBack = page === 0 ? close : () => setPage(page - 1);

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
        </SafeAreaView>
    );
};

export default Signup;

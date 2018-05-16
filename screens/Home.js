import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo';

import Colors from '../bits/Colors';

// using the translation hoc to provie t function in props using home as default namespace
// https://react.i18next.com/components/translate-hoc.html
@translate(['home', 'common'], {wait: true})
export default class Home extends React.Component {
    // static navigationOptions = ({navigation, screenProps}) => ({
    //     title: screenProps.t('home:title')
    // });

    render() {
        const { t, i18n, navigation } = this.props;
        const { navigate } = navigation;
        return (
            <View style={styles.container}>
                <LinearGradient 
                    colors={[Colors.theme.orange, Colors.theme.purple]}
                    style={styles.gradient}
                >
                    <Image
                        source={require('../assets/FLARE-white.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.choosePrompt}>
                        {t('chooseLanguage', {lng: i18n.language})}
                    </Text>
                    <Button
                        onPress={() => {i18n.changeLanguage('en')}}
                        title={t('common:actions.toggleToEnglish')}
                    />
                    <Button
                        onPress={() => { i18n.changeLanguage('de') }}
                        title={t('common:actions.toggleToGerman')}
                    />
                    <Button
                        onPress={() => { i18n.changeLanguage('jp') }}
                        title={t('common:actions.toggleToJapanese')}
                    />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    separate: {
        marginTop: 50
    },
    choosePrompt: {
        marginBottom: 12
    },
    logo: {
        width: 200,
        margin: 25,
        marginBottom: 90,
        padding: 8,
        resizeMode: 'contain'
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    }
});
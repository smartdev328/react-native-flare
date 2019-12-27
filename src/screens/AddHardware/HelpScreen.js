import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import styles from './styles';
import Aura from '../../bits/Aura';
import aura1521 from '../../assets/aura-1521.jpg';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';

const HelpScreen = ({ componentId, children, headline }) => {
    const dismiss = React.useCallback(() => {
        Navigation.dismissModal(componentId);
    }, [componentId]);

    return (
        <SafeAreaView style={styles.helpContainer}>
            <StatusBar barStyle="light-content" />
            <Aura source={aura1521} />
            <WhiteBar showLogo={false} goBack={dismiss} />
            <ScrollView
                style={styles.scrollContainer}
                alwaysBounceVertical={false}
                indicatorStyle="white"
            >
                <Headline>{headline}</Headline>
                {children}
                <View style={{ height: 24 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpScreen;

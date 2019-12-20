import * as React from 'react';
import { Animated, Easing, SafeAreaView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import Aura from '../../bits/Aura';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';
import Colors from '../../bits/Colors';
import Geyser from '../../bits/Geyser';
import RoundedButton from '../../bits/RoundedButton';
import Cuff from './Cuff';

import aura from '../../assets/aura-6-light.jpg';

const DeviceAction = ({
    onBack,
    onSuccess,
    headline1,
    headline2,
    body,
    confirm,
    successAction,
}) => {
    const dispatch = useDispatch();
    const [troubleOpacity] = React.useState(new Animated.Value(0.0));

    React.useEffect(() => {
        Animated.timing(troubleOpacity, {
            delay: 3000,
            duration: 300,
            toValue: 1.0,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    const fullSuccess = React.useCallback(() => {
        if (successAction) {
            dispatch(successAction());
        }
        onSuccess();
    }, [successAction, onSuccess, dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <Aura source={aura} />
            <WhiteBar showLogo={false} black goBack={onBack} />
            <Headline style={[styles.headline, { color: Colors.theme.purple }]}>
                {`${headline1}\n`}
                <Text style={{ fontStyle: 'italic' }}>{headline2}</Text>
            </Headline>
            <View style={[styles.line, { backgroundColor: Colors.black }]} />
            <Text style={[styles.text, styles.blackText]}>{body}</Text>
            <Geyser />
            <Cuff button />
            <RoundedButton
                text={confirm}
                useGradient={false}
                onPress={fullSuccess}
                wrapperStyle={{ marginTop: 24, marginBottom: 'auto' }}
                width={146}
                height={46}
                fontSize={14}
            />
            <RoundedButton
                text="Having trouble?"
                wrapperStyle={{ opacity: troubleOpacity }}
                animated
                useGradient={false}
                invisible
                width={146}
                height={46}
                fontSize={14}
            />
        </SafeAreaView>
    );
};

export default DeviceAction;

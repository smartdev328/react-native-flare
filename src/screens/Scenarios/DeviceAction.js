import * as React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import styles from './styles';
import Aura from '../../bits/Aura';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';
import RoundedButton from '../../bits/RoundedButton';
import Cuff from '../Cuff';
import useDimensions from '../../bits/useDimensions';
import { MIN_NON_SQUASHED_HEIGHT } from '../../constants/Config';
import Warning from './Warning';

import aura1519 from '../../assets/aura-1519.jpg';

const DeviceAction = ({
    onBack,
    headline1,
    headline2,
    body,
    confirm,
    onNext,
    animation,
    warning,
}) => {
    const insets = useSafeArea();
    const dimensions = useDimensions();
    const squashed = dimensions.height < MIN_NON_SQUASHED_HEIGHT;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" />
            <Aura source={aura1519} />
            <WhiteBar showLogo={false} offWhite goBack={onBack} />
            <Headline style={styles.headline}>
                {`${headline1}\n`}
                <Text style={{ fontStyle: 'italic' }}>{headline2}</Text>
            </Headline>
            <View style={styles.line} />
            <Text
                style={[
                    styles.deviceActionText,
                    squashed ? styles.deviceActionTextSquashed : undefined,
                ]}
            >
                {body}
            </Text>
            <Cuff button animation={animation} pause />
            {onNext ? (
                <RoundedButton
                    text={confirm}
                    useGradient={false}
                    onPress={onNext}
                    wrapperStyle={{
                        marginTop: 'auto',
                        marginBottom: 24 + insets.bottom,
                    }}
                    width={146}
                    height={46}
                    fontSize={14}
                />
            ) : null}
            {typeof warning === 'string' ? (
                <Warning bottomInset={insets.bottom}>{warning}</Warning>
            ) : null}
        </View>
    );
};

export default DeviceAction;

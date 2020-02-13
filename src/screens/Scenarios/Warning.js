import * as React from 'react';
import { Animated, Easing, Text } from 'react-native';

import styles from './styles';

const Warning = ({ bottomInset = 0, children }) => {
    const [translation] = React.useState(() => new Animated.Value(1000));
    const containerStyles = React.useMemo(
        () => [
            styles.warning,
            {
                paddingBottom: bottomInset + 24,
                transform: [{ translateY: translation }],
            },
        ],
        [bottomInset, translation]
    );
    const onLayout = React.useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }) => {
            translation.setValue(height);
            Animated.timing(translation, {
                duration: 450,
                toValue: 0.0,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start();
        },
        [translation]
    );

    return (
        <Animated.View style={containerStyles} onLayout={onLayout}>
            <Text style={styles.warningText}>{children}</Text>
        </Animated.View>
    );
};

export default Warning;

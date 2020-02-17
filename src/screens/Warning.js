import * as React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import Colors from '../bits/Colors';

const styles = StyleSheet.create({
    warning: {
        alignSelf: 'stretch',
        marginTop: 'auto',
        padding: 24,
        backgroundColor: '#1e1d2a',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    warningText: {
        color: Colors.theme.cream,
        fontSize: 14,
    },
});

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Warning = ({ bottomInset = 0, children, onPress }) => {
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

    const Container =
        typeof onPress === 'function' ? AnimatedTouchable : Animated.View;

    return (
        <Container
            style={containerStyles}
            onLayout={onLayout}
            onPress={onPress}
        >
            <Text style={styles.warningText}>{children}</Text>
        </Container>
    );
};

export default Warning;

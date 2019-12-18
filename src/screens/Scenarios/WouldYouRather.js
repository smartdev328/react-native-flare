import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F2ED',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 32,
        alignSelf: 'stretch',
    },
    head: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 24,
        textAlign: 'center',
        color: Colors.black,
    },
    body: {
        fontSize: 14,
        textAlign: 'center',
        color: Colors.black,
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    firstButton: {
        marginRight: 16,
    },
});

const WouldYouRather = ({
    style,
    extraPaddingBottom = 0,
    fakeCall,
    textCrew,
    ...props
}) => (
    <Animated.View
        style={[
            styles.container,
            { paddingBottom: 24 + extraPaddingBottom },
            style,
        ]}
        {...props}
    >
        <Text style={styles.head}>Would You Rather?</Text>
        <Text style={styles.body}>(BTW, there’s no wrong way to Flare.)</Text>
        <View style={styles.buttonContainer}>
            <RoundedButton
                useGradient={false}
                onPress={fakeCall}
                text="Get a fake call"
                wrapperStyle={styles.firstButton}
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.peach}
            />
            <RoundedButton
                useGradient={false}
                onPress={textCrew}
                text="Text your crew"
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.purple}
            />
        </View>
    </Animated.View>
);

export default WouldYouRather;

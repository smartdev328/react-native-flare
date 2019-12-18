import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F2ED',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 32,
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

const WouldYouRather = ({ style, extraPaddingBottom = 0 }) => (
    <View
        style={[
            styles.container,
            { paddingBottom: 24 + extraPaddingBottom },
            style,
        ]}
    >
        <Text style={styles.head}>Would You Rather?</Text>
        <Text style={styles.body}>(BTW, there’s no wrong way to Flare.)</Text>
        <View style={styles.buttonContainer}>
            <RoundedButton
                useGradient={false}
                text="Get a fake call"
                wrapperStyle={styles.firstButton}
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.peach}
            />
            <RoundedButton
                useGradient={false}
                text="Text your crew"
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.purple}
            />
        </View>
    </View>
);

export default WouldYouRather;

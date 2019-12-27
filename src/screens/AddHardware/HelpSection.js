import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import styles from './styles';

const sectionStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginBottom: 12,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
        alignSelf: 'flex-start',
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
    },
    nomargin: {
        marginTop: 0,
    },
});

const HelpSection = ({ icon, title, body }) => (
    <View style={sectionStyles.container}>
        <Image source={icon} style={sectionStyles.icon} resizeMode="center" />
        <View style={sectionStyles.textWrapper}>
            <Text
                style={[
                    styles.subhead,
                    styles.whiteText,
                    sectionStyles.nomargin,
                ]}
            >
                {title}
            </Text>
            <Text style={[styles.helpText, styles.whiteText]}>{body}</Text>
        </View>
    </View>
);

export default HelpSection;

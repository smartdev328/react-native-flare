import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Type from './Type';

const styles = StyleSheet.create({
    container: {},
    member: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        marginHorizontal: Spacing.medium,
        paddingLeft: Spacing.medium,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.theme.purple,
        marginBottom: Spacing.tiny,
        borderRadius: Spacing.small,
    },
    memberName: {
        color: Colors.white,
        flex: 9,
        fontSize: Type.size.smallCaps,
    },
    memberAction: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: Spacing.small,
    },
});

const CrewList = function createCrewList(props) {
    return (
        <FlatList
            style={[styles.container, props.style]}
            showsVerticalScrollIndicator={false}
            overScrollMode="always"
            scrollEnabled={false}
            data={(props.crew && props.crew.members) || []}
            renderItem={({ item }) => (
                <View style={styles.member}>
                    <Text style={styles.memberName}>
                        {item.name}
                        {item.label && item.label.length && item.label}
                    </Text>
                    <TouchableOpacity
                        style={styles.memberAction}
                        onPress={() => {
                            props.onPressContact(item);
                        }}
                    >
                        <Icon name="x" size={Type.size.medium} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

export default CrewList;

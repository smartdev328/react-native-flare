import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    member: {
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

const CrewMember = ({ item, onPressContact }) => {
    const onPress = React.useCallback(() => {
        onPressContact(item);
    }, [onPressContact, item]);

    return (
        <View style={styles.member} key={item.key}>
            <Text style={styles.memberName}>
                {item.name}
                {item.label && item.label.length && item.label}
            </Text>
            <TouchableOpacity style={styles.memberAction} onPress={onPress}>
                <Icon
                    name="cross"
                    size={Type.size.medium}
                    color={Colors.white}
                />
            </TouchableOpacity>
        </View>
    );
};

const CrewList = ({ crew, onPressContact }) => {
    if (
        typeof crew === 'object' &&
        'members' in crew &&
        crew.members.length > 0
    ) {
        return (
            <View style={styles.container}>
                {crew.members.map(item => (
                    <CrewMember
                        key={item.key}
                        item={item}
                        onPressContact={onPressContact}
                    />
                ))}
            </View>
        );
    } else {
        return null;
    }
};

export default CrewList;

import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';

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

const CrewList = ({ style, crew, onPressContact }) => {
    const renderItem = React.useCallback(
        ({ item }) => (
            <View style={styles.member}>
                <Text style={styles.memberName}>
                    {item.name}
                    {item.label && item.label.length && item.label}
                </Text>
                <TouchableOpacity
                    style={styles.memberAction}
                    onPress={() => {
                        onPressContact(item);
                    }}
                >
                    <Icon
                        name="cross"
                        size={Type.size.medium}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>
        ),
        [onPressContact]
    );
    return (
        <FlatList
            style={[styles.container, style]}
            showsVerticalScrollIndicator={false}
            overScrollMode="always"
            scrollEnabled={false}
            data={(crew && crew.members) || []}
            renderItem={renderItem}
        />
    );
};

export default CrewList;

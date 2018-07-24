import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';

const styles = StyleSheet.create({
    container: {
    },
    member: {
        flex: 1,
        flexDirection: 'row',
        height: Spacing.huge,
        paddingLeft: Spacing.small,
        alignItems: 'center',
        borderColor: Colors.theme.purple,
        borderWidth: 1,
        marginBottom: Spacing.small,
    },
    memberName: {
        flex: 9,
        fontSize: 18,
    },
    memberAction: {
        flex: 1,
    },
});

const CrewList = function createCrewList(props) {
    return (
        <FlatList
            style={props.style}
            showsVerticalScrollIndicator={false}
            overScrollMode="always"
            scrollEnabled={false}
            constainerStyle={styles.container}
            data={(props.crew && props.crew.members) || []}
            renderItem={({ item }) => (
                <View style={styles.member}>
                    <Text style={styles.memberName}>
                        {item.displayName} – {item.label}
                    </Text>
                    <TouchableOpacity
                        style={styles.memberAction}
                        onPress={() => props.onPressContact(item)}
                    >
                        <Icon name="x" size={28} color={Colors.theme.purple} />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

export default CrewList;

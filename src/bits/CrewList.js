import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from '../bits/Colors';

const styles = StyleSheet.create({
    container: {
    },
});

const CrewList = function createCrewList(props, context) {
    return (
        <FlatList constainerStyle={styles.container}>
            data={[]}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.key}</Text>
                </View>
            )}
        </FlatList>
    );
};

export default CrewList;

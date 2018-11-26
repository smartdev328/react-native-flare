import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        padding: Spacing.medium,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
    },
    key: {
        flex: 1,
        fontWeight: 'bold',
        minWidth: 64,
    },
    value: {
        flex: 5,
        justifyContent: 'flex-start',
    },
});

function EnvironmentListing(props) {
    return (
        <FlatList
            style={styles.container}
            showsVerticalScrollIndicator={false}
            overScrollMode="always"
            scrollEnabled={false}
            data={props.config || []}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.key}>{item.key}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            )}
        />
    );
}

export default EnvironmentListing;

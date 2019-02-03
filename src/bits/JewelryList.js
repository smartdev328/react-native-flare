import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import JewelryListItem from '../bits/JewelryListItem';
import Strings from '../locales/en';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    emptyWarningText: {
        marginTop: Spacing.huge,
        textAlign: 'center',
        fontSize: 20,
    },
});

const JewelryList = function createJewelryList(props) {
    return (
        <FlatList
            data={props.jewelry || []}
            ListEmptyComponent={
                <Text style={styles.emptyWarningText}>
                    {Strings.jewelry.emptyList}
                </Text>
            }
            renderItem={({ item }) => (
                <JewelryListItem
                    item={item}
                    onRemove={props.onRemove}
                />
            )}
        />
    );
};

export default JewelryList;

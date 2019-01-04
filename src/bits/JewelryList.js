import React from 'react';
import {
    FlatList,
} from 'react-native';

import JewelryListItem from '../bits/JewelryListItem';

const JewelryList = function createJewelryList(props) {
    return (
        <FlatList
            data={props.jewelry || []}
            renderItem={({ item }) => (
                <JewelryListItem
                    item={item}
                />
            )}
        />
    );
};

export default JewelryList;

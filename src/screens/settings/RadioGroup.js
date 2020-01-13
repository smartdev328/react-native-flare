import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import selectedIcon from '../../assets/radio-selected.png';
import unselectedIcon from '../../assets/radio-unselected.png';

const RadioGroup = ({ items, onSelected, selectedItem }) => {
    const callbacks = React.useMemo(
        () =>
            items.map(item => () => {
                onSelected(item.key);
            }),
        [items, onSelected]
    );

    if (items.length === 0) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        style={[
                            styles.itemContainer,
                            index === 0 ? undefined : styles.itemBorder,
                        ]}
                        key={item.key}
                        onPress={callbacks[index]}
                    >
                        <Image
                            style={styles.icon}
                            source={
                                item.key === selectedItem
                                    ? selectedIcon
                                    : unselectedIcon
                            }
                        />
                        <Text style={styles.text}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
};

export default RadioGroup;

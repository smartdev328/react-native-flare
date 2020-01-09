import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../bits/Colors';

import selectedIcon from '../../assets/radio-selected.png';
import unselectedIcon from '../../assets/radio-unselected.png';

const borderColor = '#545458A6';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderColor,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    item: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 18,
        paddingLeft: 6,
        paddingRight: 24,
    },
    itemBorder: {
        borderColor,
        borderTopWidth: 1,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        marginLeft: 18,
        fontSize: 17,
        color: Colors.black,
        flex: 1,
    },
});

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
                            styles.item,
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

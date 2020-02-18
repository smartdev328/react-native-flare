import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import actionPlay from '../../assets/action-play.png';
import actionStop from '../../assets/action-stop.png';
import selectedIcon from '../../assets/radio-selected.png';
import unselectedIcon from '../../assets/radio-unselected.png';

const Item = React.memo(
    ({
        itemKey,
        label,
        first,
        onSelected,
        selected,
        onPlay,
        playing,
        preview,
    }) => {
        const onPress = React.useCallback(() => {
            onSelected(itemKey);
        }, [onSelected, itemKey]);
        const onPressPlay = React.useCallback(() => {
            if (typeof onPlay === 'function') {
                onPlay(preview);
            }
        }, [onPlay, preview]);

        return (
            <TouchableOpacity
                style={[styles.item, first ? undefined : styles.itemBorder]}
                onPress={onPress}
            >
                <Image
                    style={[styles.icon, { marginRight: 18 }]}
                    source={selected ? selectedIcon : unselectedIcon}
                />
                <Text style={styles.text}>{label}</Text>
                {typeof onPlay === 'function' ? (
                    <TouchableOpacity
                        style={styles.action}
                        onPress={onPressPlay}
                    >
                        <Image
                            style={styles.icon}
                            source={playing ? actionStop : actionPlay}
                        />
                    </TouchableOpacity>
                ) : null}
            </TouchableOpacity>
        );
    }
);

const RadioGroup = ({
    items,
    onSelected,
    selectedItem,
    onPlay,
    onStop,
    playingPreview,
}) => {
    if (items.length === 0) {
        return null;
    } else {
        return (
            <View style={styles.itemContainer}>
                {items.map(({ key, label, preview }, index) => (
                    <Item
                        key={key}
                        itemKey={key}
                        selected={key === selectedItem}
                        label={label}
                        first={index === 0}
                        onSelected={onSelected}
                        onPlay={preview === playingPreview ? onStop : onPlay}
                        preview={preview}
                        playing={preview === playingPreview}
                    />
                ))}
            </View>
        );
    }
};

export default RadioGroup;

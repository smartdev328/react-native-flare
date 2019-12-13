import * as React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import image from '../../../assets/cuff-confirm.png';

const styles = StyleSheet.create({
    container: {
        width: 232,
        height: 110,
    },
    image: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    textWrapper: {
        position: 'absolute',
        left: 87,
        top: 71,
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
    },
    textInput: {
        borderWidth: 0,
        padding: 0,
    },
});

const CuffPreview = ({ text, style, onChangeText }) => {
    const inputRef = React.useRef(null);
    const focusInput = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const textLength = typeof text === 'string' ? text.length : 0;
    return (
        <TouchableWithoutFeedback
            style={[style, styles.container]}
            onPress={focusInput}
            accessible={false}
        >
            <View style={[style, styles.container]}>
                <Image source={image} style={styles.image} />
                <View style={styles.textWrapper}>
                    {textLength > 0 && <Text style={styles.text}>{text}</Text>}
                    <TextInput
                        ref={inputRef}
                        style={[styles.text, styles.textInput]}
                        autoFocus
                        autoCapitalize="characters"
                        autoCompleteType="off"
                        autoCorrect={false}
                        keyboardType="ascii-capable"
                        returnKeyType="next"
                        onChangeText={onChangeText}
                        maxLength={9 - text.length}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CuffPreview;

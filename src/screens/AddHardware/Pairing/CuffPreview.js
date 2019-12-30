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
import Colors from '../../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        width: 274,
        height: 130,
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
        left: 100,
        top: 84,
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: Colors.black,
    },
    textInput: {
        borderWidth: 0,
        padding: 0,
    },
});

const CuffPreview = ({ text = '', style, ...rest }) => {
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
                        maxLength={9 - text.length}
                        keyboardAppearance="dark"
                        placeholder={
                            textLength === 6 ? '_\u2006_\u2006_' : undefined
                        }
                        placeholderTextColor="#000000"
                        {...rest}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CuffPreview;

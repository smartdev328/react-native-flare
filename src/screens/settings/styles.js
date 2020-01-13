import { Alert, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Colors from '../../bits/Colors';

import backIcon from '../../assets/backward-arrow.png';

const borderColor = '#545458A6';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'stretch',
    },
    subhead: {
        fontSize: 13,
        marginTop: 16,
        textTransform: 'uppercase',
        marginHorizontal: 24,
        marginBottom: 8,
    },
    explain: {
        fontSize: 12,
        marginLeft: 24,
        marginTop: 8,
        width: 240,
        alignSelf: 'flex-start',
    },

    itemContainer: {
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

export const navOptions = titleText => ({
    topBar: {
        visible: true,
        animate: false,
        background: { color: Colors.theme.cream },
        leftButtons: [
            {
                id: 'backButton',
                icon: backIcon,
                color: Colors.black,
            },
        ],
        title: {
            text: titleText,
        },
    },
});

export const saveButton = {
    id: 'save',
    text: 'Save',
    color: Colors.black,
};

export const confirmClose = (dirty, componentId) => {
    if (dirty) {
        Alert.alert('Are you sure?', 'You haven’t saved your changes', [
            {
                style: 'cancel',
                text: 'Cancel',
                onPress: () => {},
            },
            {
                style: 'destructive',
                text: 'Close Anyway',
                onPress: () => {
                    Navigation.pop(componentId);
                },
            },
        ]);
    } else {
        Navigation.pop(componentId);
    }
};

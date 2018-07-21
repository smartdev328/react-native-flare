import React from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from '../bits/Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
    },
    sectionHeader: {
        backgroundColor: Colors.theme.purple,
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: Spacing.tiny,
        paddingBottom: Spacing.tiny,
        paddingLeft: Spacing.medium,
    },
    listItem: {
        padding: Spacing.small,
        flex: 1,
        flexDirection: 'row',
    },
    listItemSelection: {
        flex: 1,
    },
    listItemDetails: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    phone: {
        fontSize: 11,
    },
});

const ContactsListItem = function createContactsListItem(props, context) {
    return (
        <View style={styles.listItem}>
            <View style={styles.listItemSelection}>
                <Text>.</Text>
            </View>
            <View style={styles.listItemDetails}>
                <Text style={styles.displayName}>
                    {props.displayName} – {props.label}
                </Text>
                <Text style={styles.phone}>
                    {props.phone}
                </Text>
            </View>
        </View>
    );
};

const ContactsList = function createContactsList(props, context) {
    return (
        <SectionList
            renderItem={({ item, index, section }) => (
                <ContactsListItem
                    displayName={item.displayName}
                    label={item.label}
                    phone={item.number}
                />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            sections={props.contacts}
            keyExtractor={(item, index) => item + index}
        />
    );
};

export default ContactsList;

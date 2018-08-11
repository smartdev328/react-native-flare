import React from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../bits/Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
    },
    sectionHeader: {
        backgroundColor: Colors.theme.blueDark,
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

const ContactsListItem = function createContactsListItem(props) {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => props.onPress(props.contact)}
        >
            <View style={styles.listItemSelection}>
                {props.selected &&
                    <Icon name="check" size={28} color={Colors.theme.blueDark} />
                }
            </View>
            <View style={styles.listItemDetails}>
                <Text style={styles.displayName}>
                    {props.contact.displayName} – {props.contact.label}
                </Text>
                <Text style={styles.phone}>
                    {props.contact.number}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ContactsList = function createContactsList(props) {
    return (
        <SectionList
            renderItem={({ item }) => (
                <ContactsListItem
                    contact={item}
                    onPress={props.onPressContact}
                    selected={Object.hasOwnProperty.call(props.contactsCrewLookup, item.key)}
                />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            sections={props.contacts}
            keyExtractor={item => item.key}
        />
    );
};

export default ContactsList;

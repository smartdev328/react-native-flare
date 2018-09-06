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
        height: '100%',
        borderWidth: 2,
        borderColor: Colors.theme.purple,
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

class ContactsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.contact = this.props.contact;
        this.onPressExternal = this.props.onPress;
        this.onPress = this.onPressContact.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.contact.name !== nextProps.contact.name ||
        this.props.contact.phone !== nextProps.contact.phone ||
        this.props.contact.label !== nextProps.contact.label;
    }

    onPressContact() {
        console.log(`Clicked on contact ${JSON.stringify(this.contact)}`);
        this.onPressExternal(this.contact);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={this.onPress}
            >
                <View style={styles.listItemSelection}>
                    {this.props.selected &&
                        <Icon name="check" size={28} color={Colors.theme.blueDark} />
                    }
                </View>
                <View style={styles.listItemDetails}>
                    <Text style={styles.displayName}>
                        {this.props.contact.name} – {this.props.contact.label}
                    </Text>
                    <Text style={styles.phone}>
                        {this.props.contact.phone}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const ContactsList = function createContactsList(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressOut={() => this.contactsList.scrollToLocation({
                    sectionIndex: 4,
                    itemIndex: 0,
                })}
            >
                <Text>M</Text>
            </TouchableOpacity>
            <SectionList
                ref={(L) => { this.contactsList = L; }}
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
                getItemLayout={(data, index) => (
                    { length: props.contactsCount * 64, offset: 64 * index, index }
                )}
            />
        </View>
    );
};

export default ContactsList;

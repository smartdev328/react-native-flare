import React from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../bits/Colors';
import Spacing from './Spacing';
import Type from './Type';

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.blue,
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
        height: 50,
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
    navigator: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: Spacing.medium,
    },
    navigatorItem: {
        marginVertical: Spacing.tiny,
    },
    navigatorItemText: {
        color: Colors.red,
        fontSize: Type.size.small,
    },
});

class ContactsListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.contact = this.props.contact;
        this.onPressExternal = this.props.onPress;
        this.onPress = this.onPressContact.bind(this);
    }

    onPressContact() {
        this.onPressExternal(this.contact);
    }

    render() {
        return (
            <TouchableOpacity style={styles.listItem} onPress={this.onPress}>
                <View style={styles.listItemSelection}>
                    {this.props.selected && <Icon name="check" size={28} color={Colors.theme.blueDark} />}
                </View>
                <View style={styles.listItemDetails}>
                    <Text style={styles.displayName}>
                        {this.props.contact.name} – {this.props.contact.label}
                    </Text>
                    <Text style={styles.phone}>{this.props.contact.phone}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const SectionNavigator = function createSectionNavigator(props) {
    return (
        <View style={styles.navigator}>
            {props.sections.map((section, index) => (
                <TouchableOpacity
                    key={section}
                    style={styles.navigatorItem}
                    onPress={() => this.flatList.scrollToLocation({ sectionIndex: index, itemIndex: 0 })}
                >
                    <Text style={styles.navigatorItemText}>{section}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ContactsList = function createContactsList(props) {
    return (
        <View>
            <SectionList
                ref={(ref) => {
                    this.flatList = ref;
                }}
                renderItem={({ item }) => (
                    <ContactsListItem
                        contact={item}
                        onPress={props.onPressContact}
                        selected={Object.hasOwnProperty.call(props.contactsCrewLookup, item.key)}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
                sections={props.contacts}
                keyExtractor={(item, index) => `${index}_${item.key}`}
                getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
            />
            <SectionNavigator sections={props.sectionList} list={this.flatList} />
        </View>
    );
};

export default ContactsList;

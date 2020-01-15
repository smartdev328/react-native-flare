import React from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';

const LIST_ITEM_HEIGHT = 50;

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.blue,
        fontSize: Type.size.small,
        fontWeight: 'bold',
        paddingTop: Spacing.tiny,
        paddingBottom: Spacing.tiny,
        paddingLeft: Spacing.medium,
    },
    listItem: {
        paddingLeft: Spacing.medium,
        flex: 1,
        flexDirection: 'row',
        height: LIST_ITEM_HEIGHT,
        maxHeight: LIST_ITEM_HEIGHT,
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
        top: Spacing.large,
        right: 0,
        bottom: 0,
        width: Spacing.medium,
    },
    navigatorItem: {
        marginBottom: Spacing.tiny,
    },
    navigatorItemText: {
        color: Colors.red,
        fontSize: Type.size.tiny,
    },
});

class ContactsListItem extends React.PureComponent {
    onContainerPress = () => {
        const { onPress, itemKey, name, label, phone } = this.props;
        onPress({ key: itemKey, name, label, phone });
    };

    render() {
        const { name, label, phone } = this.props;

        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={this.onContainerPress}
            >
                <View style={styles.listItemDetails}>
                    <Text style={styles.displayName}>
                        {name}
                        {label}
                    </Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const SectionNavigator = ({ sections, onPress }) => {
    return (
        <View style={styles.navigator}>
            {sections.map((section, index) => (
                <TouchableOpacity
                    key={section}
                    style={styles.navigatorItem}
                    onPress={() => onPress(index)}
                >
                    <Text style={styles.navigatorItemText}>{section}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ContactsList = ({ contacts, onPressContact, sectionList }) => {
    const flatList = React.useRef();
    const onSectionPress = React.useCallback(
        index => {
            flatList.current.scrollToLocation({
                sectionIndex: index,
                itemIndex: 0,
            });
        },
        [flatList]
    );

    const renderItem = React.useCallback(
        ({ item }) => (
            <ContactsListItem
                itemKey={item.key}
                name={item.name}
                label={item.label && item.label.length && ` - ${item.label}`}
                phone={item.phone}
                onPress={onPressContact}
            />
        ),
        [onPressContact]
    );

    return (
        <View>
            <SectionList
                stickySectionHeadersEnabled={false}
                ref={flatList}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                sections={contacts}
                keyExtractor={(item, index) => `${index}_${item.key}`}
                getItemLayout={(data, index) => ({
                    length: LIST_ITEM_HEIGHT,
                    offset: LIST_ITEM_HEIGHT * index,
                    index,
                })}
                contentContainerStyle={{ paddingBottom: 500 }}
            />
            <SectionNavigator sections={sectionList} onPress={onSectionPress} />
        </View>
    );
};

export default ContactsList;

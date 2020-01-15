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

class ContactsListItem extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() =>
                    this.props.onPress({
                        key: this.props.itemKey,
                        name: this.props.name,
                        label: this.props.label,
                        phone: this.props.phone,
                    })
                }
            >
                <View style={styles.listItemDetails}>
                    <Text style={styles.displayName}>
                        {this.props.name}
                        {this.props.label}
                    </Text>
                    <Text style={styles.phone}>{this.props.phone}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

function SectionNavigator(props) {
    return (
        <View style={styles.navigator}>
            {props.sections.map((section, index) => (
                <TouchableOpacity
                    key={section}
                    style={styles.navigatorItem}
                    onPress={() =>
                        this.flatList.scrollToLocation({
                            sectionIndex: index,
                            itemIndex: 0,
                        })
                    }
                >
                    <Text style={styles.navigatorItemText}>{section}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

function ContactsList(props) {
    return (
        <View>
            <SectionList
                stickySectionHeadersEnabled={false}
                ref={ref => {
                    this.flatList = ref;
                }}
                renderItem={({ item }) => (
                    <ContactsListItem
                        itemKey={item.key}
                        name={item.name}
                        label={
                            item.label &&
                            item.label.length &&
                            ` - ${item.label}`
                        }
                        phone={item.phone}
                        onPress={props.onPressContact}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                sections={props.contacts}
                keyExtractor={(item, index) => `${index}_${item.key}`}
                getItemLayout={(data, index) => ({
                    length: LIST_ITEM_HEIGHT,
                    offset: LIST_ITEM_HEIGHT * index,
                    index,
                })}
                contentContainerStyle={{ paddingBottom: 500 }}
            />
            <SectionNavigator
                sections={props.sectionList}
                list={this.flatList}
            />
        </View>
    );
}

export default ContactsList;

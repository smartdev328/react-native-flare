import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import Strings from '../locales/en';
import Type from '../bits/Type';
import Spacing from '../bits/Spacing';
import Colors from './Colors';

const styles = StyleSheet.create({
    section: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: Spacing.medium,
    },
    sectionTitle: {
        fontSize: Type.size.small,
        fontWeight: 'bold',
        paddingVertical: Spacing.medium,
        paddingLeft: Spacing.medium,
        color: Colors.grey,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.small,
        paddingLeft: Spacing.medium,
        backgroundColor: Colors.white,
        marginBottom: Spacing.tiny,
    },
    itemLabelArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemIcon: {
        padding: Spacing.tiny,
    },
    itemLabel: {
        fontSize: Type.size.small,
    },
    iconBackground: {
        marginRight: Spacing.medium,
        width: 32,
        borderRadius: 2,
        alignItems: 'center',
    },
});

export default class SettingSection extends React.PureComponent {
    render() {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {this.props.title}
                </Text>
                <FlatList
                    data={this.props.pages}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => this.props.onPress(item)}
                            style={styles.item}
                        >
                            <View style={styles.itemLabelArea}>
                                <View style={[styles.iconBackground, { backgroundColor: item.iconBackgroundColor }]}>
                                    <Icon
                                        style={styles.itemIcon}
                                        name={item.icon}
                                        size={24}
                                        color={Colors.white}
                                    />
                                </View>
                                <Text style={styles.itemLabel}>
                                    {Strings.settings.sections[this.props.name].links[item.name]}
                                </Text>
                            </View>
                            <Icon
                                name="chevron-small-right"
                                size={20}
                                color={Colors.grey}
                            />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.sectionBody}
                />
            </View>
        );
    }
}

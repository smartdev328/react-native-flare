import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import isArrayLike from 'lodash/isArrayLike';

import NeedContactsPermission from './NeedContactsPermission';
import ContactsList from './ContactsList';

const styles = StyleSheet.create({
    activityWrapper: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
});

const selector = ({
    user: { contacts, contactsCount, contactsState, crewUpdateState },
}) => ({
    contacts,
    contactsCount,
    contactsState,
    loading: crewUpdateState === 'requested',
});

const ContactsListWrapper = ({ handleContactPress }) => {
    const { contacts, contactsState, contactsCount, loading } = useSelector(
        selector
    );

    const sections = React.useMemo(
        () =>
            isArrayLike(contacts)
                ? Array.prototype.map.call(contacts, ({ title }) => title)
                : undefined,
        [contacts]
    );

    if (loading || contactsState === 'requested') {
        return (
            <View style={styles.activityWrapper}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else if (contactsState === 'failed') {
        return <NeedContactsPermission />;
    } else {
        return (
            <ContactsList
                contacts={contacts}
                contactsCount={contactsCount}
                onPressContact={handleContactPress}
                sectionList={sections}
            />
        );
    }
};

export default ContactsListWrapper;

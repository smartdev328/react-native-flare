import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import * as userActions from '../../actions/userActions';
import * as navActions from '../../actions/navActions';
import ContactsList from './ContactsList';
import Colors from '../../bits/Colors';
import CrewList from './CrewList';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';
import { saveButton, settingsNavOptions } from '../Settings';

const MAX_CREW_SIZE = 5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.cream,
    },
    nameFieldContainer: {
        marginBottom: Spacing.small,
    },
    nameField: {
        borderWidth: 1,
        borderColor: Colors.grey,
        paddingLeft: Spacing.small,
    },
    prompt: {
        padding: Spacing.medium,
        fontWeight: 'bold',
        fontSize: Type.size.small,
    },
    instructions: {
        paddingBottom: Spacing.large,
        fontSize: Type.size.medium,
    },
    onboardingHeader: {},
    tutorialOverlay: {
        paddingHorizontal: Spacing.huge,
        paddingBottom: Spacing.medium,
        backgroundColor: Colors.theme.purple,
    },
    tutorialTitle: {
        fontWeight: 'bold',
        fontSize: Type.size.medium,
        marginTop: Spacing.medium,
        marginBottom: Spacing.small,
        color: Colors.white,
        textAlign: 'center',
    },
    tutorialText: {
        color: Colors.white,
        textAlign: 'center',
    },
    tutorialButtons: {
        backgroundColor: Colors.theme.purple,
        paddingBottom: Spacing.medium,
    },
});

const CREW_LIST_ITEM_HEIGHT = 46;

class Contacts extends React.Component {
    static options = () => settingsNavOptions('My Crew', true);

    constructor(props) {
        super(props);
        this.state = {
            crew: props.crew,
            contactSections: null,
            dirty: false,
        };
    }

    componentDidMount() {
        const { fetchContacts } = this.props;
        fetchContacts();
    }

    static getDerivedStateFromProps(props, state) {
        const newState = {};
        const { contacts } = props;
        let needsUpdate = false;

        const sections = contacts.map(({ title }) => title);
        if (sections !== state.contactSections) {
            newState.contactSections = sections;
            needsUpdate = true;
        }

        if (needsUpdate) {
            return newState;
        }

        return null;
    }

    handleContactPress = contact => {
        const {
            crew: { members: oldMembers },
        } = this.state;

        if (!contact || !contact.name || oldMembers.length === MAX_CREW_SIZE) {
            return;
        }

        const memberIndex = oldMembers.findIndex(e => e.key === contact.key);
        const newMembers =
            memberIndex === -1
                ? // If the selected contact is not in the crew, add it
                  [...oldMembers, contact]
                : // The selected contact is in the crew, so remove it by keeping everyone else
                  oldMembers.filter((val, index) => index !== memberIndex);

        this.setState(({ crew }) => ({
            crew: { ...crew, members: newMembers },
            dirty: true,
        }));
    };

    removeCrewMember = contact => {
        const {
            crew: { members: oldMembers },
        } = this.state;

        const memberIndex = oldMembers.findIndex(e => e.id === contact.id);
        const newMembers = oldMembers.filter(
            (val, index) => index !== memberIndex
        );

        this.setState(({ crew }) => ({
            crew: { ...crew, members: newMembers },
            dirty: true,
        }));
    };

    render() {
        const {
            hasCrew,
            contacts,
            contactsCount,
            contactsCrewLookup,
            loading,
            componentId,
        } = this.props;
        const { contactSections, dirty, crew } = this.state;

        Navigation.mergeOptions(componentId, {
            topBar: {
                rightButtons: dirty ? [saveButton] : [],
            },
        });

        const crewListHeight = crew.members.length * CREW_LIST_ITEM_HEIGHT;

        return (
            <View style={styles.container}>
                <View>
                    {hasCrew && (
                        <View>
                            <Text style={styles.prompt}>
                                {Strings.contacts.choosePrompt}
                            </Text>
                        </View>
                    )}
                    {hasCrew && (
                        <View>
                            <Text style={styles.prompt}>
                                {Strings.contacts.chooseInstruction.start}{' '}
                                {crew.members.length}{' '}
                                {Strings.contacts.chooseInstruction.end}
                            </Text>
                            <CrewList
                                style={{
                                    height: crewListHeight,
                                }}
                                crew={crew}
                                onPressContact={this.removeCrewMember}
                            />
                        </View>
                    )}
                </View>
                <ContactsList
                    contacts={contacts}
                    contactsCount={contactsCount}
                    contactsCrewLookup={contactsCrewLookup || {}}
                    onPressContact={this.handleContactPress}
                    sectionList={contactSections}
                />

                <View>{loading && <ActivityIndicator />}</View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { crews } = state.user;
    const crew = crews && crews.length ? crews[0] : { name: null, members: [] };
    return {
        authToken: state.user.authToken,
        crew,
        hasCrew: crew && crew.members && crew.members.length > 0,
        contacts: state.user.contacts,
        contactsCount: state.user.contactsCount,
        contactsCrewLookup: state.user.contactsCrewLookup,
        hasViewedTutorial: state.user.hasViewedTutorial,
        loading: state.user.crewUpdateState === 'requested',
    };
}

const mapDispatchToProps = {
    setCrewMembers: userActions.setCrewMembers,
    fetchContacts: userActions.fetchContacts,
    changeAppRoot: navActions.changeAppRoot,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);

export const openContactsScreen = componentId => {
    Navigation.push(componentId, {
        component: {
            name: 'com.flarejewelry.app.Contacts',
        },
    });
};

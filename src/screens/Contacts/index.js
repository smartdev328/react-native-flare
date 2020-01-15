import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import * as userActions from '../../actions/userActions';
import * as navActions from '../../actions/navActions';
import Button from '../../bits/Button';
import ContactsList from './ContactsList';
import Colors from '../../bits/Colors';
import CommonTop from '../CommonTop';
import CrewList from './CrewList';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';
import { iconsMap } from '../../bits/AppIcons';

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
    static options() {
        return {
            topBar: {
                options: {
                    backgroundColor: Colors.theme.purple,
                },
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            crew: props.crew,
            crewListHeight: props.crew.members.length * CREW_LIST_ITEM_HEIGHT,
            contactSections: null,
        };
    }

    componentDidMount() {
        const { fetchContacts } = this.props;
        fetchContacts();
    }

    static getDerivedStateFromProps(props, state) {
        const newState = {};
        const { crew, contacts } = props;
        let needsUpdate = false;
        if (JSON.stringify(crew) !== JSON.stringify(state.crew)) {
            newState.crew = props.crew;
            newState.crewListHeight =
                props.crew.members.length * CREW_LIST_ITEM_HEIGHT;
            needsUpdate = true;
        }

        const sections = contacts.map(contactSection => contactSection.title);
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
        const { setCrewMembers, authToken } = this.props;
        const { crew } = this.state;
        const { members } = crew;

        if (!contact || !contact.name || members.length === MAX_CREW_SIZE) {
            return;
        }

        const memberIndex = members.findIndex(e => e.key === contact.key);
        let newMembers = null;
        if (memberIndex === -1) {
            // If the selected contact is not in the crew, add it
            newMembers = members.concat(contact);
        } else {
            // The selected contact is in the crew, so remove it by keeping everyone else
            newMembers = members.filter((val, index) => index !== memberIndex);
        }

        crew.members = newMembers;
        this.setState({
            crew,
        });

        const crewId = (crew && crew.id) || 0;
        setCrewMembers(authToken, crewId, newMembers);
    };

    removeCrewMember = contact => {
        const { setCrewMembers, authToken } = this.props;
        const { crew } = this.state;
        const { members } = crew;

        const memberIndex = members.findIndex(e => e.id === contact.id);
        let newMembers = null;
        newMembers = members.filter((val, index) => index !== memberIndex);

        crew.members = newMembers;
        this.setState({
            crew,
        });

        const crewId = (crew && crew.id) || 0;
        setCrewMembers(authToken, crewId, newMembers);
    };

    render() {
        const {
            fromOnboarding,
            hasCrew,
            crew,
            changeAppRoot,
            contacts,
            contactsCount,
            contactsCrewLookup,
            loading,
        } = this.props;
        const { crewListHeight, contactSections } = this.state;
        return (
            <View style={styles.container}>
                {fromOnboarding && (
                    <View style={styles.onboardingHeader}>
                        <View style={styles.tutorialOverlay}>
                            <CommonTop />
                            <Text style={styles.tutorialTitle}>
                                {Strings.onboarding.contacts.overlay.title}
                            </Text>
                            <Text style={styles.tutorialText}>
                                {
                                    Strings.onboarding.contacts.overlay
                                        .instructions
                                }
                            </Text>
                        </View>
                        {hasCrew && (
                            <View style={styles.tutorialButtons}>
                                <CrewList
                                    style={{
                                        height: crewListHeight,
                                    }}
                                    crew={crew}
                                    onPressContact={this.removeCrewMember}
                                />
                                <Button
                                    title={
                                        Strings.onboarding.contacts.overlay
                                            .closeButtonLabel
                                    }
                                    onPress={() => changeAppRoot('secure')}
                                    primary
                                />
                            </View>
                        )}
                    </View>
                )}
                {fromOnboarding && (
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
                )}
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
            options: {
                topBar: {
                    visible: true,
                    animate: false,
                    leftButtons: [
                        {
                            id: 'backButton',
                            icon: iconsMap.back,
                            color: Colors.theme.purple,
                        },
                    ],
                    title: {
                        component: {
                            name: 'com.flarejewelry.app.FlareNavBar',
                            alignment: 'center',
                        },
                    },
                },
            },
        },
    });
};

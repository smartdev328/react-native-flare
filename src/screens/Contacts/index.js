import React from 'react';
import {
    ActivityIndicator,
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
        flexDirection: 'column',
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

class Contacts extends React.Component {
    static options = () => settingsNavOptions('My Crew', true);

    constructor(props) {
        super(props);
        this.state = {
            crew: props.crew,
            contactSections: null,
            dirty: false,
            addedMembers: false,
        };
    }

    componentDidMount() {
        const { fetchContacts } = this.props;
        fetchContacts();
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentWillUnmount() {
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
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
            addedMembers: true,
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

    confirmClose = (title, message, cancel, ok) => {
        const { componentId } = this.props;
        Alert.alert(title, message, [
            {
                style: 'cancel',
                text: cancel,
                onPress: () => {},
            },
            {
                style: 'destructive',
                text: ok,
                onPress: () => {
                    Navigation.pop(componentId);
                },
            },
        ]);
    };

    handleBack = () => {
        const { componentId } = this.props;
        const { dirty, crew } = this.state;
        if (dirty) {
            this.confirmClose(
                'Leave without saving?',
                undefined,
                'Go Back',
                'Yes'
            );
        } else if (!crew || !crew.members || crew.members.length === 0) {
            this.confirmClose(
                'Are you sure you don’t want to add a crew?',
                'If you don’t add a crew, we can’t text your friends with your cuff.',
                'Add a Crew',
                'I’m sure'
            );
        } else {
            Navigation.pop(componentId);
        }
    };

    handleSave = () => {
        const { addedMembers, crew } = this.state;
        if (addedMembers) {
            Navigation.showModal({
                component: {
                    name: 'com.flarejewelry.app.contacts.TextConfirm',
                },
            });
        }
    };

    navigationButtonPressed({ buttonId }) {
        switch (buttonId) {
            case 'backButton':
                this.handleBack();
                break;
            case 'save':
                this.handleSave();
                break;
            default:
                break;
        }
    }

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

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.prompt}>
                    {hasCrew
                        ? Strings.contacts.choosePrompt
                        : `${Strings.contacts.chooseInstruction.start} ${crew.members.length} ${Strings.contacts.chooseInstruction.end}`}
                </Text>
                {hasCrew && (
                    <CrewList
                        crew={crew}
                        onPressContact={this.removeCrewMember}
                    />
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
        },
    });
};

export { default as TextConfirm } from './TextConfirm';

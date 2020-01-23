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
import memoize from 'memoize-one';

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

    computeSections = memoize(contacts => contacts.map(({ title }) => title));

    constructor(props) {
        super(props);
        this.state = {
            crew: props.crew,
            dirty: false,
            addedMembers: false,
        };
    }

    componentDidMount() {
        const {
            fetchContacts,
            textFriendsReset,
            resetSetCrewMembers,
        } = this.props;
        fetchContacts();
        textFriendsReset();
        resetSetCrewMembers();
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentDidUpdate(
        { textFriendsState: prevTextFriendsState, loading: prevLoading },
        { dirty: prevDirty }
    ) {
        const {
            textFriendsState,
            componentId,
            loading,
            crewUpdateState,
        } = this.props;
        const { dirty } = this.state;
        if (
            prevTextFriendsState === 'requested' &&
            textFriendsState !== 'requested'
        ) {
            switch (textFriendsState) {
                case 'confirm':
                    this.performSave();
                    break;
                case 'cancel':
                default:
                    Navigation.pop(componentId);
                    break;
            }
        }
        if (dirty !== prevDirty) {
            Navigation.mergeOptions(componentId, {
                topBar: {
                    rightButtons: dirty ? [saveButton] : [],
                },
            });
        }
        if (loading !== prevLoading) {
            if (crewUpdateState === 'succeeded') {
                Navigation.pop(componentId);
            }
        }
    }

    componentWillUnmount() {
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    performSave = () => {
        const { setCrewMembers, authToken } = this.props;
        const { crew } = this.state;
        setCrewMembers(authToken, crew.id || 0, crew.members);
    };

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
        const { textFriendsRequest } = this.props;
        const { addedMembers } = this.state;
        if (addedMembers) {
            textFriendsRequest();
            Navigation.showModal({
                component: {
                    name: 'com.flarejewelry.app.contacts.TextConfirm',
                },
            });
        } else {
            this.performSave();
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
            contacts,
            contactsCount,
            contactsCrewLookup,
            loading,
        } = this.props;
        const { crew } = this.state;
        const hasCrew = crew && crew.members && crew.members.length > 0;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.prompt}>
                    {hasCrew
                        ? `${Strings.contacts.chooseInstruction.start} ${crew.members.length} ${Strings.contacts.chooseInstruction.end}`
                        : Strings.contacts.choosePrompt}
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
                    sectionList={this.computeSections(contacts)}
                />

                <View>{loading && <ActivityIndicator />}</View>
            </View>
        );
    }
}

const mapStateToProps = ({
    user: {
        crews,
        authToken,
        contacts,
        contactsCount,
        contactsCrewLookup,
        hasViewedTutorial,
        crewUpdateState,
        textFriends,
    },
}) => {
    const crew = crews && crews.length ? crews[0] : { name: null, members: [] };
    return {
        authToken,
        crew,
        contacts,
        contactsCount,
        contactsCrewLookup,
        hasViewedTutorial,
        crewUpdateState,
        loading: crewUpdateState === 'requested',
        textFriendsState: textFriends,
    };
};

const mapDispatchToProps = {
    setCrewMembers: userActions.setCrewMembers,
    fetchContacts: userActions.fetchContacts,
    changeAppRoot: navActions.changeAppRoot,
    textFriendsRequest: userActions.textFriendsRequest,
    textFriendsReset: userActions.textFriendsReset,
    resetSetCrewMembers: userActions.resetSetCrewMembers,
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

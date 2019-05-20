import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { iconsMap } from '../bits/AppIcons';
import ContactsList from '../bits/ContactsList';
import Colors from '../bits/Colors';
import CrewList from '../bits/CrewList';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

import { setCrewMembers, fetchContacts } from '../actions/userActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.medium,
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
        paddingTop: Spacing.small,
        paddingBottom: Spacing.small,
        fontWeight: 'bold',
        fontSize: Type.size.medium,
    },
    instructions: {
        paddingBottom: Spacing.large,
        fontSize: Type.size.medium,
    },
    tutorialOverlay: {
        padding: Spacing.medium,
        backgroundColor: Colors.backgrounds.pink,
        marginBottom: Spacing.medium,
    },
    tutorialTitle: {
        fontWeight: 'bold',
        fontSize: Type.size.medium,
        marginBottom: Spacing.small,
    },
    tutorialText: {},
});

// eslint-disable-next-line react/prefer-stateless-function
class Contacts extends React.Component {
    static options() {
        return {
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
        };
    }

    constructor(props) {
        super(props);
        this.crewListItemHeight = 140;
        this.state = {
            crew: props.crew,
            crewListHeight: props.crew.members.length * this.crewListItemHeight,
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchContacts());
    }

    static getDerivedStateFromProps(props, state) {
        const { crew } = props;
        const crewLength = crew && crew.length;
        if (crewLength !== state.crew.length) {
            return {
                crew: props.crew,
                crewListHeight: props.crew.members.length * this.crewListItemHeight,
            };
        }

        return null;
    }

    handleContactPress(contact) {
        const { crew } = this.state;
        const { members } = crew;

        const memberIndex = members.findIndex(e => e.key === contact.key);
        let newMembers = null;
        if (memberIndex === -1) {
            newMembers = members.concat(contact);
        } else {
            newMembers = members.filter((val, index) => index !== memberIndex);
        }

        crew.members = newMembers;
        this.setState({
            crew,
        });

        const crewId = (this.state.crew && this.state.crew.id) || 0;
        this.props.dispatch(setCrewMembers(this.props.authToken, crewId, newMembers));
    }

    render() {
        const {
            contacts, contactsCount, contactsCrewLookup, crew,
        } = this.props;
        return (
            <View style={styles.container}>
                {!this.props.hasViewedTutorial && (
                    <View style={styles.tutorialOverlay}>
                        <Text style={styles.tutorialTitle}>{Strings.onboarding.contacts.overlay.title}</Text>
                        <Text style={styles.tutorialText}>{Strings.onboarding.contacts.overlay.instructions}</Text>
                    </View>
                )}
                {this.props.hasViewedTutorial && (
                    <View>
                        <Text style={styles.prompt}>{Strings.contacts.choosePrompt}</Text>
                    </View>
                )}
                {this.props.hasViewedTutorial &&
                    this.props.crew &&
                    this.props.crew.members &&
                    this.props.crew.members.length === 0 && (
                    <View>
                        <Text style={styles.instructions}>{Strings.contacts.chooseInstruction}</Text>
                    </View>
                )}
                {this.props.crew && this.props.crew.members && this.props.crew.members.length > 0 && (
                    <CrewList
                        style={{ height: this.state.crewListHeight }}
                        crew={crew}
                        onPressContact={contact => this.handleContactPress(contact)}
                    />
                )}
                <ContactsList
                    contacts={contacts}
                    contactsCount={contactsCount}
                    contactsCrewLookup={contactsCrewLookup || {}}
                    onPressContact={contact => this.handleContactPress(contact)}
                />

                <View>{this.props.loading && <ActivityIndicator />}</View>
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
        contacts: state.user.contacts,
        contactsCount: state.user.contactsCount,
        contactsCrewLookup: state.user.contactsCrewLookup,
        hasViewedTutorial: state.user.hasViewedTutorial,
        loading: state.user.crewUpdateState === 'requested',
    };
}

export default connect(mapStateToProps)(Contacts);

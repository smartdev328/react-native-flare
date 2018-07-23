import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import ContactsList from '../bits/ContactsList';
import Colors from '../bits/Colors';
import CrewList from '../bits/CrewList';
import FlavorStripe from '../bits/FlavorStripe';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

import { setCrewMembers } from '../actions/userActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
});

// eslint-disable-next-line react/prefer-stateless-function
class AddContacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            crew: props.crew,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.crew !== this.props.crew) {
            this.onPropsUpdate();
        }
    }

    onPropsUpdate() {
        this.setState({
            crew: this.props.crew,
        });
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
        this.props.dispatch(setCrewMembers(this.props.token, crewId, newMembers));
    }


    render() {
        const { contacts, contactsCrewLookup, crew } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <FlavorStripe />
                <View style={styles.nameFieldContainer}>
                    <TextInput
                        autoCapitalize="words"
                        placeholder={Strings.contacts.crewNamePlaceholder}
                        style={styles.nameField}
                        value={this.props.crew.name}
                    />
                </View>
                <View>
                    <Text style={styles.prompt}>{Strings.contacts.choosePrompt}</Text>
                </View>
                {this.props.crew && this.props.crew.members && this.props.crew.members.length === 0 &&
                    <View>
                        <Text style={styles.instructions}>
                            {Strings.contacts.chooseInstruction}
                        </Text>
                    </View>
                }
                {this.props.crew && this.props.crew.members && this.props.crew.members.length > 0 &&
                    <CrewList
                        allowDelete
                        crew={crew}
                    />
                }
                <ContactsList
                    contacts={contacts}
                    contactsCrewLookup={contactsCrewLookup || {}}
                    onPressContact={contact => this.handleContactPress(contact)}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    const { crews } = state.user;
    const crew = crews.length ? crews[0] : { name: null, members: [] };
    console.debug(`mapStateToProps has crew ${JSON.stringify(crew)}`);
    return {
        token: state.user.token,
        crew,
        contacts: state.user.contacts,
        contactsCrewLookup: state.user.contactsCrewLookup,
    };
}

export default connect(mapStateToProps)(AddContacts);

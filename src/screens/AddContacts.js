import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
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

    handleContactPress(contact) {
        console.log(`Press on contact ${contact.displayName}.`);
        const { crew } = this.state;
        const { members } = crew;
        
        // toggle the member with the specified number
        const memberIndex = members.findIndex(e => e.key === contact.key);
        if (memberIndex === -1) {
            members.push(contact);
        } else {
            members.splice(memberIndex, 1);
        }

        crew.members = members;
        this.setState({
            crew,
        });

        const crewId = (this.state.crew && this.state.crew.id) || 0;
        this.props.dispatch(setCrewMembers(this.props.token, crewId, members));
    }


    render() {
        const { contacts, crew } = this.props;
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
                {this.props.crew.members.length === 0 &&
                    <View>
                        <Text style={styles.instructions}>
                            {Strings.contacts.chooseInstruction}
                        </Text>
                    </View>
                }
                {this.props.crew.members.length > 0 &&
                    <CrewList
                        allowDelete
                        crew={crew}
                    />
                }
                <ContactsList
                    contacts={contacts}
                    onPressContact={contact => this.handleContactPress(contact)}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    const crews = state.user.crews || [];
    const crew = crews.length ? crews : { name: null, members: [] };
    return {
        token: state.user.token,
        crew,
        contacts: state.user.contacts,
    };
}

export default connect(mapStateToProps)(AddContacts);

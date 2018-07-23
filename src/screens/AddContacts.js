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
import Immutable from 'seamless-immutable';

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
        console.log(`Press on contact ${contact.displayName}.`);
        const { crew } = this.state;
        const { members } = crew;
        
        // toggle the member with the specified number
        const memberIndex = members.findIndex(e => e.key === contact.key);
        let newMembers = null;
        if (memberIndex === -1) {
            console.debug(`Adding contact ${contact}`);
            newMembers = members.concat(contact);
        } else {
            console.debug(`Removing contact ${contact}`);
            newMembers = members.filter((val, index) => index !== memberIndex);
        }

        console.debug(`New crew is ${JSON.stringify(crew)}`);

        crew.members = newMembers;
        this.setState({
            crew,
        });

        const crewId = (this.state.crew && this.state.crew.id) || 0;
        this.props.dispatch(setCrewMembers(this.props.token, crewId, newMembers));
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
    };
}

export default connect(mapStateToProps)(AddContacts);

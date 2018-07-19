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

import Colors from '../bits/Colors';
import CrewList from '../bits/CrewList';
import FlavorStripe from '../bits/FlavorStripe';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: Spacing.medium,
    },
    nameFieldContainer: {
    },
    nameField: {
        borderWidth: 1,
        borderColor: Colors.grey,
    },
});

class AddContacts extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         crew: {
    //             name: null,
    //             members: [],
    //         },
    //     };
    // };

    render() {
        const { crew } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <FlavorStripe />
                <View style={styles.nameFieldContainer}>
                    <TextInput
                        autoCapitalize="words"
                        placeholder={Strings.contacts.crewNamePlaceholder}
                        style={styles.nameField}
                        value={this.props.crew.name}
                        // onChangeText={v => this.changeUserName(v)}
                    />
                </View>
                <View>
                    <Text>{Strings.contacts.choosePrompt}</Text>
                </View>
                {this.props.crew.members.length === 0 &&
                    <View>
                        <Text>{Strings.contacts.chooseInstruction}</Text>
                    </View>                    
                }
                {this.props.crew.members.length > 0 &&
                    <CrewList
                        allowDelete
                        members={this.props.crew.members}
                    />
                }
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    const crews = state.user.crews || [];
    const crew = crews.length ? crews : { name: null, members: [] };
    return {
        crew,
    };
}

export default connect(mapStateToProps)(AddContacts);

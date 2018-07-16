import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import Colors from '../bits/Colors';
import FlavorStripe from '../bits/FlavorStripe';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.white,
    },
});

export default class AddContacts extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                backgroundColor: Colors.theme.purple,
            },        
            headerLeft : <Icon name="menu" size={30} color={Colors.white} />,
            headerTitle: <Image
                source={require('../assets/FLARE-white.png')}
                style={styles.logo}
            />,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            contacts: [],
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <FlavorStripe />
                {this.state.loading &&
                    <ActivityIndicator />
                }
            </KeyboardAvoidingView>
        );
    }
}

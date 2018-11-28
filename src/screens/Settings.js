import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import { summary as configSummary } from '../constants';
import Colors from '../bits/Colors';
import EnvironmentListing from '../bits/EnvironmentListing';
import Strings from '../locales/en';
import Type from '../bits/Type';
import Spacing from '../bits/Spacing';

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
        padding: Spacing.medium,
        backgroundColor: Colors.backgrounds.blue,
        color: Colors.theme.pink,
    },
    section: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: Type.size.large,
        marginBottom: Spacing.medium,
    },
    configItem: {

    },
    configItemTitleWithToggle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    configItemTitle: {
        flex: 3,
        fontSize: Type.size.medium,
        lineHeight: 32,
    },
    configItemToggle: {
        flex: 1,
        padding: 4,
    },
    configItemBody: {
        color: Colors.grey,
    },
    customInputArea: {
        marginTop: Spacing.medium,
        marginBottom: Spacing.medium,
        padding: Spacing.small,
        width: '50%',
        borderRadius: 4,
        backgroundColor: Colors.white,
        borderColor: Colors.grey,
        borderWidth: 2,
    },
});

// eslint-disable-next-line react/prefer-stateless-function
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptType: props.promptType,
            promptValue: props.promptValue,
            dirty: false,
        };
    }

    changePrompt(newPrompt) {
        this.setState({
            promptValue: newPrompt,
        });
    }

    enableCustomPrompt(enable) {
        this.setState({
            promptType: enable ?
                Strings.settings.notifications.customOption :
                Strings.settings.notifications.defaultOption,
            dirty: true,
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {Strings.settings.notifications.title}
                    </Text>
                    <View style={styles.configItem}>
                        <View style={styles.configItemTitleWithToggle}>
                            <Text style={styles.configItemTitle}>
                                {Strings.settings.notifications.promptSelectionTitle}
                            </Text>
                            <Switch
                                onValueChange={enable => this.enableCustomPrompt(enable)}
                                value={this.state.promptType === Strings.settings.notifications.customOption}
                            />
                        </View>

                        <Text style={styles.configItemBody}>
                            {Strings.settings.notifications.promptSelectionBody}
                        </Text>
                        {this.state.promptType === Strings.settings.notifications.customOption &&
                            <View style={styles.customInputArea}>
                                <TextInput
                                    placeholder={Strings.settings.notifications.customPromptPlaceholder}
                                    value={this.state.promptValue}
                                    onChangeText={v => this.changePrompt(v)}
                                />
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {Strings.settings.config.title}
                    </Text>
                    <EnvironmentListing config={configSummary} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        promptType: state.user.settings.promptType,
        promptMessage: state.user.settings.promptMessage,
    };
}

export default connect(mapStateToProps)(Settings);

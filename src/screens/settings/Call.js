import React from 'react';
import { ActivityIndicator, Picker, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { iconsMap } from '../../bits/AppIcons';
import { setCallScript } from '../../actions/userActions';
import CallScripts from '../../constants/CallScripts';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.theme.cream,
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1.2,
        color: Colors.black,
        textTransform: 'uppercase',
        paddingHorizontal: Spacing.large,
        marginBottom: Spacing.medium,
    },
    details: {
        paddingHorizontal: Spacing.large,
    },
});

class SettingsCall extends React.PureComponent {
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
        console.log(`Creating call settings page with script ${props.callScript}`);
        this.state = {
            callScript: props.callScript,
            dirty: false,
        };
    }

    saveCallScript() {
        this.props.dispatch(setCallScript(this.props.authToken, this.state.callScript));
        this.setState({
            dirty: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {Strings.settings.titlePrefix}
                        {Strings.settings.call.title}
                    </Text>
                </View>
                <Text style={styles.details}>{Strings.settings.call.details}</Text>
                <Picker
                    selectedValue={this.state.callScript}
                    onValueChange={itemValue =>
                        this.setState({
                            callScript: itemValue,
                            dirty: true,
                        })
                    }
                >
                    <Picker.Item label={Strings.settings.call.scripts.roomMateFemale} value={CallScripts.Default} />
                    <Picker.Item
                        label={Strings.settings.call.scripts.roomMateMale}
                        value={CallScripts.RoommateNeedsHelpMale}
                    />
                </Picker>
                {this.props.savingSetting && <ActivityIndicator />}
                {this.state.dirty && (
                    <Button
                        primary
                        dark
                        onPress={() => this.saveCallScript()}
                        title={Strings.settings.call.saveButtonLabel}
                    />
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        callScript: state.user.callScript,
        savingSetting: state.user.savingSetting,
    };
}

export default connect(mapStateToProps)(SettingsCall);

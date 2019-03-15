import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import { iconsMap } from '../../bits/AppIcons';
import { setAnalyticsEnabled } from '../../actions/userActions';
import Colors from '../../bits/Colors';
import SettingsToggle from '../../bits/SettingsToggle';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.backgrounds.blue,
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
    },
    title: {
        paddingVertical: Spacing.medium,
        paddingHorizontal: Spacing.small,
        fontSize: Type.size.medium,
    },
    details: {
        paddingHorizontal: Spacing.small,
    },
});

class SettingsPrivacy extends React.PureComponent {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [{
                    id: 'backButton',
                    icon: iconsMap.back,
                    color: Colors.theme.purple,
                }],
                title: {
                    component: {
                        name: 'com.flarejewelry.app.FlareNavBar',
                        alignment: 'center',
                    },
                },
            },
        };
    }

    enableAnalytics(enabled) {
        this.props.dispatch(setAnalyticsEnabled(this.props.token, enabled));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {Strings.settings.titlePrefix}{Strings.settings.privacy.title}
                    </Text>
                    {this.props.savingSetting &&
                        <ActivityIndicator />
                    }
                </View>
                <SettingsToggle
                    label={Strings.settings.privacy.analytics.prompt}
                    value={this.props.analyticsEnabled}
                    onValueChange={enable => this.enableAnalytics(enable)}
                />
                <Text style={styles.details}>
                    {Strings.settings.privacy.analytics.details}
                </Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        analyticsEnabled: state.user.analyticsEnabled,
    };
}

export default connect(mapStateToProps)(SettingsPrivacy);

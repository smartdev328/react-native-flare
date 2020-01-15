import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import isPlainObject from 'is-plain-object';
import { Navigation } from 'react-native-navigation';

import * as userActions from '../../actions/userActions';
import RadioGroup from './RadioGroup';
import { useNavigationButtonCallback } from '../../bits/useNavigationCallback';
import { confirmClose, navOptions, saveButton, styles } from './styles';

const SettingsCall = ({
    authToken,
    savingSetting,
    savedCallScript,
    setCallScript,
    callScripts,
    componentId,
    getCallScripts,
    sawCallScripts,
}) => {
    const [dirty, setDirty] = React.useState(false);
    const [didSave, setDidSave] = React.useState(false);
    const [currentCallScript, setCurrentCallScript] = React.useState(
        savedCallScript
    );

    const onCallScriptSelected = React.useCallback(script => {
        setCurrentCallScript(script);
        setDirty(true);
    }, []);

    const saveCallScript = React.useCallback(() => {
        setCallScript(authToken, currentCallScript);
        setDirty(false);
        setDidSave(true);
    }, [setCallScript, authToken, currentCallScript]);

    React.useEffect(() => {
        sawCallScripts();
        getCallScripts(authToken);
    }, [sawCallScripts, getCallScripts, authToken]);

    React.useEffect(() => {
        if (didSave && !savingSetting) {
            Navigation.pop(componentId);
        }
    }, [savingSetting, componentId, didSave]);

    React.useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                rightButtons: dirty ? [saveButton] : [],
            },
        });
    }, [componentId, dirty]);

    useNavigationButtonCallback(
        ({ buttonId }) => {
            switch (buttonId) {
                case 'backButton':
                    confirmClose(dirty, componentId);
                    break;
                case 'save':
                    saveCallScript();
                    break;
                default:
                    break;
            }
        },
        [saveCallScript, dirty, componentId]
    );

    const pickerItems = React.useMemo(() => {
        if (isPlainObject(callScripts)) {
            return Object.entries(callScripts)
                .filter(([id]) => id !== 'FounderIntro')
                .map(([, { script_name: label, script_id: key }]) => ({
                    key,
                    label,
                }));
        } else {
            return [];
        }
    }, [callScripts]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.subhead}>Select what you’ll hear</Text>
            <RadioGroup
                items={pickerItems}
                selectedItem={currentCallScript}
                onSelected={onCallScriptSelected}
            />
            <Text style={styles.explain}>
                Select which call you’ll hear when you press your cuff once.
            </Text>
        </SafeAreaView>
    );
};

SettingsCall.options = () => navOptions('Cuff Call');

const mapStateToProps = ({
    user: { authToken, callScript, callScripts, savingSetting },
}) => ({
    authToken,
    savedCallScript: callScript,
    callScripts,
    savingSetting,
});

const mapDispatchToProps = {
    setCallScript: userActions.setCallScript,
    getCallScripts: userActions.getCallScripts,
    sawCallScripts: userActions.sawCallScripts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsCall);

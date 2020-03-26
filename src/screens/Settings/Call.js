/* eslint-disable no-console */
import * as React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import isPlainObject from 'lodash/isPlainObject';
import { Navigation } from 'react-native-navigation';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { FlareLogger } from '../../actions/LogAction';
import * as userActions from '../../actions/userActions';
import RadioGroup from './RadioGroup';
import { useNavigationButtonCallback } from '../../bits/useNavigationCallback';
import { confirmClose, navOptions, saveButton, styles } from './styles';

let currentSoundClip;

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
    const [currentlyPlaying, setCurrentlyPlaying] = React.useState();

    function soundDownloadCallback(soundFile, soundName, error) {
        if (error) {
            console.debug('Caching Sounds: failed to load the sound', error);
            return;
        }
        soundFile.setCategory('Playback');
        FlareLogger.debug(
            `duration in seconds: ${soundFile.getDuration()}number of channels: ${soundFile.getNumberOfChannels()}`
        );
        soundFile.setVolume(1);
        console.debug(`Caching Sounds: sound clip downloaded ${soundName}`);
        currentSoundClip = soundFile;
        currentSoundClip.play(success => {
            if (success) {
                console.debug('Caching Sounds: successfully finished playing');
            } else {
                console.debug(
                    'Caching Sounds: playback failed due to audio decoding errors'
                );
            }
        });
    }

    React.useEffect(() => {
        if (currentlyPlaying !== undefined) {
            console.debug('Caching Sounds: currentlyPlaying', currentlyPlaying);

            const previewNameArray = currentlyPlaying.split('/');
            const name = previewNameArray[previewNameArray.length - 1];
            console.debug('Caching Sounds: edited Currently Playing', name);
            const path = `${RNFS.DocumentDirectoryPath}/${name}`;

            if (currentSoundClip !== undefined) currentSoundClip.stop();
            currentSoundClip = new Sound(path, null, error => {
                soundDownloadCallback(
                    currentSoundClip,
                    currentlyPlaying,
                    error
                );
            });
        }
    }, [currentlyPlaying]);

    const clearPlaying = React.useCallback(() => {
        if (currentSoundClip !== undefined) currentSoundClip.stop();
        setCurrentlyPlaying();
    }, []);

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
            if (currentSoundClip !== undefined) currentSoundClip.stop();
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
            const items = Object.values(callScripts).map(
                ({
                    script_name: label,
                    script_id: key,
                    preview_url: preview,
                }) => ({
                    key,
                    label,
                    preview,
                })
            );
            return items;
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
                onPlay={setCurrentlyPlaying}
                onStop={clearPlaying}
                playingPreview={currentlyPlaying}
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

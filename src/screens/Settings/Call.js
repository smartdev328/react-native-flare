import * as React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import isPlainObject from 'lodash/isPlainObject';
import { Navigation } from 'react-native-navigation';
import Sound from 'react-native-sound';
import { FlareLogger } from '../../actions/LogAction';
import * as userActions from '../../actions/userActions';
import RadioGroup from './RadioGroup';
import { useNavigationButtonCallback } from '../../bits/useNavigationCallback';
import { confirmClose, navOptions, saveButton, styles } from './styles';

let cachedSoundsMap = {};
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

    function soundDownloadCallback(soundFile, soundName, error, shouldPlay) {
        if (error) {
            console.debug('failed to load the sound', error);
            return;
        }
        soundFile.setCategory('Playback');
        FlareLogger.debug(
            `duration in seconds: ${soundFile.getDuration()}number of channels: ${soundFile.getNumberOfChannels()}`
        );
        soundFile.setVolume(1);
        console.debug(`sound clip downloaded ${soundName}`);
        cachedSoundsMap[soundName] = soundFile;
        if (shouldPlay) {
            currentSoundClip = soundFile;
            currentSoundClip.play(success => {
                if (success) {
                    console.debug('successfully finished playing');
                } else {
                    console.debug(
                        'playback failed due to audio decoding errors'
                    );
                }
            });
        }
    }

    function cacheSoundClips(soundClips) {
        soundClips.forEach((v, k) => {
            const soundFile = new Sound(v.preview, null, error => {
                soundDownloadCallback(soundFile, v.preview, error, false);
            });
        });
    }

    React.useEffect(() => {
        if (currentlyPlaying !== undefined) {
            console.debug('currentlyPlaying', currentlyPlaying);
            const newSoundClip = cachedSoundsMap[currentlyPlaying];
            if (newSoundClip !== undefined) {
                console.debug('found sound in cache');
                if (currentSoundClip !== undefined) currentSoundClip.stop();
                currentSoundClip = newSoundClip;
                currentSoundClip.play(success => {
                    if (success) {
                        console.debug('successfully finished playing');
                    } else {
                        console.debug(
                            'playback failed due to audio decoding errors'
                        );
                    }
                });
            } else {
                console.debug("couldn't find sound in cache, downloading");
                currentSoundClip = new Sound(currentlyPlaying, null, error => {
                    soundDownloadCallback(
                        currentSoundClip,
                        currentlyPlaying,
                        error,
                        true
                    );
                });
            }
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
            cacheSoundClips(items);
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

/* eslint-disable no-console */

import Sound from 'react-native-sound';
import { FlareLogger } from '../actions/LogAction';

const cachedCallSounds = new Map();

export function getCallSound(name) {
    return cachedCallSounds[name];
}

export function getCallScriptName(callScriptUrl) {
    const previewNameArray = callScriptUrl.split('/');
    return previewNameArray[previewNameArray.length - 1];
}

export function cacheCallSounds(callScriptData) {
    const items = Object.values(callScriptData.data).map(
        ({ script_name: label, script_id: key, preview_url: preview }) => ({
            key,
            label,
            preview,
        })
    );
    items.forEach(v => {
        const name = getCallScriptName(v.preview);
        const soundClip = new Sound(v.preview, null, error => {
            if (error) {
                console.debug(error);
                return null;
            }
            soundClip.setCategory('Playback');
            FlareLogger.debug(
                `duration in seconds: ${soundClip.getDuration()}number of channels: ${soundClip.getNumberOfChannels()}`
            );
            soundClip.setVolume(1);
            console.debug(`Sound clip downloaded ${name}`);

            cachedCallSounds[name] = soundClip;
        });
    });
}

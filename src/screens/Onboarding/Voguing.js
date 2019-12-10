import * as React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

import voguing from '../../assets/voguing.mp4';

const Voguing = () => (
    <Video
        style={StyleSheet.absoluteFill}
        repeat
        source={voguing}
        resizeMode="cover"
    />
);

export default Voguing;

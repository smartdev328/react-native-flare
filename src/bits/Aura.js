import React from 'react';
import { Image } from 'react-native';
import useDimensions from './useDimensions';

const Aura = ({ source = 'aura-4' }) => {
    const dims = useDimensions();
    const sourceObj = React.useMemo(
        () => (typeof source === 'string' ? { uri: source } : source),
        [source]
    );
    const style = React.useMemo(
        () => ({
            position: 'absolute',
            left: 0,
            right: 0,
            width: dims.width,
            height: dims.height,
        }),
        [dims.height, dims.width]
    );
    return <Image source={sourceObj} style={style} resizeMode="cover" />;
};

export default Aura;

import React from 'react';
import { Image } from 'react-native';

const RandomImage = ({ sources, ...rest }) => {
    const randomIndex = React.useMemo(
        () => Math.floor(Math.random() * sources.length),
        [sources.length]
    );
    const currentSource = sources[randomIndex];

    return <Image {...rest} source={currentSource} />;
};

export default RandomImage;

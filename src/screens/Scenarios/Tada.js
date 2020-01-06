import * as React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import tada from '../../assets/lotties/tada';

const Tada = () => (
    <AnimatedLottieView
        source={tada}
        style={{ width: 250, height: 250 }}
        autoPlay
        loop
    />
);

export default Tada;

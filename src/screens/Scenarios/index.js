import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Intro from './Intro';

const Scenarios = () => {
    return (
        <SafeAreaProvider>
            <Intro />
        </SafeAreaProvider>
    );
};

export default Scenarios;

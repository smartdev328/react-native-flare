import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Intro from './Intro';
import WeirdVibes from './WeirdVibes';

const Scenarios = () => {
    const [screen, setScreen] = React.useState('intro');

    const weirdVibes = React.useCallback(() => {
        setScreen('weirdVibes');
    }, []);

    return (
        <SafeAreaProvider>
            {(() => {
                switch (screen) {
                    case 'intro':
                        return <Intro onNext={weirdVibes} />;
                    case 'weirdVibes':
                        return <WeirdVibes />;
                    default:
                        return null;
                }
            })()}
        </SafeAreaProvider>
    );
};

export default Scenarios;

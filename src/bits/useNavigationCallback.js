import * as React from 'react';
import { Navigation } from 'react-native-navigation';

export const useNavigationButtonCallback = (callback, deps) => {
    React.useEffect(() => {
        const subscription = Navigation.events().registerNavigationButtonPressedListener(
            callback
        );
        return () => {
            subscription.remove();
        };
    }, deps);
};

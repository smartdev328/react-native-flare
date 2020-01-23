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

export const useSlideMenu = componentId => {
    const [showSideMenu, setShowSideMenu] = React.useState(false);

    useNavigationButtonCallback(
        ({ buttonId }) => {
            if (buttonId === 'menuButton') {
                Navigation.mergeOptions(componentId, {
                    sideMenu: {
                        left: {
                            visible: !showSideMenu,
                        },
                    },
                });
                setShowSideMenu(!showSideMenu);
            }
        },
        [componentId, showSideMenu]
    );
};

/**
 * Wrapper for icons to use in react native navigation
 * https://github.com/wix/react-native-navigation/issues/2705
 */
import { PixelRatio } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Entypo';

const navIconSize = __DEV__ === false && Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(25) : 25;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    menu: [navIconSize],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
    Promise.all(Object.keys(icons).map(iconName =>
        // IconName--suffix--other-suffix is just the mapping name in iconsMap
        MaterialIcons.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1],
        )))
        .then((sources) => {
            Object.keys(icons).forEach((iconName, idx) => {
                iconsMap[iconName] = sources[idx];
            });
            resolve(true);
        });
});

export { iconsMap, iconsLoaded };

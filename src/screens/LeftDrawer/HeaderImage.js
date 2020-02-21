import * as React from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import useDimensions from '../../bits/useDimensions';
import RandomImage from '../../bits/RandomImage';

import menuPhoto1 from '../../assets/menu-photo-1.jpg';
import menuPhoto2 from '../../assets/menu-photo-2.jpg';
import menuPhoto3 from '../../assets/menu-photo-3.jpg';

const imageSources = [menuPhoto1, menuPhoto2, menuPhoto3];

const HeaderImage = () => {
    const dimensions = useDimensions();

    const topImageSize = dimensions.height * 1.1;
    const computedStyles = React.useMemo(
        () => ({
            purpleCircle: {
                position: 'absolute',
                backgroundColor: '#4C5282',
                left: 75,
                top: -354,
                width: topImageSize,
                height: topImageSize,
                borderRadius: topImageSize / 2,
            },
            orangeCircle: {
                position: 'absolute',
                backgroundColor: '#F9885E',
                left: 25,
                top: -337,
                width: topImageSize,
                height: topImageSize,
                borderRadius: topImageSize / 2,
                opacity: 0.34,
            },
            maskContainer: {
                position: 'absolute',
                left: 60,
                top: -210,
                width: topImageSize,
                height: topImageSize,
            },
            mask: {
                width: topImageSize,
                height: topImageSize,
                borderRadius: topImageSize / 2,
                backgroundColor: 'black',
            },
            topImageStyle: {
                width: topImageSize / 2,
                height: topImageSize - 20,
                resizeMode: 'cover',
                opacity: 0.32,
            },
        }),
        [topImageSize]
    );
    return (
        <>
            <View style={computedStyles.purpleCircle} />
            <View style={computedStyles.orangeCircle} />
            <MaskedView
                style={computedStyles.maskContainer}
                maskElement={<View style={computedStyles.mask} />}
            >
                <RandomImage
                    sources={imageSources}
                    style={computedStyles.topImageStyle}
                />
            </MaskedView>
        </>
    );
};

export default HeaderImage;

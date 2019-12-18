/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Shape, Surface } from '@react-native-community/art';
import { StyleSheet } from 'react-native';

import Colors from './Colors';

const styles = StyleSheet.create({
    surface: {
        marginBottom: 11,
    },
});

const PATHS = [
    'm 36.361,23.831 c -6.888161,-4.622073 -16.411174,-4.622015 -23.3,0',
    'M 41.53,16.176 C 31.582711,9.5020363 17.831247,9.5021187 7.883,16.176',
    'm 46.703,8.525 c -13.005791,-8.73337157 -30.992941,-8.73325494 -44,0',
];

const Geyser = () => {
    const [pathIndex, setPathIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setPathIndex(i => (i + 1) % 4);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Surface width={50} height={27} style={styles.surface}>
            {PATHS.map(
                (path, index) =>
                    index <= pathIndex &&
                    pathIndex !== 3 && (
                        <Shape
                            key={index}
                            d={path}
                            stroke={Colors.black}
                            strokeCap="round"
                            strokeJoin="round"
                            strokeWidth={3.9}
                        />
                    )
            )}
        </Surface>
    );
};

export default Geyser;

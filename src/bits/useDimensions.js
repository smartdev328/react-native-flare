import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useDimensions = () => {
    const [dimensions, setDimensions] = useState(() =>
        Dimensions.get('window')
    );

    useEffect(() => {
        const onChange = ({ window }) => {
            setDimensions(window);
        };

        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    }, []);

    return dimensions;
};

export default useDimensions;

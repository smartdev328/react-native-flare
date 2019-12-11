import * as React from 'react';
import { SafeAreaView } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import styles from './styles';
import GetStarted from './GetStarted';

const AddHardware = ({ componentId }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ViewPager
                style={styles.pager}
                scrollEnabled={false}
                keyboardDismissMode="none"
                transitionStyle="scroll"
            >
                <GetStarted componentId={componentId} />
            </ViewPager>
        </SafeAreaView>
    );
};

export default AddHardware;

/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { navOptions, styles } from './styles';

import chevron from '../../assets/chevron.png';

const Home = ({ componentId }) => {
    const openCall = React.useCallback(() => {
        Navigation.push(componentId, {
            component: { name: 'com.flarejewelry.app.settings.Call' },
        });
    }, [componentId]);

    const openNotifs = React.useCallback(() => {
        Navigation.push(componentId, {
            component: { name: 'com.flarejewelry.app.settings.Notifications' },
        });
    }, [componentId]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subhead}>
                <Text style={{ fontWeight: 'bold' }}>Press</Text> for a call
            </Text>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item} onPress={openCall}>
                    <Text style={styles.text}>Choose Your Call</Text>
                    <Image
                        resizeMode="center"
                        source={chevron}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={[styles.subhead, { marginTop: 48 }]}>
                <Text style={{ fontWeight: 'bold' }}>Hold</Text> for a friend
            </Text>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item} onPress={openNotifs}>
                    <Text style={styles.text}>
                        Customize Your Notifications
                    </Text>
                    <Image
                        resizeMode="center"
                        source={chevron}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.explain}>
                Choose if and how you are notified that a flare was sent to your
                crew here.
            </Text>
        </SafeAreaView>
    );
};

Home.options = navOptions('Settings', false);

export default Home;

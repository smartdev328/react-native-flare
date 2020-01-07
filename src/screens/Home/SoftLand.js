import * as React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Aura from '../../bits/Aura';
import Colors from '../../bits/Colors';
import Constellation from './Constellation';
import TaskCard from './TaskCard';

import aura599 from '../../assets/aura-599.jpg';
import outlineHands from '../../assets/outline-hands.png';
import useDimensions from '../../bits/useDimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headline: {
        textAlign: 'center',
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        fontSize: 20,
        marginBottom: 24,
        marginTop: 48,
    },
    list: {
        marginTop: 96,
        alignSelf: 'stretch',
    },
    spacer: {
        width: 48,
    },
});

const ITEM_TEMPLATES = [
    {
        key: 'crew',
        title: 'Choose your backup',
        body:
            'Which friends do you want your Flare cuff to text? This is your crew.',
        done: () => false,
    },
    {
        key: 'call-script',
        title: 'Pick the perfect Cuff-Call',
        body:
            'What script do you want to hear when we call you? Choose the best for you.',
        done: () => false,
    },
    {
        key: 'notifs',
        title: 'Customize Notifications',
        body:
            'How do you want to be notified that your text has been sent? Choose your level of discretion.',
        done: () => false,
    },
    {
        key: 'test',
        title: 'Test your cuff',
        body: 'Test your cuff to learn how it works and when to use it.',
        done: () => true,
    },
    {
        key: 'pair',
        title: 'Pair your Flare Cuff',
        body: 'Connect your jewelry with your app for the first time.',
        done: () => true,
    },
    {
        key: 'permissions',
        title: 'Always allow location',
        body: '“Always allow” your location and turn Bluetooth on.',
        done: () => true,
    },
];

const SoftLand = () => {
    const selector = useSelector(() => null);
    const items = ITEM_TEMPLATES.map(({ done, ...rest }) => ({
        done: done(selector),
        ...rest,
    }));
    const doneCount = items.filter(({ done }) => done).length;

    const { width: screenWidth } = useDimensions();
    const cardWidth = screenWidth - 96;

    const renderItem = React.useCallback(
        ({ item }) => (
            <TaskCard {...item} image={outlineHands} width={cardWidth} />
        ),
        [cardWidth]
    );

    const getItemLayout = React.useCallback(
        (data, index) => ({
            length: cardWidth,
            offset: 48 + index * cardWidth,
            index,
        }),
        [cardWidth]
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Aura source={aura599} />
            <Text style={styles.headline}>Your Safety Setup</Text>
            <Constellation count={doneCount} />
            <FlatList
                style={styles.list}
                data={items}
                extraData={cardWidth}
                renderItem={renderItem}
                horizontal
                ListHeaderComponent={<View style={styles.spacer} />}
                ListFooterComponent={<View style={styles.spacer} />}
                snapToAlignment="start"
                snapToInterval={cardWidth}
                decelerationRate="fast"
                getItemLayout={getItemLayout}
            />
        </SafeAreaView>
    );
};

export default SoftLand;

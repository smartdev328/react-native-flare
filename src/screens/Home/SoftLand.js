import * as React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import isPlainObject from 'is-plain-object';

import Aura from '../../bits/Aura';
import Colors from '../../bits/Colors';
import Constellation from './Constellation';
import TaskCard from './TaskCard';
import useDimensions from '../../bits/useDimensions';
import { openContactsScreen } from '../Contacts';
import { getCallScripts } from '../../actions/userActions';

import aura599 from '../../assets/aura-599.jpg';
import outlineHands from '../../assets/outline-hands.png';

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
        done: ({ haveCrew }) => haveCrew,
    },
    {
        key: 'callscript',
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
        done: ({ locationPermission }) => locationPermission,
    },
];

const SoftLand = ({ componentId }) => {
    const dispatch = useDispatch();
    const selector = useSelector(
        ({
            user: {
                authToken,
                crews,
                permissions: { location: locationPermission },
                callScripts,
            },
        }) => ({
            authToken,
            locationPermission,
            haveCrew:
                Array.isArray(crews) &&
                crews.some(
                    crew =>
                        'members' in crew &&
                        Array.isArray(crew.members) &&
                        crew.members.length > 0
                ),
            haveCallScripts:
                isPlainObject(callScripts) &&
                Object.keys(callScripts).length > 0,
        })
    );

    const callbacks = {
        crew: React.useCallback(() => openContactsScreen(componentId), [
            componentId,
        ]),
    };

    const items = ITEM_TEMPLATES.map(({ done, key, ...rest }) => ({
        done: done(selector),
        key,
        onPress: callbacks[key],
        ...rest,
    })).sort(({ done: done1 }, { done: done2 }) => done1 - done2);
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

    // preload list of call scripts if we've never seen them before, so as to
    // lower the odds of them being not yet available when we want to show
    // the UI
    React.useEffect(() => {
        if (selector.authToken && !selector.haveCallScripts) {
            dispatch(getCallScripts(selector.authToken));
        }
    }, [selector.haveCallScripts, selector.authToken, dispatch]);

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

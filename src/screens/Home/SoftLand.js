import * as React from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSafeArea } from 'react-native-safe-area-context';
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
        flexGrow: 0,
        marginTop: 40,
    },
    listContainer: {
        alignSelf: 'stretch',
        height: 200,
    },
    spacer: {
        width: 48,
    },
    bottomCard: {
        backgroundColor: Colors.theme.cream,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column',
        marginTop: 'auto',
        alignSelf: 'stretch',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'stretch',
        height: 46,
        marginTop: -23,
        width: 180,
    },
    toggleItem: {
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.theme.cream,
        borderWidth: 1,
    },
    toggleItemLeft: {
        borderTopLeftRadius: 23,
        borderBottomLeftRadius: 23,
        borderRightWidth: 0,
        paddingLeft: 4,
    },
    toggleItemRight: {
        borderTopRightRadius: 23,
        borderBottomRightRadius: 23,
        borderLeftWidth: 0,
        paddingRight: 4,
    },
    toggleItemSelected: {
        backgroundColor: Colors.black,
    },
    toggleItemUnselected: {
        backgroundColor: '#B77CA3',
    },
    toggleText: {
        color: Colors.theme.cream,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Nocturno Display Std',
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
        done: ({ sawCallScripts }) => sawCallScripts,
    },
    {
        key: 'notifs',
        title: 'Customize Notifications',
        body:
            'How do you want to be notified that your text has been sent? Choose your level of discretion.',
        done: ({ sawNotifSettings }) => sawNotifSettings,
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
                sawCallScripts,
                sawNotifSettings,
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
            sawCallScripts,
            sawNotifSettings,
        })
    );
    const insets = useSafeArea();

    const [showDone, setShowDone] = React.useState(false);
    const setDone = React.useCallback(() => setShowDone(true), []);
    const setUnDone = React.useCallback(() => setShowDone(false), []);

    const callbacks = {
        crew: React.useCallback(() => openContactsScreen(componentId), [
            componentId,
        ]),
        callscript: React.useCallback(() => {
            Navigation.push(componentId, {
                component: { name: 'com.flarejewelry.app.settings.Call' },
            });
        }, [componentId]),
        notifs: React.useCallback(() => {
            Navigation.push(componentId, {
                component: {
                    name: 'com.flarejewelry.app.settings.Notifications',
                },
            });
        }, [componentId]),
        permissions: React.useCallback(() => {
            Navigation.showModal({
                component: { name: 'com.flarejewelry.app.PermissionsReminder' },
            });
        }, []),
    };

    const items = ITEM_TEMPLATES.map(({ done, key, ...rest }) => ({
        done: done(selector),
        key,
        onPress: callbacks[key],
        ...rest,
    }));
    const doneCount = items.filter(({ done }) => done).length;
    const filteredItems = items.filter(({ done }) => done === showDone);

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
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" />
            <Aura source={aura599} />
            <Text style={styles.headline}>Your Safety Setup</Text>
            <Constellation count={doneCount} />
            <View style={[styles.bottomCard]}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleItem,
                            styles.toggleItemLeft,
                            showDone
                                ? styles.toggleItemUnselected
                                : styles.toggleItemSelected,
                        ]}
                        onPress={setUnDone}
                    >
                        <Text style={styles.toggleText}>To do</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleItem,
                            styles.toggleItemRight,
                            showDone
                                ? styles.toggleItemSelected
                                : styles.toggleItemUnselected,
                        ]}
                        onPress={setDone}
                    >
                        <Text style={styles.toggleText}>Done</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={[styles.list, { paddingBottom: insets.bottom + 40 }]}
                    contentContainerStyle={styles.listContainer}
                    data={filteredItems}
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
            </View>
        </View>
    );
};

export default SoftLand;

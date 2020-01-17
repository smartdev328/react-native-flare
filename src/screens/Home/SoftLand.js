import * as React from 'react';
import {
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
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
import DoneItem from './DoneItem';
import useDimensions from '../../bits/useDimensions';
import { openContactsScreen } from '../Contacts';
import { getCallScripts } from '../../actions/userActions';
import count from '../../bits/count';
import shareFlare from '../../bits/shareFlare';

import aura1528 from '../../assets/aura-1528.jpg';
import cardCrew from '../../assets/card-crew.png';
import cardNotifs from '../../assets/card-notifs.png';
import cardCallscript from '../../assets/card-callscript.png';
import cardPermissions from '../../assets/card-permissions.png';
import cardShare from '../../assets/card-share.png';

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
    subhead: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        fontSize: 20,
        marginTop: 12,
        marginHorizontal: 56,
    },
    list: {
        flexGrow: 0,
        marginTop: 16,
        paddingBottom: 12,
    },
    listContainer: {
        alignSelf: 'stretch',
        height: 224,
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
        image: { source: cardCrew, width: 106, height: 79 },
        title: 'Choose your backup',
        body:
            'Which friends do you want your Flare cuff to text? This is your crew.',
        done: ({ haveCrew }) => haveCrew,
    },
    {
        key: 'notifs',
        image: { source: cardNotifs, width: 84, height: 88 },
        title: 'Customize Notifications',
        body:
            'How do you want to be notified that your text has been sent? Choose your level of discretion.',
        done: ({ sawNotifSettings }) => sawNotifSettings,
    },
    {
        key: 'callscript',
        image: { source: cardCallscript, width: 69, height: 91 },
        title: 'Pick the perfect Cuff-Call',
        body:
            'What script do you want to hear when we call you? Choose the best for you.',
        done: ({ sawCallScripts }) => sawCallScripts,
    },
    {
        key: 'permissions',
        image: { source: cardPermissions, width: 119, height: 77 },
        title: 'Allow Location and Bluetooth',
        body: '“Always allow” your location and turn Bluetooth on.',
        done: ({ locationPermission }) => locationPermission,
    },
    {
        key: 'share',
        image: { source: cardShare, width: 83, height: 89 },
        title: 'Share Flare 💕',
        body:
            'Invite your friends to join the movement. Send a special promo code.',
        done: () => false,
    },
    {
        key: 'onboard',
        title: 'Onboard with Flare',
        body: 'Test your cuff to learn how it works and when to use it.',
        done: () => true,
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
                referralKey,
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
            referralKey,
        })
    );
    const insets = useSafeArea();

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
        share: React.useCallback(() => {
            shareFlare(selector.referralKey);
        }, [selector.referralKey]),
    };

    const items = ITEM_TEMPLATES.map(({ done, key, ...rest }) => ({
        done: done(selector),
        key,
        onPress: callbacks[key],
        ...rest,
    }));
    const doneCount = count(items, ({ done }) => done);
    const doneItems = items.filter(({ done }) => done);
    const undoneItems = items.filter(({ done }) => !done);

    const { width: screenWidth } = useDimensions();
    const cardWidth = screenWidth - 96;

    const renderItem = React.useCallback(
        ({ item }) => <TaskCard {...item} width={cardWidth} />,
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
            <Aura source={aura1528} />
            <ScrollView
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: insets.bottom + 32,
                }}
            >
                <Text style={styles.headline}>Your Safety Setup</Text>
                <Constellation count={doneCount} />
                <FlatList
                    style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={undoneItems}
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
                <Text style={styles.subhead}>Completed</Text>
                {doneItems.map(item => (
                    <DoneItem {...item} />
                ))}
            </ScrollView>
        </View>
    );
};

export default SoftLand;

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Colors from './Colors';
import CrewActionTypes from '../constants/CrewActionConstants';
import FlareDate from './FlareDate';
import Strings from '../locales/en';
import Spacing from './Spacing';
import Type from './Type';

const styles = StyleSheet.create({
    commonEvent: {
        marginTop: Spacing.small,
        marginBottom: Spacing.small,
        padding: Spacing.small,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: Colors.theme.peach,
    },
    status: {
        flex: 1,
        flexDirection: 'column',
    },
    message: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        fontSize: Type.size.small,
    },
    timestamp: {
        fontSize: 10,
    },
    messageFrom: {
        fontSize: Type.size.tiny,
    },
    messageBody: {
        fontSize: Type.size.small,
        fontWeight: 'bold',
    },
});

const typeSpecificColors = [
    // See CrewActionTypes definitions, lookup by index
    Colors.black, // unknown
    Colors.theme.blue, // notification
    Colors.theme.blue, // response
    Colors.theme.purple, // cancel
    Colors.theme.black, // create
    Colors.theme.pink, // join
    Colors.theme.purple, // expire
    Colors.theme.black, // sentToNoonlight
    Colors.theme.black, // noonlightSuccess
];

const CrewActionConstantToStringToken = [
    'unknown',
    'notify',
    'response',
    'cancel',
    'create',
    'join',
    'expire',
    'sentToNoonlight',
    'noonlightSuccess',
];

const CrewMessage = ({
    event: { name, message, timestamp, action_type: type },
}) => (
    <View
        style={[
            styles.commonEvent,
            styles.message,
            { borderLeftColor: typeSpecificColors[type] },
        ]}
    >
        <Text style={styles.messageFrom}>{name}</Text>
        <Text style={styles.messageBody}>{message}</Text>
        <View>
            <Text style={styles.timestamp}>
                <FlareDate timestamp={timestamp} />
            </Text>
        </View>
    </View>
);

const CrewStatus = ({ type, event: { name, timestamp } }) => (
    <View
        style={[
            styles.commonEvent,
            styles.status,
            { borderLeftColor: typeSpecificColors[type] },
        ]}
    >
        <View>
            {type !== CrewActionTypes.Join && (
                <Text style={styles.statusHeading}>
                    {[
                        Strings.crewEventTimeline.headings[
                            CrewActionConstantToStringToken[type]
                        ],
                        name,
                        name ? '.' : undefined,
                    ].join('')}
                </Text>
            )}
            {type === CrewActionTypes.Join && (
                <Text style={styles.statusHeading}>
                    {[name, Strings.crewEventTimeline.headings.join].join(' ')}
                </Text>
            )}
        </View>
        <View>
            <Text style={styles.timestamp}>
                <FlareDate timestamp={timestamp} />
            </Text>
        </View>
    </View>
);

const CrewEvent = ({ event }) => {
    switch (event.action_type) {
        case CrewActionTypes.Notification:
        case CrewActionTypes.Cancel:
        case CrewActionTypes.Create:
        case CrewActionTypes.Join:
        case CrewActionTypes.Expire:
        case CrewActionTypes.SentToNoonlight:
        case CrewActionTypes.NoonlightSuccess:
            return <CrewStatus type={event.action_type} event={event} />;
        case CrewActionTypes.Response:
            return <CrewMessage event={event} />;
        default:
            return <CrewStatus type={CrewActionTypes.Unknown} event={event} />;
    }
};

const keyExtractor = event => `${event.timestamp}-${event.id}`;
const renderItem = ({ item }) => <CrewEvent event={item} />;

const CrewEventTimeline = ({ containerStyle, timeline, onRefresh }) => {
    const flatListRef = React.useRef();

    const haveTimeline = timeline?.length > 0;
    const scrollToEnd = React.useCallback(() => {
        if (haveTimeline) {
            flatListRef?.current?.scrollToEnd({ animated: true });
        }
    }, [haveTimeline]);

    return (
        <View style={containerStyle}>
            <FlatList
                data={timeline}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshing={false}
                onRefresh={onRefresh}
                ref={flatListRef}
                onContentSizeChange={scrollToEnd}
                onLayout={scrollToEnd}
            />
        </View>
    );
};

export default CrewEventTimeline;

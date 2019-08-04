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
];

const CrewActionConstantToStringToken = ['unknown', 'notify', 'response', 'cancel', 'create', 'join'];

const CrewMessage = props => (
    <View style={[styles.commonEvent, styles.message, { borderLeftColor: typeSpecificColors[props.type] }]}>
        <Text style={styles.messageFrom}>{props.event.name}</Text>
        <Text style={styles.messageBody}>{props.event.message}</Text>
        <View>
            <Text style={styles.timestamp}>
                <FlareDate timestamp={props.event.timestamp} />
            </Text>
        </View>
    </View>
);

const CrewStatus = props => (
    <View style={[styles.commonEvent, styles.status, { borderLeftColor: typeSpecificColors[props.type] }]}>
        <View>
            {props.type !== CrewActionTypes.Join && (
                <Text style={styles.statusHeading}>
                    {Strings.crewEventTimeline.headings[CrewActionConstantToStringToken[props.type]]}
                    {props.event.name && ' '}
                    {props.event.name}
                    {props.event.name && '.'}
                </Text>
            )}
            {props.type === CrewActionTypes.Join && (
                <Text style={styles.statusHeading}>
                    {props.event.name} {Strings.crewEventTimeline.headings.join}
                </Text>
            )}
        </View>
        <View>
            <Text style={styles.timestamp}>
                <FlareDate timestamp={props.event.timestamp} />
            </Text>
        </View>
    </View>
);

const CrewEvent = (props) => {
    switch (props.event.action_type) {
    case CrewActionTypes.Notification:
    case CrewActionTypes.Cancel:
    case CrewActionTypes.Create:
    case CrewActionTypes.Join:
        return <CrewStatus type={props.event.action_type} event={props.event} />;
    case CrewActionTypes.Response:
        return <CrewMessage event={props.event} />;
    default:
        return <CrewStatus type={CrewActionTypes.Unknown} event={props.event} />;
    }
};

const CrewEventTimeline = props => (
    <View style={props.containerStyle}>
        <FlatList
            data={props.timeline}
            renderItem={({ item }) => <CrewEvent event={item} />}
            keyExtractor={event => `${event.timestamp}-${event.id}`}
            refreshing={false}
            onRefresh={() => props.onRefresh()}
            ref={(ref) => {
                this.flatList = ref;
            }}
            onContentSizeChange={() => {
                if (props.timeline && props.timeline.length > 0) {
                    this.flatList.scrollToEnd({ animated: true });
                }
            }}
            onLayout={() => {
                if (props.timeline && props.timeline.length > 0) {
                    this.flatList.scrollToEnd({ animated: true });
                }
            }}
        />
    </View>
);

export default CrewEventTimeline;

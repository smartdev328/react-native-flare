import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from './Colors';
import CrewActionTypes from '../constants/CrewActionConstants';
import FlareDate from './FlareDate';
import Strings from '../locales/en';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    commonEvent: {
        marginTop: Spacing.small,
        marginBottom: Spacing.small,
        padding: Spacing.small,
        borderRadius: 12,
    },
    status: {
        flex: 1,
        flexDirection: 'column',
    },
    message: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 14,
        borderWidth: 1,
        borderColor: Colors.backgrounds.pink,
    },
    timestamp: {
        fontSize: 10,
        color: Colors.theme.pink,
    },
    messageFrom: {
        fontSize: 8,
        color: Colors.theme.pink,
    },
    messageBody: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
});

const CrewActionConstantToStringToken = [
    'unknown',
    'notify',
    'response',
    'cancel',
    'create',
    'join',
];

const CrewMessage = props => (
    <View style={[styles.commonEvent, styles.message]}>
        <Text style={styles.messageFrom}>
            {props.event.name}
        </Text>
        <Text style={styles.messageBody}>
            {props.event.message}
        </Text>
        <View>
            <Text style={styles.timestamp}>
                <FlareDate timestamp={props.event.timestamp} />
            </Text>
        </View>
    </View>
);

const CrewStatus = props => (
    <View style={[styles.commonEvent, styles.status]}>
        <View>
            {props.type !== CrewActionTypes.Join &&
                <Text style={styles.statusHeading}>
                    {Strings.crewEventTimeline.headings[CrewActionConstantToStringToken[props.type]]}
                    {props.event.name && ' '}
                    {props.event.name}
                    {props.event.name && '.'}
                </Text>
            }
            {props.type === CrewActionTypes.Join &&
                <Text style={styles.statusHeading}>
                    {props.event.name} {Strings.crewEventTimeline.headings.join}
                </Text>
            }
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

export default class CrewEventTimeline extends React.PureComponent {
    render() {
        return (
            <FlatList
                data={this.props.timeline}
                renderItem={({ item }) => <CrewEvent event={item} />}
                keyExtractor={event => `${event.timestamp}-${event.id}`}
                refreshing={false}
                onRefresh={() => this.props.onRefresh()}
                ref={(ref) => { this.flatList = ref; }}
                onContentSizeChange={() => {
                    if (this.props.timeline && this.props.timeline.length > 0) {
                        this.flatList.scrollToEnd({ animated: true });
                    }
                }}
                onLayout={() => {
                    if (this.props.timeline && this.props.timeline.length > 0) {
                        this.flatList.scrollToEnd({ animated: true });
                    }
                }}
            />
        );
    }
}

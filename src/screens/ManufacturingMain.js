import React from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Navigation } from 'react-native-navigation';

import { BeaconTypes } from '../bits/BleConstants';
import { manufacturingCheckin } from '../actions/beaconActions';
import { signOut } from '../actions/authActions';
import getDeviceCounts from '../actions/manufacturingActions';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceStages from '../bits/DeviceStages';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flex: 16,
    },
    header: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.large,
    },
    logoArea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: Spacing.small,
    },
    logoImage: {
        resizeMode: 'contain',
        width: 110,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    brandArea: {
        flex: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerActions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: Spacing.small,
    },
});

class ManufacturingMain extends React.Component {
    componentDidMount() {
        this.props.dispatch(getDeviceCounts(this.props.token));
    }

    handleSignOut() {
        this.props.dispatch(signOut());
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.manufacturing.main',
            },
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoArea}>
                        <Image
                            source={require('../assets/flare_dark.png')}
                            style={styles.logoImage}
                        />
                    </View>
                    <View style={styles.brandArea}>
                        <Text>{Strings.manufacturing.title}</Text>
                    </View>
                    <View style={styles.headerActions}>
                        {this.props.manufacturingLoading &&
                            <ActivityIndicator />
                        }
                        <Button
                            outline
                            onPress={() => this.handleSignOut()}
                            title={Strings.generic.signOut}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <DeviceStages
                        stages={Object.keys(Strings.manufacturing.stages)}
                        deviceCounts={this.props.deviceCounts}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        cancelingActiveFlare: state.user.cancelingActiveFlare,
        hasActiveFlare: state.user.hasActiveFlare,
        deviceCounts: state.manufacturing.deviceCounts,
        manufacturingLoading: state.manufacturing.loading,
    };
}

export default connect(mapStateToProps)(ManufacturingMain);

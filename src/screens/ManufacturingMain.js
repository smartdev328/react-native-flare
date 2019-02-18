import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { signOut } from '../actions/authActions';
import Button from '../bits/Button';
import DeviceStages from '../bits/DeviceStages';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Colors from '../bits/Colors';

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
    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.manufacturing.main',
            },
        });
    }

    handleSignOut() {
        this.props.dispatch(signOut());
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
                        devices={this.props.deviceCounts}
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
        deviceCounts: {
            new: [],
            added: [],
            burnIn: [],
            ready: [],
        },
    };
}

export default connect(mapStateToProps)(ManufacturingMain);

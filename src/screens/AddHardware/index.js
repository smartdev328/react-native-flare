import * as React from 'react';
import { StatusBar, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Navigation } from 'react-native-navigation';
import {
    SafeAreaConsumer,
    SafeAreaProvider,
} from 'react-native-safe-area-context';

import styles from './styles';
import GetStarted from './GetStarted';
import WhiteBar from '../Onboarding/WhiteBar';
import LocationPrimer from './LocationPrimer';
import AlwaysAllow from './AlwaysAllow';
import Pairing from './Pairing';
import Aura from '../../bits/Aura';

import aura1519 from '../../assets/aura-1519.jpg';

class AddHardware extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            page: 0,
        };
        this.pagerRef = React.createRef();
    }

    nextPage = () => {
        const { page } = this.state;
        this.pagerRef.current.setPage(page + 1);
        this.setState({ page: page + 1 });
    };

    prevPage = () => {
        const { page } = this.state;
        this.pagerRef.current.setPage(page - 1);
        this.setState({ page: page - 1 });
    };

    aboutPermissions = () => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    };

    finish = () => {
        const { componentId } = this.props;
        Navigation.push(componentId, {
            component: {
                name: 'com.flarejewelry.scenarios',
                options: { topBar: { visible: false } },
            },
        });
    };

    render() {
        const { componentId, insets } = this.props;
        const { page } = this.state;

        const bottomMargin = { marginBottom: insets.bottom };

        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar
                    barStyle={page >= 2 ? 'light-content' : 'dark-content'}
                />
                {page >= 2 && <Aura source={aura1519} />}
                <WhiteBar
                    black={page < 2}
                    showLogo={false}
                    goBack={this.prevPage}
                    showBack={page === 3}
                />
                <ViewPager
                    ref={this.pagerRef}
                    style={styles.pager}
                    scrollEnabled={false}
                    keyboardDismissMode="none"
                    transitionStyle="scroll"
                >
                    <LocationPrimer
                        style={bottomMargin}
                        nextPage={this.nextPage}
                        tellMeMore={this.aboutPermissions}
                    />
                    <AlwaysAllow
                        style={bottomMargin}
                        nextPage={this.nextPage}
                        tellMeMore={this.aboutPermissions}
                    />
                    <GetStarted
                        componentId={componentId}
                        nextPage={this.nextPage}
                    />
                    <Pairing nextPage={this.finish} />
                </ViewPager>
            </View>
        );
    }
}

const AddHardwareWithProvider = props => (
    <SafeAreaProvider>
        <SafeAreaConsumer>
            {insets => <AddHardware insets={insets} {...props} />}
        </SafeAreaConsumer>
    </SafeAreaProvider>
);

export default AddHardwareWithProvider;

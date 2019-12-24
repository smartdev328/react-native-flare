import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import styles from './styles';
import GetStarted from './GetStarted';
import WhiteBar from '../Onboarding/WhiteBar';
import LocationPrimer from './LocationPrimer';
import Pairing from './Pairing';
import Success from './Success';
import Aura from '../../bits/Aura';

import auraSixLight from '../../assets/aura-6-light.jpg';

class AddHardware extends React.Component {
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

    render() {
        const { componentId } = this.props;
        const { page } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                {page === 2 && <Aura source={auraSixLight} />}
                <WhiteBar
                    black
                    showLogo={false}
                    goBack={this.prevPage}
                    showBack={page !== 0 && page !== 3}
                />
                <ViewPager
                    ref={this.pagerRef}
                    style={styles.pager}
                    scrollEnabled={false}
                    keyboardDismissMode="none"
                    transitionStyle="scroll"
                >
                    <GetStarted
                        componentId={componentId}
                        nextPage={this.nextPage}
                    />
                    <LocationPrimer nextPage={this.nextPage} />
                    <Pairing nextPage={this.nextPage} />
                    <Success componentId={componentId} />
                </ViewPager>
            </SafeAreaView>
        );
    }
}

export default AddHardware;

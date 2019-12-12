import * as React from 'react';
import { SafeAreaView } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import styles from './styles';
import GetStarted from './GetStarted';
import WhiteBar from '../Onboarding/WhiteBar';
import LocationPrimer from './LocationPrimer';
import Pairing from './Pairing';

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
                <WhiteBar
                    showLogo={false}
                    goBack={this.prevPage}
                    showBack={page > 0}
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
                    <Pairing />
                </ViewPager>
            </SafeAreaView>
        );
    }
}

export default AddHardware;

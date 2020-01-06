/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

const InsetsHOC = WrappedComponent =>
    class extends React.Component {
        render() {
            const { props } = this;
            return (
                <SafeAreaConsumer>
                    {insets => <WrappedComponent {...props} insets={insets} />}
                </SafeAreaConsumer>
            );
        }
    };

export default InsetsHOC;

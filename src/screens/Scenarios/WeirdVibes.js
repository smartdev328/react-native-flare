import * as React from 'react';
import { Text } from 'react-native';

import Scenario from './Scenario';
import pizzaWoman from '../../assets/pizza-woman.png';

const greenGradient = ['#007461FF', '#00877A00'];
const blueGradient = ['#B6C6F800', '#A9BBFBFF'];

const FirstQuote = () => (
    <>The party started to give me weird vibes. I was ready to leave.</>
);
const SecondQuote = () => (
    <>
        Flare gave me an easy excuse.{' '}
        <Text style={{ fontStyle: 'italic' }}>Bye y’all.</Text>
    </>
);

const WeirdVibes = props => (
    <Scenario
        {...props}
        topGradient={greenGradient}
        bottomGradient={blueGradient}
        image={pizzaWoman}
        FirstQuote={FirstQuote}
        SecondQuote={SecondQuote}
    />
);

export default WeirdVibes;

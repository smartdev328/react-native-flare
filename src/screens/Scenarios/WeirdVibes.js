import * as React from 'react';
import { Text } from 'react-native';

import Scenario from './Scenario';
import womenPair from '../../assets/women-pair.png';

const blueGradient = ['#6978F6FF', '#6978F600'];
const pinkGradient = ['#FEE5DB00', '#FFE1D6FF'];

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
        topGradient={blueGradient}
        bottomGradient={pinkGradient}
        image={womenPair}
        FirstQuote={FirstQuote}
        SecondQuote={SecondQuote}
    />
);

export default WeirdVibes;

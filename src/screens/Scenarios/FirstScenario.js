import * as React from 'react';

import Scenario from './Scenario';
import womenPair from '../../assets/women-pair.png';

const blueGradient = ['#6978F6FF', '#6978F600'];
const pinkGradient = ['#FEE5DB00', '#FFE1D6FF'];

const FirstQuote = () => (
    <>
        I went home with my date, but turns out we were on different pages. I
        wasn’t into it, but they weren’t getting it.
    </>
);
const SecondQuote = () => (
    <>I used Flare to step away and decide what I wanted to do next.</>
);

const FirstScenario = props => (
    <Scenario
        {...props}
        topGradient={blueGradient}
        bottomGradient={pinkGradient}
        image={womenPair}
        FirstQuote={FirstQuote}
        SecondQuote={SecondQuote}
        cardHead="You need an interruption."
        cardBody="Would you rather…"
    />
);

export default FirstScenario;

import * as React from 'react';
import Scenario from './Scenario';
import pizzaWoman from '../../assets/pizza-woman.png';

const greenGradient = ['#007461FF', '#00877A00'];
const blueGradient = ['#B6C6F800', '#A9BBFBFF'];

const FirstQuote = () => (
    <>
        I went home with my date, but it just didn’t feel right once I was
        there. I didn’t want to hurt their feelings but…
    </>
);
const SecondQuote = () => (
    <>
        I wanted to leave. I used flare to help me leave without making a scene.
    </>
);

const UncomfortableDate = props => (
    <Scenario
        {...props}
        topGradient={greenGradient}
        bottomGradient={blueGradient}
        image={pizzaWoman}
        FirstQuote={FirstQuote}
        SecondQuote={SecondQuote}
    />
);

export default UncomfortableDate;

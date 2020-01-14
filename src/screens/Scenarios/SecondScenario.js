import * as React from 'react';
import Scenario from './Scenario';
import pizzaWoman from '../../assets/pizza-woman.png';

const greenGradient = ['#007461FF', '#00877A00'];
const blueGradient = ['#B6C6F800', '#A9BBFBFF'];

const FirstQuote = () => (
    <>
        When the party started to die down, things got sketchy and I felt stuck.
    </>
);
const SecondQuote = () => (
    <>I left the party without making a scene. Glad I listened to my gut.</>
);

const SecondScenario = props => (
    <Scenario
        {...props}
        topGradient={greenGradient}
        bottomGradient={blueGradient}
        image={pizzaWoman}
        FirstQuote={FirstQuote}
        SecondQuote={SecondQuote}
        cardHead="Use an excuse to leave."
        cardBody="Try out the other feature!"
    />
);

export default SecondScenario;

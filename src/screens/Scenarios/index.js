import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Intro from './Intro';
import WeirdVibes from './WeirdVibes';
import FakeCall from './FakeCall';
import addToContactsFunction from '../AddToContacts';
import UncomfortableDate from './UncomfortableDate';
import TextYourCrew from './TextYourCrew';
import * as regActions from '../../actions/regActions';
import TextSimulator from './TextSimulator';
import * as userActions from '../../actions/userActions';
import * as actions from '../../actions';
import GoldenRules from './GoldenRules';

const Scenarios = ({
    screen,
    didCall,
    didText,
    gotPress,
    token,
    busy,
    done,
    awaitShortPress,
    awaitLongPress,
    setScenarioScreen,
    setOnboardingComplete,
    changeAppRoot,
    dispatch,
}) => {
    React.useEffect(() => {
        if (gotPress && screen === 'textYourCrew') {
            setScenarioScreen('textSimulator');
        }
    }, [gotPress, screen, setScenarioScreen]);

    React.useEffect(() => {
        if (done) {
            changeAppRoot('secure');
        }
    }, [changeAppRoot, done]);

    const didFirst = didCall || didText;

    const intro = React.useCallback(() => {
        setScenarioScreen('intro');
    }, [setScenarioScreen]);
    const weirdVibes = React.useCallback(() => {
        setScenarioScreen('weirdVibes');
    }, [setScenarioScreen]);
    const fakeCall = React.useCallback(() => {
        awaitShortPress();
        setScenarioScreen('fakeCall');
    }, [awaitShortPress, setScenarioScreen]);
    const textYourCrew = React.useCallback(() => {
        awaitLongPress();
        setScenarioScreen('textYourCrew');
    }, [awaitLongPress, setScenarioScreen]);
    const uncomfortableDate = React.useCallback(() => {
        setScenarioScreen('uncomfortableDate');
    }, [setScenarioScreen]);
    const currentScenario = React.useCallback(() => {
        setScenarioScreen(didFirst ? 'uncomfortableDate' : 'weirdVibes');
    }, [didFirst, setScenarioScreen]);
    const currentScenarioAgain = React.useCallback(() => {
        setScenarioScreen(
            didFirst ? 'uncomfortableDateAgain' : 'weirdVibesAgain'
        );
    }, [didFirst, setScenarioScreen]);
    const goldenRules = React.useCallback(
        () => setScenarioScreen('goldenRules'),
        [setScenarioScreen]
    );
    const addToContacts = React.useCallback(
        () => addToContactsFunction(dispatch),
        [dispatch]
    );
    const finishUp = React.useCallback(() => {
        setOnboardingComplete(token);
    }, [setOnboardingComplete, token]);

    return (
        <SafeAreaProvider>
            {(() => {
                switch (screen) {
                    case 'intro':
                        return <Intro onNext={weirdVibes} />;
                    case 'weirdVibes':
                        return (
                            <WeirdVibes
                                onBack={intro}
                                fakeCall={didCall ? undefined : fakeCall}
                                textCrew={didText ? undefined : textYourCrew}
                            />
                        );
                    case 'weirdVibesAgain':
                        return (
                            <WeirdVibes
                                postDemo
                                nextScenario={uncomfortableDate}
                                addToContacts={addToContacts}
                            />
                        );
                    case 'uncomfortableDate':
                        return (
                            <UncomfortableDate
                                fakeCall={didCall ? undefined : fakeCall}
                                textCrew={didText ? undefined : textYourCrew}
                            />
                        );
                    case 'uncomfortableDateAgain':
                        return (
                            <UncomfortableDate
                                postDemo
                                finishUp={goldenRules}
                                busy={busy}
                                addToContacts={addToContacts}
                            />
                        );
                    case 'fakeCall':
                        return (
                            <FakeCall
                                onBack={currentScenario}
                                onSuccess={currentScenarioAgain}
                            />
                        );
                    case 'textYourCrew':
                        return <TextYourCrew onBack={currentScenario} />;
                    case 'textSimulator':
                        return (
                            <TextSimulator onSuccess={currentScenarioAgain} />
                        );
                    case 'goldenRules':
                        return <GoldenRules finishUp={finishUp} />;
                    default:
                        return null;
                }
            })()}
        </SafeAreaProvider>
    );
};

const mapStateToProps = ({
    user: {
        scenarios = {},
        authToken,
        settingOnboardingComplete,
        hasViewedTutorial,
    },
}) => ({
    token: authToken,
    busy: settingOnboardingComplete,
    done: hasViewedTutorial,
    screen: scenarios.screen || 'intro',
    didCall: typeof scenarios.didCall === 'boolean' ? scenarios.didCall : false,
    didText: typeof scenarios.didText === 'boolean' ? scenarios.didText : false,
    gotPress: scenarios.longPress === 'done',
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            awaitShortPress: regActions.awaitShortPress,
            awaitLongPress: regActions.awaitLongPress,
            setScenarioScreen: regActions.setScenarioScreen,
            setOnboardingComplete: userActions.setOnboardingComplete,
            changeAppRoot: actions.changeAppRoot,
        },
        dispatch
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scenarios);

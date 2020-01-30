import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Intro from './Intro';
import FakeCall from './FakeCall';
import FirstScenario from './FirstScenario';
import SecondScenario from './SecondScenario';
import addToContactsFunction from '../AddToContacts';
import TextYourCrew from './TextYourCrew';
import * as regActions from '../../actions/regActions';
import TextSimulator from './TextSimulator';
import * as userActions from '../../actions/userActions';
import * as actions from '../../actions';
import GoldenRules from './GoldenRules';
import ForcePermission from './ForcePermission';

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
    startBleListening,
    locationPermission,
}) => {
    React.useEffect(() => {
        if (locationPermission) {
            startBleListening();
        }
    }, [locationPermission, startBleListening]);

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
    const firstScenario = React.useCallback(() => {
        setScenarioScreen('firstScenario');
    }, [setScenarioScreen]);
    const fakeCall = React.useCallback(() => {
        awaitShortPress();
        setScenarioScreen('fakeCall');
    }, [awaitShortPress, setScenarioScreen]);
    const textYourCrew = React.useCallback(() => {
        awaitLongPress();
        setScenarioScreen('textYourCrew');
    }, [awaitLongPress, setScenarioScreen]);
    const secondScenario = React.useCallback(() => {
        setScenarioScreen('secondScenario');
    }, [setScenarioScreen]);
    const currentScenario = React.useCallback(() => {
        setScenarioScreen(didFirst ? 'secondScenario' : 'firstScenario');
    }, [didFirst, setScenarioScreen]);
    const currentScenarioAgain = React.useCallback(() => {
        setScenarioScreen(
            didFirst ? 'secondScenarioAgain' : 'firstScenarioAgain'
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
                    case 'permission':
                        return <ForcePermission onNext={intro} />;
                    case 'intro':
                        return <Intro onNext={firstScenario} />;
                    case 'firstScenario':
                        return (
                            <FirstScenario
                                onBack={intro}
                                fakeCall={didCall ? undefined : fakeCall}
                                textCrew={didText ? undefined : textYourCrew}
                            />
                        );
                    case 'firstScenarioAgain':
                        return (
                            <FirstScenario
                                postDemo
                                nextScenario={secondScenario}
                                addToContacts={addToContacts}
                            />
                        );
                    case 'secondScenario':
                        return (
                            <SecondScenario
                                fakeCall={didCall ? undefined : fakeCall}
                                textCrew={didText ? undefined : textYourCrew}
                            />
                        );
                    case 'secondScenarioAgain':
                        return (
                            <SecondScenario
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
        permissions: { location },
    },
}) => ({
    token: authToken,
    busy: settingOnboardingComplete,
    done: hasViewedTutorial,
    screen: scenarios.screen || (location ? 'intro' : 'permission'),
    didCall: typeof scenarios.didCall === 'boolean' ? scenarios.didCall : false,
    didText: typeof scenarios.didText === 'boolean' ? scenarios.didText : false,
    gotPress: scenarios.longPress === 'done',
    locationPermission: location,
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
            startBleListening: actions.startBleListening,
            getPermission: userActions.getPermission,
        },
        dispatch
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scenarios);

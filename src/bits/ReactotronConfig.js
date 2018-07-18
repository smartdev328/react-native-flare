import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { REACTOTRON_HOST } from '../constants/index';

// eslint-disable-next-line
export function startReactotron() {
    console.log(`Starting reactotron to default host.`);
    Reactotron
        // .configure({ server: REACTOTRON_HOST, port: 9090 }) // controls connection & communication settings
        .configure()
        .useReactNative() // add all built-in react native plugins
        .use(reactotronRedux())
        .connect(); // let's connect!
}

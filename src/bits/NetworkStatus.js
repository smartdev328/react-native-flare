import NetInfo from '@react-native-community/netinfo';

import { FlareLogger } from '../actions/LogAction';

let unsubscribe;

export class NetworkLogger {
    static StartNetworkLogging() {
        unsubscribe = NetInfo.addEventListener(state => {
            FlareLogger.info('Connection Updated', {
                connection_info: {
                    connection_type: state.type,
                    is_connected: state.isConnected,
                },
            });
        });
    }

    static StopNetworkLogging() {
        unsubscribe();
    }
}

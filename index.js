import App from './src/App';

if (typeof global === 'object' && !('Buffer' in global)) {
    // eslint-disable-next-line global-require
    global.Buffer = require('buffer').Buffer;
}

const app = new App();

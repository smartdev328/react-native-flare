import moment from 'moment';
import { ANALYTICS_TRANSMIT_INTERVAL, ANALYTICS_TRANSMIT_BATCH_SIZE } from '../constants/Config';
import sendAnalyticsEvents from '../actions/analyticsActions';

export default class Analytics {
    constructor() {
        /**
         * Maintain two queues for events so that we can simultaneously receive new
         * events while submitting old events to the server.
         */
        this.eventQueues = [[], []];
        this.receiveQueueIndex = 0;
        this.transmitQueueIndex = 1;

        // Periodically transmit events for persistence / processing.
        this.backgroundTimer = null;
    }

    startRecording(options) {
        this.store = options.store;
        this.token = this.store.getState().user.token;
        this.backgroundTimer = setInterval(() => {
            this.transmit();
        }, ANALYTICS_TRANSMIT_INTERVAL);
    }

    stopRecording() {
        clearInterval(this.backgroundTimer);
    }

    swapQueueIndexes() {
        if (this.receiveQueueIndex === 0) {
            this.receiveQueueIndex = 0;
            this.transmitQueueIndex = 1;
        } else {
            this.receiveQueueIndex = 1;
            this.transmitQueueIndex = 0;
        }
    }

    logEvent(type, extraDetails) {
        const event = {
            type,
            timestamp: moment().utc(),
        };

        if (extraDetails) {
            event.details = extraDetails;
        }

        this.eventQueue.push(event);
    }

    flushTransmitQueue() {
        const toTransmit = this.eventQueues[this.transmitQueueIndex].length;
        if (toTransmit === 0) {
            return;
        }

        const batches = Math.ceil(toTransmit / ANALYTICS_TRANSMIT_BATCH_SIZE);
        for (let batch = 0; batch < batches; batch += 1) {
            const start = batch * ANALYTICS_TRANSMIT_BATCH_SIZE;
            const end = start + ANALYTICS_TRANSMIT_BATCH_SIZE;
            const sending = this.eventQueues[this.transmitQueueIndex].slice(start, end);
            this.store.dispatch(sendAnalyticsEvents(this.token, sending));
        }
    }

    transmit() {
        // Do nothing if both queues are empty
        const received = this.eventQueues[this.receiveQueueIndex].length;
        const toTransmit = this.eventQueues[this.transmitQueueIndex].length;
        const total = received + toTransmit;
        if (total === 0) {
            return;
        }

        // Flush the transmit queue if it's not empty
        if (toTransmit > 0) {
            this.flushTransmitQueue();
        }

        // Swap queue indexes so that we continue receiving new events
        this.swapQueueIndexes();

        // Batch transmit entries in the transmit queue, deleting each batch if transmission
        // was successful.
        this.flushTransmitQueue();
    }
}

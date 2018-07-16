const ErrorCodes = {
    Generic: 0,
};

class FlareException {
    constructor(message) {
        this.message = message;
        this.code = ErrorCodes.Generic;
    }

    toString() {
        return `${this.code}: ${this.message}`;
    }
}

export {
    FlareException,
    ErrorCodes,
};

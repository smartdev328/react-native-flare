/* global navigator */
// eslint-disable-next-line
function getCurrentPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            ({ code, message }) => reject(Object.assign(new Error(message), { name: 'PositionError', code })),
            options,
        );
    });
}

export default {
    getCurrentPosition,
};

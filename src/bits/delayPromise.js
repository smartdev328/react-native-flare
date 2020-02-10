export const delayPromise = (timeout, value = undefined) =>
    new Promise(resolve => {
        setInterval(() => {
            resolve(value);
        }, timeout);
    });

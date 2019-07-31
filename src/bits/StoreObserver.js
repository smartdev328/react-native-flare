/**
 * Observe the specified selector values in the given store, and call the
 * given callback when those values change.
 */
export default store => (selector, callback) => {
    // Assume empty old state
    const oldState = {};

    // Use redux store subscribe to observe all changes.
    return store.subscribe(() => {
        // Use selector to limit which store changes we observe.
        const selectedState = selector(store.getState());
        const newState = {};
        // For each state property that we're observing, compare the current
        // and old values.
        Object.entries(selectedState).map(([key, value]) => {
            // If the state property has changed, call the callback
            // to announce it.
            if (oldState[key] !== value) {
                newState[key] = value;
                // Save the old property as new so that we don't repeatedly
                // announce the same change.
                oldState[key] = value;
            }
        });
        callback(newState);
    });
};

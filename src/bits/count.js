const count = (arraylike, predicate = () => true) =>
    Array.prototype.reduce.call(
        arraylike,
        (accumulator, item) =>
            predicate(item) ? accumulator + 1 : accumulator,
        0
    );

export default count;

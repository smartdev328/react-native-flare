// https://bitbucket.org/flare-eng/api/src/22099d771bc9025469a7c6af169e7c1cd6434383/backend/api/phone_utils.py#lines-9:32

// This is all US/Canada only for now, which is fine. But investigate using
// libphonenumber and/or relying only on server-side logic when this becomes
// a problem.

export const cleanPhone = raw => {
    if (typeof raw !== 'string') {
        return null;
    }

    const candidate = raw.replace(/[^0-9]/, '');
    if (candidate.length === 11 && candidate[0] === '1') {
        return `+${candidate}`;
    } else if (candidate.length === 10) {
        return `+1${candidate}`;
    } else {
        return null;
    }
};

export const formatPhone = raw => {
    const cleaned = cleanPhone(raw);
    if (typeof cleaned !== 'string') {
        return null;
    }
    const groups = /^(\+1)([0-9]{3})([0-9]{3})([0-9]{4})$/.exec(cleaned);
    if (!groups) {
        return null;
    }
    return `${groups[1]} ${groups[2]}-${groups[3]}-${groups[4]}`;
};

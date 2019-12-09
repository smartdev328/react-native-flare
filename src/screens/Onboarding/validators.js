const NAME_REGEX = /^(.*\p{Script=Latn}) (\p{Script=Latin}.*)$/u;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/u;
const PHONE_REGEX = /^\+?1?[ -()]*[2-9](?:[0-9]){9}$/;

export const validateName = name => {
    if (typeof name !== 'string' || name.length < 3) {
        return 'Please enter your name';
    } else if (!NAME_REGEX.test(name)) {
        return 'Please enter your first and last name';
    } else {
        return null;
    }
};

export const validateEmail = email => {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
        return 'Please enter your email address';
    } else {
        return null;
    }
};

export const validatePhone = phone => {
    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone)) {
        return 'Please enter your phone number';
    } else {
        return null;
    }
};

export const validatePassword = password => {
    if (typeof password !== 'string' || password.length < 8) {
        return 'Please enter a password of at least 8 characters';
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
        return 'Please choose a password containing an uppercase letter, a lowercase letter, and a digit or symbol';
    }

    return null;
};

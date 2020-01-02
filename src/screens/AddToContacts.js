import Contacts from 'react-native-contacts';
import { didAddToContacts } from '../actions/regActions';

const FLARE = {
    givenName: '✨ Fake Name Here ✨',
    phoneNumbers: [
        {
            label: 'mobile',
            number: '+1 (857) 273-8007',
        },
    ],
};

const openContactForm = arg =>
    new Promise((resolve, reject) => {
        Contacts.openContactForm(arg, (error, contact) => {
            if (error) {
                reject(error);
            } else {
                resolve(contact);
            }
        });
    });

const addToContacts = dispatch => {
    openContactForm(FLARE).then(contact => {
        if (contact) {
            dispatch(didAddToContacts());
        }
    }, console.warn);
};

export default addToContacts;

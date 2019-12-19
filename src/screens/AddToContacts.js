import Contacts from 'react-native-contacts';

const FLARE = {
    givenName: '✨ Fake Name Here ✨',
    phoneNumbers: [
        {
            label: 'mobile',
            number: '+1 (857) 273-8007',
        },
    ],
};

const addToContacts = () => {
    Contacts.openContactForm(FLARE, console.warn);
};

export default addToContacts;

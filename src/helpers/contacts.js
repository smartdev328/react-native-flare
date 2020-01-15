import Contacts from 'react-native-contacts';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

export const getAllContacts = () =>
    new Promise((resolve, reject) => {
        Contacts.getAllWithoutPhotos((err, contacts) => {
            if (err) {
                reject(err);
            } else {
                resolve(contacts);
            }
        });
    });

const validComponent = component =>
    typeof component === 'string' && component.length > 0;

export const filterContacts = (rawContacts, sortOrder) => {
    const fullContacts = rawContacts.flatMap(
        ({
            familyName,
            givenName,
            middleName,
            company,
            recordID,
            phoneNumbers,
        }) => {
            const haveName = [givenName, middleName, familyName].some(
                validComponent
            );
            const name = haveName
                ? [givenName, middleName, familyName]
                      .filter(validComponent)
                      .join(' ')
                : company;
            const sortKey = (haveName && sortOrder === 'family_name'
                ? [familyName, givenName, middleName]
                      .filter(validComponent)
                      .join(' ')
                : name
            )
                .toLocaleUpperCase()
                .normalize('NFKD');
            const firstLetter = sortKey[0];
            const section =
                firstLetter >= 'A' && firstLetter <= 'Z' ? firstLetter : '#';
            return phoneNumbers.map(({ label, number }) => ({
                name,
                sortKey,
                key: `${recordID}${label}${number}`,
                label,
                phone: number,
                section,
            }));
        }
    );
    const sortedContacts = sortBy(fullContacts, ['sortKey', 'label', 'number']);
    const sectionedContacts = Object.entries(
        groupBy(sortedContacts, 'section')
    ).map(([title, data]) => ({ title, data }));
    return {
        contacts: sortBy(sectionedContacts, ({ title }) =>
            title === '#' ? '\uFFFF' : title
        ),
        count: sortedContacts.length,
    };
};

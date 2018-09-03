// eslint-disable-next-line import/prefer-default-export
export function filterContacts(rawContacts) {
    const contacts = [];
    for (let contactIndex = 0; contactIndex < rawContacts.length; contactIndex += 1) {
        const { givenName, middleName, familyName } = rawContacts[contactIndex];
        const name =
            [givenName, middleName, familyName]
                .join(' ')
                .replace(/\s\s+/g, ' ');

        const contactInfo = {
            name,
        };
        const { phoneNumbers } = rawContacts[contactIndex];
        const duplicateNumberCheck = {};
        for (let phoneIndex = 0; phoneIndex < phoneNumbers.length; phoneIndex += 1) {
            const strippedNumber = phoneNumbers[phoneIndex].number.replace(/[^0-9]/g, '');
            if (!Object.hasOwnProperty.call(duplicateNumberCheck, strippedNumber)) {
                duplicateNumberCheck[strippedNumber] = null;
                const contact = Object.assign({}, contactInfo, {
                    key: strippedNumber,
                    label: phoneNumbers[phoneIndex].label,
                    phone: phoneNumbers[phoneIndex].number,
                });
                contacts.push(contact);
            }
        }
    }

    const sections = {};
    contacts.forEach((contact) => {
        const firstLetter = contact.name.length > 0 ? contact.name[0] : '?';
        if (!Object.prototype.hasOwnProperty.call(sections, firstLetter)) {
            sections[firstLetter] = [];
        }
        const contactWithSection = Object.assign({}, contact, {
            section: firstLetter,
        });
        sections[firstLetter].push(contactWithSection);
    });

    const organizedContacts = [];
    const sortedKeys = Object.keys(sections).sort();
    sortedKeys.forEach((sectionKey) => {
        organizedContacts.push({
            title: sectionKey.toLocaleUpperCase(),
            data: sections[sectionKey],
        });
    });

    return organizedContacts;
}

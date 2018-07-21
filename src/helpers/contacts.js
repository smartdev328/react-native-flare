// eslint-disable-next-line import/prefer-default-export
export function filterContacts(rawContacts) {
    const contacts = [];
    for (let contactIndex = 0; contactIndex < rawContacts.length; contactIndex += 1) {
        const { givenName, middleName, familyName } = rawContacts[contactIndex];
        const displayName =
            [givenName, middleName, familyName]
                .join(' ')
                .replace(/\s\s+/g, ' ');

        const contactInfo = {
            displayName,
        };
        const { phoneNumbers } = rawContacts[contactIndex];
        for (let phoneIndex = 0; phoneIndex < phoneNumbers.length; phoneIndex += 1) {
            const contact = Object.assign({}, contactInfo, {
                label: phoneNumbers[phoneIndex].label,
                number: phoneNumbers[phoneIndex].number,
            });
            contacts.push(contact);
        }
    }

    const sections = {};
    contacts.forEach((contact) => {       
        const firstLetter = contact.displayName.length > 0 ? contact.displayName[0] : '?';
        if (!Object.prototype.hasOwnProperty.call(sections, firstLetter)) {
            sections[firstLetter] = [];
        }
        sections[firstLetter].push(contact);
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

export default function useFilteringContacts(contacts, { searchText }) {
	if (!searchText) return contacts.allContacts;
	return contacts.allContacts.filter(contact => contact.name.includes(searchText));
}

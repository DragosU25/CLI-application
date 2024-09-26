import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

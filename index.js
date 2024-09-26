import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contact = await getContactById(id);
        if (contact) {
          console.log(contact);
        } else {
          console.log(`Contact with id ${id} not found.`);
        }
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        if (newContact) {
          console.log("Added contact:", newContact);
        } else {
          console.log("Failed to add contact.");
        }
        break;

      case "remove":
        const updatedContacts = await removeContact(id);
        if (updatedContacts) {
          console.log(`Contact with id ${id} removed.`);
          console.table(updatedContacts);
        } else {
          console.log(`Failed to remove contact with id ${id}.`);
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error in invokeAction:", error);
  }
}

invokeAction(argv);

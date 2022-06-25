const Contact = require("../../model/Contact");

async function getContacts(id) {
  return await Contact.find({user_id: id});
};

async function addContact( body ) {
  const { name, email, phone_number, marital_status, contact_location, user_id } = body;
  
  const contact = new Contact({
    name,
    email,
    user_id,
    phone_number,
    marital_status,
    contact_location,
  });

  return await contact.save();
};

async function getContactbyId (id) {
  return await Contact.findById(id)
};

async function getContact( phone_number, email) {
  if (phone_number) return await Contact.findOne( { phone_number: phone_number } );
  else if (email) return await Contact.findOne({ email : email } );
  return ("Contact Already in Database")
};

// Search based on request given
async function searchContacts (contact_name, contact_number, contact_email, search_method) {
  if (contact_name) {
    if (search_method === "includes") {
      return await Contact.find({ "name": new RegExp(contact_name)});
       // https://stackoverflow.com/a/10616781/18590539
    } else if (search_method === "starts") { 
      return await Contact.find({ "name": new RegExp({ $regex: '/HayD/', $options: "i"})});

    } else if (search_method === "ends") {
      return await Contact.find({ 'name': new RegExp({contact_name, options: "i"}) });
    } 
      return "no method given";
    // https://stackoverflow.com/a/63435547/18590539

    } else if (contact_number) {
        if (search_method === "includes") {
          return await Contact.find({ name: new RegExp(contact_number)});
        } else if (search_method === "ends") {
          return await Contact.find({ name: new RegExp(contact_name) });
        } else if (search_method === "starts") {
          return await Contact.find({ name: new RegExp(contact_name) });
        }
        return ("no method given");

    } else if (contact_email) {
        if (search_method === "includes") {
          return await Contact.find({ name: new RegExp(contact_email) });
        } else if (search_method === "ends") {
          return await Contact.find({ name: new RegExp(contact_name) });
        } else if (search_method === "starts") {
          return await Contact.find({ name: new RegExp(contact_name) });

        }
        return ("no method given");
    }
    else return console.log("Nothing Submitted for Searching")
}

module.exports = {
  getContacts,
  addContact,
  getContact,
  getContactbyId,
  searchContacts,
};

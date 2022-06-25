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
async function search (contact_name = null, contact_number = null, contact_email = null) {
    if(contact_name) {
        const name = contact_name;
        const regex = new RegExp(name, "i"); // i for case insensitive
        Contact.find({ name: { $regex: regex } }); 
        // https://stackoverflow.com/a/63435547/18590539

    } else if (contact_number) {
        const number = contact_number;
        const regex = new RegExp(number, "i");
        Contact.find({number: {$regex: regex}})
    } else if (contact_email) {
        const email = contact_email;
        const regex = new RegExp (email, "i");
        Contact.find({ email: {$regex: regex}})
    }
    else return console.log("Nothing Submitted for Searching")
}

module.exports = {
  getContacts,
  addContact,
  getContact,
  getContactbyId,
  search,
};

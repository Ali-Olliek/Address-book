const { findByIdAndUpdate } = require("../../model/Contact");
const Contact = require("../../model/Contact");

async function getContacts(id) {
  return await Contact.find({user_id: id});
};

// ------------CREATE A NEW CONTACT------------- //

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

// ------------GET A SINGLE CONTACT BY ID------------- //

async function getContactbyId (id) {
  return await Contact.findById(id)
};

// ------------GET A SINGLE CONTACT BY EMAIL OR PHONE_NUMBER------------- //

async function getContact( phone_number, email) {
  if (phone_number) return await Contact.findOne( { phone_number: phone_number } );
  else if (email) return await Contact.findOne({ email : email } );
  return ("Contact Already in Database")
};


// ------------SEARCH BASED ON REQUEST GIVEN------------- //

async function searchContacts (name,  email, number, method) {

  if (name) {
    if (method === "includes") {
      return await Contact.find({ 'name': new RegExp(name) }); // https://stackoverflow.com/a/10616781/18590539
    
    } else if (method === "starts") { 
        return await Contact.find({ 'name': { $regex: "^" + name, $options: 'i' }}); // https://stackoverflow.com/a/29809918/18590539
    }
      else if (method === "ends") {
        return await Contact.find({ 'name': { $regex: name + "$", $options: "i" }}); // https://stackoverflow.com/a/61211127/18590539
    } 
      return "no method given";

    } else if (number) {
        if (method === "includes") {
          return await Contact.find({ 'phone_number': new RegExp(number) });

        } else if (method === "starts") {
          return await Contact.find({ 'phone_number': { $regex: "^" + number }});

        } else if (method === "ends") {
          return await Contact.find({ 'phone_number': { $regex: number + "$" }});
        }
        return ("no method given");

    } else if (email) {
        if (method === "includes") {
          return await Contact.find({ 'email': new RegExp(email) });

        } else if (method === "starts") {
          return await Contact.find({ 'email': { $regex: "^" + email }}); 

        } else if (method === "ends") {
          return await Contact.find({ 'email': { $regex: email + "$" }});

        }
        return ("no method given");
    }
    else return console.log("Nothing Submitted for Searching")
}

module.exports = {
  addContact,
  getContact,
  getContacts,
  searchContacts,
  getContactbyId,
};

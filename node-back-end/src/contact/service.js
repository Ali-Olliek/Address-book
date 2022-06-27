// All queries needed to execute the functions from the Controller
// includes creating, searching, getting by id, and deleting

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

async function getContactById (id) {
  return await Contact.findById(id)
};
// ------------DELETE A SINGLE CONTACT BY ID------------- //

async function deleteContactById (id) {
  console.log("hello from here")
  return await Contact.deleteOne({_id: id})
};

// ------------GET A SINGLE CONTACT BY EMAIL OR PHONE_NUMBER------------- //

async function getContact( phone_number, email) {
  if (phone_number) return await Contact.findOne( { phone_number: phone_number } );
  else if (email) return await Contact.findOne({ email : email } );
  return ("Contact Already in Database")
};


// ------------SEARCH BASED ON REQUEST GIVEN------------- //

async function searchContacts (searchContent, property, method, contacts) {
  if (property === "Name") {
    if (method === "Includes") {
      return await Contact.find( { name: new RegExp(searchContent) }); // https://stackoverflow.com/a/10616781/18590539
      
    } else if (method === "Starts with") { 
      return await Contact.find({
        name: { $regex: "^" + searchContent, $options: "i" },
      }); // https://stackoverflow.com/a/29809918/18590539
    }
    else if (method === "Ends with") {
        return await Contact.find({
          name: { $regex: searchContent + "$", $options: "i" },
        }); // https://stackoverflow.com/a/61211127/18590539
    } 
      return "no method given";
    } 

  else if (property === "Phone Number") {
    if (method === "Includes") {
      return await Contact.find({ phone_number: new RegExp(searchContent) });

    } else if (method === "Starts with") {
      return await Contact.find({
        phone_number: { $regex: "^" + searchContent },
      });

    } else if (method === "Ends with") {
      return await Contact.find({
        phone_number: { $regex: searchContent + "$" },
      });
    }
    return "no method given";

  } else if (property === "Email") {

    if (method === "Includes") {
      return await Contact.find({ email: new RegExp(searchContent) });

    } else if (method === "Starts with") {
      return await Contact.find({ email: { $regex: "^" + searchContent } });

    } else if (method === "Ends with") {
      return await Contact.find({ email: { $regex: searchContent + "$" } });
    }
    return "no method given";
  } else return console.log("Nothing Submitted for Searching");
}

module.exports = {
  addContact,
  getContact,
  getContacts,
  searchContacts,
  getContactById,
  deleteContactById,
};

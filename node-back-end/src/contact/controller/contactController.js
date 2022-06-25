const {
  getContacts,
  getContactbyId,
  getContact,
  addContact,
  searchContacts,
} = require("../service");

const User = require("../../../model/Contact");
const jwt = require("jsonwebtoken");

async function createContact(req, res) {
    try {
        const { 
            name,
            email,
            phone_number,
            marital_status,
            contact_location,
            user_id 
        } = req.body

        if(!(name && phone_number)) {
            res.status(400).send("Missing Required Input");
        }

        const oldContact = await getContact ( phone_number, email )
        if (oldContact) {
            return res.status(409).send(`Contact Already Assigned ${oldContact}`);
        }

        const contact = await addContact ({
            name,
            email: email.toLowerCase(),
            phone_number,
            marital_status,
            contact_location,
            user_id,
        });
        res.status(200).send('success');
    } catch (err) {
        console.log(err);
    }
};

async function displayAll(req, res) {

    try {
    if (req.body.user_id) {
      const id = req.body.user_id;
      const result = await getContacts(id);
      console.log("Contacts for this Users =>", result);
      return res.status(200).send(result);
    }

    } catch (error) {
        console.log(error)
    }
}

async function displayOne(req, res) {

    try { 
        if(req.body.contact_id) {
        const id = req.body.contact_id
        const result = await getContactbyId(id);
        console.log("Contact => ", result);
        return res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)
    }
}

async function search(req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const method = req.body.method;

        const result = await searchContacts(name, email, number, method);
        console.log("found => ", result);

    return res.status(200).send(result);
    } catch (error) {
        console.log(error)
    }
}
    

module.exports = {
  createContact,
  displayAll,
  displayOne,
  search
};
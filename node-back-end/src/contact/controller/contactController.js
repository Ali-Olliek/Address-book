const { getContacts, getContact, addContact, search } = require("../service");
const User = require("../../../model/Contact");
const jwt = require("jsonwebtoken");

async function createContact(req, res) {
    console.log("Hello?")
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

        const oldContact = await getContact ({ phone_number })

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
// async function displayAll(req, res) {}
// async function displayOne(req, res) {}
// async function search(req, res) {}

module.exports = {
  createContact,
//   displayAll,
//   displayOne,
//   search
};
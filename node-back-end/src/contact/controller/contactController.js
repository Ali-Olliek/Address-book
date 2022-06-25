const {
    getContact,
    addContact,
    getContacts,
    searchContacts,
    getContactbyId,
} = require("../service");

const User = require("../../../model/Contact");
const jwt = require("jsonwebtoken");
const Contact = require("../../../model/Contact");

// ------------CREATE A NEW CONTACT------------- //

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
// ------------UPDATE EXISTING CONTACT------------- //

async function updateContact (req, res) {   // https://www.youtube.com/watch?v=M2u1W2CzXdE
    const condition = {_id: req.params.id};
    Contact.updateOne(condition, req.body)
    .then(doc => {
        if (!doc) return res.status(400).send("Didn't Update")
        return res.status(200).json(doc)
    })
    .catch(err => next(err));
} 


// ------------DISPLAY ALL CONTACTS------------- //

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

// ------------DISPLAY CONTACT------------- //

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

// ------------SEARCH------------- // 

async function search(req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const method = req.body.method;

        const result = await searchContacts(name, email, number, method);
        console.log("found => ", result);

    res.status(200).send(result);
    } catch (error) {
        console.log(error)
    }
}
    

module.exports = {
    search,
    displayAll,
    displayOne,
    updateContact,
    createContact,
};
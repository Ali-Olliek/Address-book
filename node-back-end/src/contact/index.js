const { Router } = require("express");
const { displayAll, displayOne, search, createContact } = require("./controller/contactController"); // needs update
const router = Router();
// const JWTMiddleware = require("../../middleware/auth.js");

// req -> from postman
// res -> your api response

// router.get("/", JWTMiddleware, (req, res) => get(req, res));
router.get("/Contacts", displayAll); 
router.get("/Contact", displayOne);
router.post("/CreateContact", createContact)
// router.get("/Contacts/Search/:name?/:number?/:email?", search);
// ^ stackoverflow.com/a/41748728/18590539

// localhost:3000/api/Contacts
// localhost:3000/api/Contacts/:id
// localhost:3000/api/Contacts/CreateContact
// localhost:3000/api/Contacts/Search/:name?/:number?/:email?

module.exports = router;
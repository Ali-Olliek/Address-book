const { Router } = require('express');
const { get, register, login } = require('./controller/userController');
const router = Router();
const JWTMiddleware = require("../../middleware/auth.js");

// req -> from postman
// res -> your api response

router.get('/', JWTMiddleware, (req, res) => get(req, res));
router.post('/auth/register',register);
router.post('/auth/login', login);
router.get('/auth/get', get);

// localhost:3000/api/user/
// localhost:3000/api/user/auth/register
// localhost:3000/api/user/auth/login

module.exports = router;
const { Router } = require('express');
const { get, register, login } = require('./controller/user');
const router = Router();
const testMiddleware = require('../../middleware/test');

// req -> from postman
// res -> your api response

router.get('/', testMiddleware(), (req, res) => get(req, res));
router.post('/auth/register', register);
router.post('/auth/login', login);

// localhost:3000/api/user/
// localhost:3000/api/user/auth/register
// localhost:3000/api/user/auth/login

module.exports = router;
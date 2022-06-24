function testMiddleware() {
  return (req, res, next) => {
    console.log(`- - ${req.query.id} - -`);

    // bcrypt you need to check if its valid conn

    // check jwt token if it is valid
    // validate forms
    // not authorized 403

    next();
    // res.send('result');
  }
}

module.exports = testMiddleware;
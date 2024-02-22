var jwt = require('jsonwebtoken') //for sending auth token to logged in user
JWT_SECRET = "Welcometoreactjsworldwith@nonym0u$" //for sending auth token to logged in user

const fetchUser = (req, res, next) => {
    // verifying the Authentication from header and proceeding further
    const token = req.header('Authentication')

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    }
    catch {
        res.status(403).send("Please login to continue.")
    }

}

module.exports = fetchUser;
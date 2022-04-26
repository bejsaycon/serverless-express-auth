// TO FIX: usersController.getSingleUser 

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const corsOptions = require('./config/corsOptions');
// const credentials = require('./middleware/credentials');
// const verifyJWT = require('./middleware/verifyJWT');
// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');


// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

// app.use(verifyJWT);
// app.use('/contacts', require('./routes/api/contacts'));
// app.use("/users", require("./routes/api/users"));

//custom middleware for errors
// app.use(errorHandler); 

module.exports = app;

//TODO: Create Verify Role Middleware, Make use of JWT
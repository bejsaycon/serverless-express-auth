const serverless = require("serverless-http");
const app = require('./src/server');
const mongoose = require("mongoose");
const connectDB = require('./src/utils/databaseConfig');

//Connect to MongoDB
connectDB();

module.exports.handler = serverless(app);




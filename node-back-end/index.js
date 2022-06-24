require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./src/user');


mongoose.connect("mongodb://localhost:27017/AddressBook", () =>
  console.log("Connected to DB")
);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

app.listen(3000, () => console.log('Server running'));
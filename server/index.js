'use strict';
require("dotenv").config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./routes/users.routes');
const classroomRoutes = require("./routes/classroom.routes")
const uploadRoutes = require("./routes/upload.routes")
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

app.use(cors());


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// Connect to MongoDB
mongoose
  .connect(
    process.env.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// Routes
app.use("/api/users", users);
app.use("/api/classroom", classroomRoutes)
app.use("/api/upload", uploadRoutes);

// // frontend serve
// const _dirname = path.resolve()
// app.use('/uploads', express.static(path.join(_dirname, '/uploads'))) 

// app.use(express.static(path.join(_dirname, '/frontend/build'))) 
// app.get('*', (req, res) => res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html')))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));



'use strict';

const express = require("express");
const { createClassroom, joinClassroom, getClassrooms, newPost, updateStream} = require("../controllers/classroom.controller");
const { validateNewClassroom, validateJoinClassroom } = require("../validation/classroom.validation");
const passport = require("passport")
const router = express.Router();

const User = require("../models/User")

// @route POST api/classroom/create
// @desc create new classroom
// @access Protected
router.post("/create", passport.authenticate('jwt', { session: false}), (req, res, next) => {
    const { errors, isValid } = validateNewClassroom(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    next()
}, createClassroom );


// @route POST api/classroom/join
// @desc join classroom
// @access Protected
router.post("/join", passport.authenticate('jwt', { session: false}), (req, res, next) => {
    const { errors, isValid } = validateJoinClassroom(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    next()
}, joinClassroom)


// @route POST api/classroom/
// @desc fetch all joined classrooms
// @access Protected
router.get("/", passport.authenticate('jwt', { session: false}), getClassrooms)

// @route POST api/classroom/work
// @desc add work in classroom
// @access Protected
router.post("/work", passport.authenticate('jwt', { session: false}), newPost)


// @route POST api/classroom/:id
// @desc add work in classroom
// @access Protected
router.get("/:id", passport.authenticate('jwt', { session: false}), updateStream)

module.exports=router;

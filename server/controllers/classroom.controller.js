const Classroom = require("../models/classroom.model")
const User = require("../models/User")
const crypto = require("crypto");


exports.createClassroom = (req, res) => {
    const user = req.user
    
    const newClass = new Classroom({
        name: req.body.name,
        owner:user._id,
        courseCode:req.body.courseCode,
        meetingLink: genNewMeetingLink(),
        inviteCode: genInviteCode(),
        members: [{
            member:user._id,
            role:"owner",
            timstamp:Date.now()
        }]
    });
    newClass
    .save()
    .then(c => {
        try {
            res.json(c)
            User.updateOne(
                {_id:user._id}, 
                {
                    $push: {
                        classJoined: {
                            classID:c._id,
                            role:"owner",
                            timstamp:Date.now()
                        }
                    }
                }
            )
            .then( upres => {
                if(upres.modifiedCount) {
                    const msg = "User's Data updated post classroom creation"
                    console.log(msg)
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    })
    .catch(err => console.log(err))
}

exports.joinClassroom = (req, res) => {
    const code = req.body.inviteCode
    const role = "Student"
    const user = req.user
    try {
        Classroom.findOne({inviteCode : code}, {_id: 1, name: 1}).then(c => {
            Classroom.updateOne(
                {_id : c._id}, 
                {
                    $push: {
                        members: {
                            member:user._id,
                            role:role,
                            timstamp:Date.now()
                        }
                    }
                }
            )
            .then(upres => {
                if(upres.modifiedCount) {
                    const msg = "User "+ user.name + " joined "+ c.name + "( " + c._id + ")" + " with role " + role
                    console.log(msg)
                    res.json({success: true, message: msg})
                }
            })
            User.updateOne(
                {_id:user._id}, 
                {
                    $push: {
                        classJoined: {
                            classID:c._id,
                            role:role,
                            timstamp:Date.now()
                        }
                    }
                }
            )
            .then( upres => {
                if(upres.modifiedCount) {
                    const msg = "User's Data updated post join"
                    console.log(msg)
                }
            })
        })
        
    }
    catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}

exports.getClassrooms = (req, res) => {
    Classroom.find(
        {
            "members.member" : req.user._id
        }
    )
    .then(c => {
        if(c) res.json(c)
        else res.status(404).json({msg:"No classroom joined, Join classroom first"})
    })
    .catch(err => res.status(400).json({err : err}))
}

exports.newPost = (req, res) => {
    const {title, description, type, files, classID} = req.body
    const userID = req.user._id

    if(!title) return res.status(400).json({success:false, msg:"title is required to create a work"})
    
    Classroom.updateOne(
        {
            _id : classID,
            owner:userID
        }, 
        {
            $push: {
                stream: {
                    title:title,
                    description:description,
                    type:type,
                    files:files,
                    timstamp:Date.now()
                }
            }
        }
    )
    .then(upres => {
        if(upres.modifiedCount) {
            const msg = "Work "+ title + " posted in "+ classID
            console.log(msg)
            res.json({success: true, message: msg})
        }
    })
    .catch(err => res.status(400).json({err:err}))
}

exports.updateStream = (req, res) => {
    Classroom.findOne(
        {
            _id: req.params.id,
            "members.member" : req.user._id
        },
        {
            _id:1,
            stream:1
        }
    )
    .then(c => {
        if(c) res.json(c)
        else res.status(404).json({msg:"No classroom found or user not joined"})
    })
    .catch(err => res.status(400).json({err : err}))
}



//dummy functions
function genNewMeetingLink() {
    return "https://meet.google.com/hnb-zsrc-mvg";
}
const genInviteCode = () => crypto.randomBytes(6).toString('hex');





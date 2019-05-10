const mongoose = require("mongoose")
var Count = mongoose.model('counts')
var Message = mongoose.model('messages')
var Choice = mongoose.model('choices')

module.exports = {
    index: (req, res) => {
        Count.find({}, function(err, counts) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(counts);
            }
        })
    },
    yellowButton: (req,res) => {
        Count.findOne({}, (err, data) => {
            data.totalCount += 1;
            data.countOne += 1;
            data.save((err, products) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("successfully updated count")
                    res.json(products)
                }
                
            })
        })   
    },
    redButton: (req,res) => {
        Count.findOne({}, (err, data) => {
            data.totalCount += 1;
            data.countTwo += 1;
            data.save((err, products) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("successfully updated count")
                    res.json(products)
                }
                
            })
        })   
    },
    reset: (req,res) => {
        Count.findOne({_id: "5c9c0993cdf97104d087ea98"}, (err, count) => {
            count.totalCount = 0
            count.countOne = 0
            count.countTwo = 0
            count.save( (err, data) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("successfully reset count")
                    res.json(data)
                }
                
            })
        })
    },
    
    user: (req, res) => {
        req.session.name = req.body.name;
        res.json({session: req.session.name, status: true})
    },

    check: (req, res) => {
        if (req.session.name) {
            res.json({status: true, session: req.session.name})
        }
        else {
            res.json({status: false});
        }
    },
    message: (req, res) => {
        console.log(req.body)
        if (req.session.name == 'sofia0925_admin94') {
            var newMessage = new Message ({name: 'Sofia', message: req.body.message});
            //console.log("message", newMessage.message)
            newMessage.save( (err, messages) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("Successfully created message object with sofia")
                    res.json(messages)
                }
            })
        }
        else if (req.session.name == 'sebin0523_admin89') {
            var newMessage = new Message ({name: 'Sebin', message: req.body.message});
            //console.log("message", newMessage.message)
            newMessage.save( (err, messages) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("Successfully created message object with sebin")
                    res.json(messages)
                }
            })
        } else {
            var newMessage = new Message ({name: req.session.name, message: req.body.message});
            //console.log("message", newMessage.message)
            newMessage.save( (err, messages) => {
                if (err) {
                    res.json(err);
                }
                else {
                    console.log("Successfully created message object")
                    res.json(messages)
                }
            })
        }
        
    },
    getMessages: (req,res) => {
        Message.find({}, function(err, messages) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(messages);
            }
        })
    },
    session: (req,res) => {
        req.session.destroy();
        res.json('session cleared')
    },
    choices: (req, res) => {
        Choice.create(req.body), (err, choices) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(choices)
            }
        }
    },
    getChoices: (req,res) => {
        Choice.find({}, (err, choices) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(choices)
            }
        })
    }
}
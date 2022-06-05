const models = require("../models")
const message = require("../models/message")
const Message = models.messages
const Comment = models.comments
const User = models.users


exports.likeMessage = (req, res, next) => {


    const like = Message.findOne({ where: { like: req.body.messageId } })
    if (like === 0) {
        res.status(201).json({ message: "like ajouté" })
    }
    else {
        res.status(201).json({ message: "like retiré" })
    }



}
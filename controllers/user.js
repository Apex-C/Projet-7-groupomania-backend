const db = require("../models")
const User = db.users
const Message = db.messages
const Comment = db.comments

// Trouver un utilisateur
exports.findOneUser = (req, res, next) => {
    const userInfo = {}
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            userInfo.userName = user.userName
            userInfo.email = user.email
            userInfo.id = user.id
            userInfo.role = (user.isAdmin) ? "Administrateur" : "Utilisateur"


            userInfo.createdAt = user.createdAt
            userInfo.avatar = user.avatar
            Comment.count({ where: { userId: req.params.id } })
                .then(cmtcount => {
                    userInfo.commentsCount = cmtcount
                    Message.count({ where: { userId: req.params.id } })
                        .then(msgcount => {
                            userInfo.messagesCount = msgcount
                            res.status(200).json(userInfo)
                        })
                })

        })

        .catch(error => res.status(404).json({ error }))
}

// Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.userId,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body }
    User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ ...userObject }))
        .catch(error => res.status(400).json({ error }))
}



exports.deleteUser = (req, res,) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({
            message: 'Profil du user supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }))

}

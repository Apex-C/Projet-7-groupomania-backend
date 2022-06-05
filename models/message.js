const { Model } = require("sequelize")
const { likeMessage } = require("../controllers/like")

module.exports = (sequelize, DataTypes) => {
    class Message extends Model { }
    Message.init({
        message: {
            type: DataTypes.TEXT
        },
        messageUrl: {
            type: DataTypes.STRING
        },
        like: {
            type: DataTypes.JSON,

        },
        dislike: {
            type: DataTypes.JSON
        }
    },

        {
            sequelize,
            modelName: "Message"
        })
    return Message
}


const express = require("express")
const app = express()
const helmet = require('helmet')
const cors = require("cors")

const path = require("path")
const auth = require('./middleware/auth')

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")
const commentRoutes = require("./routes/comment")
const likeRoutes = require("./routes/like")


app.use(
    helmet({
        crossOriginResourcePolicy: false,

    })
);
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb

const db = require("./models")
db.sequelize.sync()

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/comments", auth, commentRoutes)
app.use('/api/likemessage', likeRoutes)

module.exports = app
const express = require("express")

const router = express.Router()
const likeRoute = require("../controllers/like")



router.post("/:id", likeRoute.likeMessage)

module.exports = router;
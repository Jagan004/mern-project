const express = require("express")
const router = express.Router()
const {getUser,login,createUser} = require("../controller/userController")
const ValidateToken = require("../middelWare/validateTokenHandler")

router.get("/",ValidateToken,getUser)
router.post("/login",login)
router.post("/signin",createUser)

module.exports = router
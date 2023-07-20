const express = require("express")
const router = express.Router()
const {getContact,getContactById,createContact} = require('../controller/contactController')
const ValidateToken = require("../middelWare/validateTokenHandler")

router.get("/",ValidateToken,getContact)
router.route("/:id").get(getContactById)
router.route("/").post(createContact)

module.exports = router
const Contact = require("../models/contactModel")


const getContact = async(req,res)=>{
    const get = await Contact.find()
    res.status(200).json(get);  
}

const getContactById = async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact)
    {
        res.status(404)
        throw new Error("no conatct available")
    }
    res.status(200).json(contact);
    
}

const createContact = async(req,res)=>{
    const {name,email,phone} = req.body

    if(!name||!email||!phone)
    {
        res.status(400)
        throw new Error("all fields are manditory")
    }
    

    const create = await Contact.create({name,email,phone})
    res.status(200).json(create);
}

module.exports = {getContact,getContactById,createContact}
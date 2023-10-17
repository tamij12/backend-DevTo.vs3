//const fs = require('fs')
// const Users = './db/users.json'
 const Users = require('../models/users')
 const auth = require('../middlewares/auth')

//db.users.find({})

module.exports = {
    get: async (req, res) => {
        let users = await Users.find()
        res.status(200).send({ msg: "success", data: users })
    },
    getById: async (req, res) => {
        let id = req.params.id
        let user = await Users.findOne({ _id: id })
        //let user = await Users.findById(id)
        //let user = await Users.findOne({first_name: id})
        res.status(200).send({ msg: "sucess", data: user })
    },
    post: async (req, res, next) => {
        try {
            req.body.password = await Users.encrypPassword(req.body.password)
            let user = await Users.create(req.body)
            if (!user) {
                res.status(502).send({ msg: "user not created", err: user })
            }
            await user.save()
            res.status(201).send({ msg: "user created", data: user })
        } catch (error) {
            next(error, req, res)           
            //res.status(500).send({msg: error})
        }

    },
    login: async (req, res) => {
        const { email, password } = req.body
        let user = await Users.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ msg: "user not found" })
        }
        let validPass = await Users.comparePassword(password, user.password)
        if (!validPass) {
            return res.status(401).send({ msg: "Incorrect password" })
        }
        // generate token
        let token = auth.generateToken(user)
        return res.status(200).send({ msg: "success", data: token })
    }
}
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
import bcrypt from "bcrypt"
import callAtlas from "../database/client.js"
import tryCatch from "../helpers/tryCatch.js"
import { ObjectId } from "mongodb"
dotenv.config({
    path: path.resolve("../../.env")
})

const userController = {

    async login(req, res, next) {

        const { email, password } = req.body
        const client = await callAtlas()
        const coll = client.db().collection("users")
        // je veux récupérer les données de l'utilisateur 
        // qui a pour email l'email contenu dans la requête
        try {
            const user = await coll.findOne({ email: email })
            if(!user._id){
                client.close()
                return res.status(404).json({ message: `User with ${email} not found`})
            }
            
            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if(!isPasswordValid){
                const coll = client.db("logs").collection("diary")
                try {
                    const result = await coll.insertOne({ event: "login", date: new Date().toLocaleDateString(), data: { email, password }, reason: "invalid password" })
                } catch(e){
                    return res.status(500).json({ message: 'Error while inserting data in logs diary'})
                }
                client.close()
                return res.status(400).json({ message: 'Invalid data'})
            }

            const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, { expiresIn: '1h'})

            client.close()
            return res.status(200).json({ token, id: user._id })

        } catch(e) {
            console.error("⛔️ Error while retrieving date from db")
        }

    },

    async createOne(req, res){
        const { email, password, firstname, lastname } = req.body // recup dans corps de requête
        const hashPassword = bcrypt.hashSync(password, 10)
        const client = await callAtlas()
        const coll = client.db().collection("users")

        tryCatch(async() => {
            const result = await coll.insertOne({ firstname, lastname, email, password: hashPassword})
            client.close()
            res.status(201).json(result)

        }, res, "⛔️ Error while inserting data into the db")
      
        
    },

    async getOneById(req, res, next) {


        // Conversion

        const id = new ObjectId(req.params.id)
        console.log("id", id)

        // Connexion
        const client = await callAtlas()

        // Collection
        const coll = client.db().collection("users")
        
        // Recherche
        const user = await coll.findOne({ _id: id })

        if(!user){
            client.close()
            return res.status(404).json({ message: `user with id ${id} not found`})
        }

        if(!(req.auth == user.email)) {
            client.close()
            return res.status(401).json({ message: `⛔️ restricted access` })
        }

        res.status(200).json(user) 

    },

    async getAll(req, res, next) {
        const client = await callAtlas()
        const coll = client.db().collection("users")
        tryCatch(async() => {
            const users = await coll.find().toArray()
            if(!users.length){
                client.close()
                return res.status(404).json({ message: 'No user found'})
            }
            client.close()
            return res.status(200).json(users)
        }, res, "Error while retrieving data from the db")
   

    },

    deleteAll(req, res, next) {

    },

    async deleteOneById(req, res, next){

        const id = new ObjectId(req.params.id)
        const client = await callAtlas()
        const coll = client.db().collection("users")
        try {
            const user = await coll.findOne({ _id: id}) 
            if(!user._id){
                client.close()
                return res.status(404).json({ message: `User with id ${req.body.id} not found`})
            }

           const result = await coll.deleteOne({ _id: user._id})
           client.close()
           return res.status(200).json({ message: `User with id ${req.body.id} deleted`, result})

        } catch(err){
            client.close()
            return res.status(500).json({ message: `Error while retrieving date from the db`})
        }
   
    },

    async updateOneById(req, res, next){
        const id = new ObjectId(req.params.id)
        console.log("id", id)

        // Connexion
        const client = await callAtlas()

        // Collection
        const coll = client.db().collection("users")
        
        // Recherche
        const user = await coll.findOne({ _id: id })

        if(!user){
            client.close()
            return res.status(404).json({ message: `user with id ${id} not found`})
        }

        if(!(req.auth == user.email)) {
            client.close()
            return res.status(401).json({ message: `⛔️ restricted access` })
        }

        const result = await coll.updateOne({ email: user.email}, { $set: {...req.body}})
        client.close()
        return res.status(200).json({ message: `user updated`, result })
    },

  

}

export default userController
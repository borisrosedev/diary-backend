import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path: path.resolve("../../.env")
})


async function callAtlas (){
    try {
        const client = new MongoClient(process.env.MONGO_URL)
        await client.connect()
        console.log("✅ Connexion Mongo réussie")
        return client
    } catch(e){
        console.log("⛔️ Echec de la connexion avec MongoDBAtlas")
    }
  
}

export default callAtlas



import express from "express";
import dotenv from "dotenv";
import userRoutes from "./app/routes/user.route.mjs";
import fileRoutes from "./app/routes/file.route.mjs";
import { MongoClient } from "mongodb";
import cors from "cors";
dotenv.config();
const app = express();

//-----------------------------------------

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
    strict: false, // accepte uniquement des arrays et objets en paramètres
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.set("port", process.env.PORT);
app.set("host", process.env.HOST);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", fileRoutes);


export default app
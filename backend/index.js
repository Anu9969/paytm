const express = require("express");
import mainRouter from "./routes";
import cors from "cors"
const bodyParser = require("body-parser")

const app = express;

app.use('/api/v1', mainRouter)

app.use(cors({
    origin: '*',
    credentials:true
}))

app.use(bodyParser.json())


app.listen(3000)



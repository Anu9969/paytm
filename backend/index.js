const express = require("express");
import mainRouter from "./routes";
import cors from "cors"

const app = express;

app.use('/api/v1', mainRouter)

app.use({
    origin: '*',
    credentials:true
})



app.listen(3000)



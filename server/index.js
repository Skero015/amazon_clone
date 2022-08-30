
//package imports
const express = require("express");
const mongoose = require("mongoose"); //communicate with db

//imports from other files
const authRouter = require("./routes/auth");

//init
const app = express();
const PORT = 4000;
const DB = "mongodb+srv://skero:<password>@cluster0.uf83nkq.mongodb.net/?retryWrites=true&w=majority";

//middleware --> communicate with (client-> middleware -> server->client)
app.use(authRouter)

//connections
mongoose.connect(DB).then( () => {
    console.log("Connection successful");
}).catch((e) => {
    console.log(e);
});

//listen to server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
})
require("dotenv").config({ path: "./../.env" });

const app = require("./app");
const connectDB = require("./config/connectDB");
const { setServers } = require("dns/promises");

setServers(["8.8.8.8", "8.8.4.4"]);
connectDB();

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`server is running at port ${port}`);
});
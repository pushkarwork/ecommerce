const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" })

const connectDB = require("./config/db");
connectDB()


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
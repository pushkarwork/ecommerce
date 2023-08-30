const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" })

app.get("/", (req, res) => {
    res.send("hello this is home")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
const app = require("./app");
const dotenv = require("dotenv");

// Uncaught error handling
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting server due to uncaught error`)

    process.exit(1)
})



dotenv.config({ path: "backend/config/config.env" })

const connectDB = require("./config/db");
connectDB()


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})

// Unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to unhandled promise rejection`)

    server.close(() => {
        process.exit(1)
    })
})
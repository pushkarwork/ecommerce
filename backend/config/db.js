const mongoose = require("mongoose");

const connectdb = () => {
    mongoose.connect(process.env.db_url).then(() => {
        console.log("connected the db")

    })
}



module.exports = connectdb;
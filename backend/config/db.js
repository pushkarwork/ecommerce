const mongoose = require("mongoose");

const connectdb = () => {
    mongoose.connect(process.env.db_url).then(() => {
        console.log("connected the db")

    }).catch((e) => {
        console.log(e)
    })


}



module.exports = connectdb;
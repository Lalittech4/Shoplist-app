const mongoose = require('mongoose');

const shoplistSchema = new mongoose.Schema({
    shopname: String,
    area: String,
    category: String,
    openingday: String,
    closingday: String


});


module.exports = mongoose.model("shoplists", shoplistSchema)
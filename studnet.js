const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String },
    imgUri: { type: String, default: "https://amp.businessinsider.com/images/5ac518b57a74af23008b4642-750-563.jpg"},
    grades: { type: [Number], default: [] },
    dateCreated: { type: Date, default: new Date() }
})

module.exports = mongoose.model("Student", StudentSchema);
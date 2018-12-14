const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Student = require("./studnet.js")
const bodyParser = require("body-parser")
const path = require("path")

mongoose.connect('mongodb://localhost:27017/studenti', { useNewUrlParser: true }).then(res => {
    console.log("Connected")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.post("/create", (req, res) => {
    const student = new Student({
        name: req.body.name
    })
    student.save().then(createdStudent => {
        res.json(createdStudent)
    })
})

app.get("/getAll", (req, res) => {
    
    Student.find({}).then(data => {
        res.json({
            studenti: data
        })
    })
})

app.get("/student/:ime", (req, res) => {
    const imeStudenta = req.params.ime;
    Student.findOne({ name: imeStudenta }, function(err, trazeniStudent){
        res.json(trazeniStudent)
    })
})

app.delete('/delete/:ime', (req,res) =>{
    const imeStudenta = req.params.ime;
    Student.deleteOne({name:imeStudenta},function(err,trazeniStudent){
        res.send( "Student je obrisan");
    })
})

app.put('/edit/:ime',(req, res)=>{
    const imeStudenta= req.params.ime;
    const novoIme = req.body.name;
    
    Student.findOneAndUpdate({ name: imeStudenta }, { name: novoIme }, { new: true }).then(updatedUser => {
        res.json(updatedUser)
    })
})

app.listen(3000);
console.log('you are livev on 3000')
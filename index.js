const express = require('express')

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

const conn = require('./db/conn')
conn()

const routes = require('./routes/routes')
app.use('/', routes)

app.get('/', function (req, res) {
    res.json({msg: 'Rota principal'}) 
}) 

app.listen(3001, function(){
    console.log('Servidor on');
})

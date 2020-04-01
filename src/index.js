const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose')



const app = express();

mongoose.connect('mongodb+srv://Tierry:mongo123@cluster0-jek5y.mongodb.net/bethehero?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(cors()) // Determina quem pode acessar a API, pode pasar origin: 'http://meusite.com'
app.use(express.json())

app.use(routes);


app.listen(process.env.PORT || 3333)



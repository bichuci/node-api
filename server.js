const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message : 'Bienvenue sur le livre de recette'})
})

db.sequelize.sync();

require('./app/routes/recipe.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Le serveur tourne sur le port ${PORT}.`)
})
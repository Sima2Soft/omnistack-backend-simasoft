/* Arquivo principal da aplicação
Este arquivo será o entry point*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

io.on('connection',socket => {
    //console.log("ok");
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://omnistack:0mn15t4ck@omnistack-g2leq.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next(); //Processa este middleware e passa pra frente
});



/*app.get('/teste', (req, res) => {
    return res.send('Hello World');
});*/

//Utiliza o formato Json para requisições NodeJs
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //Permite o Url-encode no cabeçalho
app.use('/files',express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes')); //Utiliza o arquivo routes

//server.listen(3333);
server.listen(process.env.PORT || 3333);

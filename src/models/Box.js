const mongoose = require('mongoose');

//Cria ou mapeia a Collection Box
const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    //Tipo Array
    //Faz o relacionamento ao ObjectId da Collection 'File'
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File'}] 
}, {
    timestamps: true //Cria os campos UpdatedAt e CreatedAt automaticamente
});

module.exports = mongoose.model("Box", Box); //Envia o Model com o nome da Collection

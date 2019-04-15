const mongoose = require('mongoose');

//Cria ou mapeia a Collection Box
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true, //Cria os campos UpdatedAt e CreatedAt automaticamente
    toObject: { virtuals: true},
    toJSON: { virtuals: true }
});

//Um campo virtual, é aquele campo que não existe no Banco, mas existe na aplicação
File.virtual('url').get(function() {
    const url = process.env.URL || 'http:/localhost:3333';
    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File); //Envia o Model com o nome da Collection

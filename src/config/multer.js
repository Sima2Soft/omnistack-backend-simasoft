const multer = require('multer');
const path = require('path'); //Biblioteca nativa do Node.js, ele resolve o problema de caminho dos arquivos de S.Os diferentes
const crypto = require('crypto'); //Biblioteca nativa do Node.js que permite a criação de hashes diferentes ao ser chamado

module.exports = {
    dest: path.resolve(__dirname,'..','..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,'..','..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null, file.key);
            });
        }
    }) //Grava o nome do arquivo do upload
};
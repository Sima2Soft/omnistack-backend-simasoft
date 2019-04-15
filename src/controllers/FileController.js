const File = require("../models/File");
const Box = require("../models/Box");

class FileController {
  //Permite que o usuário crie novas Boxes, ou novo diretório
  async store(req, res) {
    //Recupera o registro no Mongo via id
    //Sem hidratar o objeto do relacionamento com a Collection Files
    //const box = await Box.findById(req.params.id); 

    //Hidratando o objeto do relacionamento com a Collection Files
    const box = await Box.findById(req.params.id); 

    //Cria uma nova entrada na Collection File
    const file = await File.create({
        title: req.file.originalname,
        path: req.file.key,
    });

    //Adiciona este novo arquivo criado ao box
    box.files.push(file);

    //Persiste o objeto Box contendo o file criado
    await box.save();    
    //console.log(req.file);
    //Criar um arquivo
    //return res.send("OK");

    req.io.sockets.in(box._id).emit('file', file);
    return res.json(file);
  }
}

module.exports = new FileController(); //Envia a Classe instanciada, sem usar 'new', não podemos utilizar os métodos criados nessa classe;

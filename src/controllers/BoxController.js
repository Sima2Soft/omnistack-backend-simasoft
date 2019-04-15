const Box = require('../models/Box');

class BoxController {
    //Permite que o usuário crie novas Boxes, ou novo diretório
    async store (req,res) {
        //req.body  => Body contém o corpo do request, como o nosso corpo está em json
        //podemos navegar diretamente neste objeto contendo a property necessária
        //que será req.body.title

        //Como temos apenas o valor de title, podemos passar o objeto direto (req.body)
        const box = await Box.create(req.body);
        return res.json(box);   
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {
                sort: { createdAt: -1 } } //-1 => Ordena de forma descrescente, 1 => ordena de forma crescente
        });

        return res.json(box);
    }
}

module.exports = new BoxController(); //Envia a Classe instanciada, sem usar 'new', não podemos utilizar os métodos criados nessa classe;
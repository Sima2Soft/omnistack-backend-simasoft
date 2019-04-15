const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

//req => Requisição, é o que o sistema Recebe. Recebe uma informação do cliente
//res => Retorna uma informação para o cliente
routes.get("/teste", (req, res) => {
  return res.send("Hello World");
});

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post(
  "/boxes/:id/files", //:id => estou dizendo ao express que estou esperando uma variável aqui, nesse caso, o id do usuário
  multer(multerConfig).single("file"),
  FileController.store
);

module.exports = routes;

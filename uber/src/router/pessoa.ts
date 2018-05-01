import * as Express from "express";
import PessoaController from '../controller/pessoa';

export default function (server: Express.Application) {
    const pessoaController = new PessoaController();
    server.get('/api/pessoa', pessoaController.getAll);
    server.get('/api/pessoa/:id', pessoaController.getById);
    server.post('/api/pessoa', pessoaController.create);
    server.put('/api/pessoa/:id', pessoaController.update);
    server.delete('/api/pessoa/:id', pessoaController.remove);
}
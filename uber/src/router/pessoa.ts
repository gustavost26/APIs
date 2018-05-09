import * as Express from "express";
import PessoaController from '../controller/pessoa';
import authToken from '../commons/utils/auth';
export default function (server: Express.Application) {
    const pessoaController = new PessoaController();
    const token = new authToken();
    server.get('/api/pessoa', token.validate, pessoaController.getAll);
    server.get('/api/pessoa/:id', token.validate, pessoaController.getById);
    server.post('/api/pessoa', pessoaController.create);
    server.put('/api/pessoa/:id', token.validate, pessoaController.update);
    server.delete('/api/pessoa/:id', token.validate, pessoaController.remove);
}
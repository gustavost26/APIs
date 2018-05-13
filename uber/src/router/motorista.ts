import * as Express from "express";
import MotoristaController from '../controller/motorista';
import authToken from '../commons/utils/auth';

export default function (server: Express.Application) {
    const motoristaController = new MotoristaController();
    const token = new authToken();
    server.get('/api/motorista', token.validate, motoristaController.getAll);
    server.get('/api/motorista/:id', token.validate, motoristaController.getById);
    server.post('/api/motorista', motoristaController.create);
    server.put('/api/motorista/:id', token.validate, motoristaController.update);
    server.delete('/api/motorista/:id', token.validate, motoristaController.remove);
}
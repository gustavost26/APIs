import * as Express from "express";
import MotoristaController from '../controller/motorista';

export default function (server: Express.Application) {
    const motoristaController = new MotoristaController();
    server.get('/api/motorista', motoristaController.getAll);
    server.get('/api/motorista/:id', motoristaController.getById);
    server.post('/api/motorista', motoristaController.create);
    server.put('/api/motorista/:id', motoristaController.update);
    server.delete('/api/motorista/:id', motoristaController.remove);
}
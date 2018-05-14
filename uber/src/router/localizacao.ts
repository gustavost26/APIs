import * as Express from "express";
import LocalizacaoController from '../controller/localizacao';
import authToken from '../commons/utils/auth';
import { getByIdLocalizacao } from '../providers/database';

export default function (server: Express.Application) {
    const localizacaoController = new LocalizacaoController();
    const token = new authToken();
    server.get('/api/localizacao', token.validate, localizacaoController.getAllLocalizacao);
    server.get('/api/localizacao/:id', token.validate, localizacaoController.getByIdLocalizacao);
    server.post('/api/localizacao', localizacaoController.createLocalizacao);
    server.put('/api/localizacao/:id', token.validate, localizacaoController.updateLocalizacao);
    server.delete('/api/localizacao/:id', token.validate, localizacaoController.removeLocalizacao);
}
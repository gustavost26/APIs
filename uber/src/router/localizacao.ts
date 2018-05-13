import * as Express from "express";
import LocalizacaoController from '../controller/localizacao';
import authToken from '../commons/utils/auth';

export default function (server: Express.Application) {
    const localizacaoController = new LocalizacaoController();
    const token = new authToken();
    server.post('/api/localizacao', localizacaoController.createLocalizacao);
}
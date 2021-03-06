import {Request, Response} from 'express';
import { LocalizacaoModel, ILocalizacaoModel } from '../models/localizacao';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';


const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result': data});
}

export default class Localizacao {

    public async getAllLocalizacao(req: Request, res: Response){
        try {
            const localizacao = await database.getAllLocalizacao();
            sendJsonResponse(res, HttpStatus.OK, localizacao);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async getByIdLocalizacao(req: Request, res: Response){
        const id = req.params.id;
            
        if (!id) {
            sendJsonResponse(res, HttpStatus.OK, 'Localização não encontrado');
        }

        try {
            const localizacao = await database.getByIdLocalizacao(id);
            sendJsonResponse(res, HttpStatus.OK, localizacao);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async createLocalizacao(req: Request, res: Response){
        try {
            const localizacao = new LocalizacaoModel(<ILocalizacaoModel>req.body);

            const resultLocalizacao: any = await database.getIdUserLocalizacao(localizacao.id_user);

            console.log('resultLocalizacao',resultLocalizacao);

            if (resultLocalizacao.length !== 0) {

                const result = await database.updateLocalizacao(resultLocalizacao._id, req.body);
                console.log('result', result);
                if (result) {
                    sendJsonResponse(res, HttpStatus.OK, 'Localização atualizada com sucesso!');
                } else {
                    sendJsonResponse(res, HttpStatus.OK, 'Erro ao atualizar localização!');
                }
            } else {

                const result = await database.createLocalizacao(localizacao);
                if (result) {
                    sendJsonResponse(res, HttpStatus.OK, 'Localização cadastrada com sucesso!');
                } else {
                    sendJsonResponse(res, HttpStatus.OK, 'Erro ao cadastrar localização!');
                }
            }            

        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error);
        }
    }

    public async updateLocalizacao(req: Request, res: Response){
        try{
            const id = req.params.id;
            const localizacao = req.body;

            console.log('localizacao',localizacao);
            const result = await database.updateLocalizacao(id, localizacao);

            console.log('result',result);

            if (result) {
                sendJsonResponse(res, HttpStatus.OK, 'Localização atualizada com sucesso!');
            } else {
                sendJsonResponse(res, HttpStatus.OK, 'Erro ao atualizar localização!');
            }
        }
        catch(error){
            res.status(ErrorUtil.generateHttpCode(error)).send(error);
        }
    }

    public async removeLocalizacao(req: Request, res: Response) {
        try {
            const removeLocalizacao = await database.removeLocalizacao(req.params.id);

            console.log('removeLocalizacao', removeLocalizacao);

            if(removeLocalizacao){
                sendJsonResponse(res, HttpStatus.OK, 'Localização removida com sucesso!');
            } else {
                sendJsonResponse(res, HttpStatus.INTERNAL_SERVER_ERROR , 'Erro ao remover a localização!');
            }

        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error);
        }
    }
    
}


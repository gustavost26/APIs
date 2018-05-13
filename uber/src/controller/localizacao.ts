import { updateMotorista, getByIdMotorista, create } from './../providers/database';
import {Request, Response} from 'express';
import { LocalizacaoModel, ILocalizacaoModel } from '../models/localizacao';
import { emailValidate } from '../commons/utils/validate';
import * as bcrypt from 'bcrypt';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';
import axios from 'axios';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result': data});
}

export default class Localizacao {

    public async createLocalizacao(req: Request, res: Response){
        try {
            const localizacao = new LocalizacaoModel(<ILocalizacaoModel>req.body);

            const resultLocalizacao: any = await database.getByIdLocalizacao(localizacao.id_user);

            console.log('resultLocalizacao',resultLocalizacao);

            if (resultLocalizacao) {

                const result = await database.updateLocalizacao(resultLocalizacao._id, localizacao);
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


    
}


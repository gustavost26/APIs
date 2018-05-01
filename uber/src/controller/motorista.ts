import {Request, Response} from 'express';
import { MotoristaModel, IMotoristaModel } from '../models/motorista';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result: ': data});
}

export default class Pessoa {

    public async getAll(req: Request, res: Response){
        try {
            const pessoas = await database.getAll();
            sendJsonResponse(res, HttpStatus.OK, pessoas);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async getById(req: Request, res: Response){
        const id = req.params.id;
            
        if (!id) {
            sendJsonResponse(res, HttpStatus.OK, 'Usuário não encontrado');
        }

        try {
            const pessoa = await database.getById(id);
            sendJsonResponse(res, HttpStatus.OK, pessoa);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async create(req: Request, res: Response){
        const pessoa = req.body;
        try {
            let result = await database.create(pessoa);

            sendJsonResponse(res, HttpStatus.CREATED, 'Usuário criado');
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }     
    }

    public async update(req: Request, res: Response){
        const id = req.params.id;
        const pessoa = req.body;

        try {
            await database.update(id, pessoa);
            sendJsonResponse(res, HttpStatus.OK, 'Usuário atualizado');
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async remove(req: Request, res: Response){
        const id: any = {_id: req.params.id};

        try {
            const result = await database.remove(id);
            sendJsonResponse(res, HttpStatus.OK, result);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }
  
    
}
  

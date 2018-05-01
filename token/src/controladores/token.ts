import { Request, Response } from 'express';
import * as jwt  from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { getConfig } from '../../config/config';
import { UserModel, IUserModel } from '../modelos/user';
import * as database from '../providers/database';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result: ': data});
}

export default class Token {
    constructor() {}

    public async tokenGenerate(req: Request, res: Response) {
        try {
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            console.log('req: ', req.body.email);
            console.log('Senha: ', hashedPassword);
  
            const result = await UserModel.create({
              email : req.body.email,
              password : hashedPassword
            } as IUserModel);
            
            console.log('result: ', result);
            
            if(result){
                console.log(result);                
            }

            res.send(result);

        } catch (error) {
            console.log(`Error: ${error}`);
            res.sendStatus(500);
        }
    }

    public tokenValidate(req: Request, res: Response) {
        try {
            
                
        } catch (error) {
            console.log(`Error: ${error}`);
            res.sendStatus(500);
        }
    }
}
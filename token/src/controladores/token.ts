import { Request, Response } from 'express';
import * as jwt  from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { getConfigToken } from '../../config/config';
import { UserModel, IUserModel } from '../modelos/user';
import * as database from '../providers/database';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json(data);
}
export default class Token {
    constructor() {}

    public async tokenGenerate(req: Request, res: Response) {
        try {
            const payload = {
                id: req.body.id 
            };

            var token = jwt.sign(payload, getConfigToken().secret, {
                expiresIn: '1h'
            });

            sendJsonResponse(res, HttpStatus.CREATED, {token: token});

        } catch (error) {
            console.log(`Error: ${error}`);
            res.sendStatus(500);
        }
    }

    public tokenValidate(req: Request, res: Response) {
        try {
            console.log(req.body);

            jwt.verify(req.body.token, getConfigToken().secret, function(err: any, decoded: any) {
                if (err) {
                    sendJsonResponse(res, HttpStatus.FORBIDDEN, false);
                } else {
                    sendJsonResponse(res, HttpStatus.CREATED, true);
                }
            });
                
        } catch (error) {
            console.log(`Error: ${error}`);
            res.sendStatus(500);
        }
    }
}
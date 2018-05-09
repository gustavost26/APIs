import {Request, Response, NextFunction} from 'express';
import * as HttpStatus from 'http-status';
import axios from 'axios';

export default class authToken {
    public async validate(req: Request, res: Response, next: NextFunction){
        try {

            console.log('req.headers.token', req.headers.token);
            let result = await axios.post(
                'http://127.0.0.1:3002/api/tokenValidate',
                {
                    token: req.headers.token
                }
            );

            console.log('result.data.result', result.data);

            if (result.data) {
                next();
            } else {
                res.sendStatus(HttpStatus.FORBIDDEN).send('Não autorizado!');
            }
        
        } catch (error) {
            res.sendStatus(HttpStatus.FORBIDDEN).send('Não autorizado!');
        }
    }
}
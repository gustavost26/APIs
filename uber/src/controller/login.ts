import { IUsuarioModel } from './../models/usuario';
import {Request, Response} from 'express';
import { emailValidate } from '../commons/utils/validate';
import * as bcrypt from 'bcrypt';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';
import axios from 'axios';

//TODO Criar uma function separada
const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json(data);
}

export default class Login {

    public async auth(req: Request, res: Response){
        const dadosLogin = {
            email: req.body.email,
            senha: req.body.senha
        }
        
        if (emailValidate(dadosLogin.email)) {
            try {
                const result = <IUsuarioModel> await database.getByEmail({email: dadosLogin.email});

                if(result) {
                    const matches = await bcrypt.compare(dadosLogin.senha, result.senha);

                    if (matches) {                     
                        let resultToken = await axios.post(
                            'http://127.0.0.1:3002/api/tokenGenerate',
                            {
                                id: result._id
                            }
                        );

                        console.log('Result:', resultToken.data);
                        
                        if(resultToken.data){                      
                            sendJsonResponse(res, HttpStatus.CREATED, {'token' : resultToken.data.token});                      
                        }else{   
                            res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Erro ao enviar o email.');                    
                        }

                    } else {
                        res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Senha imcompativel.');
                    }
                }else{
                    res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Conta não existe.'); 
                }
            } catch(error) {
                res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
            }
        } else {
            res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Email invalido');
        }        
    }    
}


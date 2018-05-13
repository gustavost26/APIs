import { updateMotorista, getByIdMotorista } from './../providers/database';
import {Request, Response} from 'express';
import { MotoristaModel, IMotoristaModel } from '../models/motorista';
import { emailValidate } from '../commons/utils/validate';
import * as bcrypt from 'bcrypt';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';
import axios from 'axios';
import { removeMotorista } from '../providers/database';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result': data});
}

export default class Motorista {

    public async getAll(req: Request, res: Response){
        try {
            const motoristas = await database.getAllMotorista();
            sendJsonResponse(res, HttpStatus.OK, motoristas);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async getById(req: Request, res: Response){
        const id = req.params.id;
            
        if (!id) {
            sendJsonResponse(res, HttpStatus.OK, 'Motorista não encontrado');
        }

        try {
            const pessoa = await database.getByIdMotorista(id);
            sendJsonResponse(res, HttpStatus.OK, pessoa);
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async create(req: Request, res: Response){
        const dadosLogin = {
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 10)
        }

        if (emailValidate(dadosLogin.email)) {
            try {
                let resultLogin = await database.createUser(dadosLogin);

                const motorista = new MotoristaModel(<IMotoristaModel>req.body);
                motorista.id_user = resultLogin._id;

                let resultMotorista = await database.createMotorista(motorista);  

                if(resultMotorista){                    
                    let resultEmail = await axios.post(
                        'http://127.0.0.1:3001/api/enviarEmail',
                        {
                            email: dadosLogin.email,
                            assunto: 'Confirmação de cadastro' ,
                            mensagem: 'Cadastro realizado com sucesso!'
                        }
                    );                 

                    if(resultEmail.data){                      
                        sendJsonResponse(res, HttpStatus.CREATED, `Motorista criado com sucesso. Foi enviado um email para o novo motorista: ${resultEmail.data}`);                      
                    }else{   
                        res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Erro ao enviar o email.');                    
                    }
                }else{
                    res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Não foi possivel cadastrar o motorista. Tente mais tarde.');
                }
            } catch(error) {
                res.status(ErrorUtil.generateHttpCode(error)).send(error);
            }
        } else {
            res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Email invalido');
        }       
    }

    public async update(req: Request, res: Response){
        const id = req.params.id;
        const motorista = req.body;

        try {
            const result: any = await database.updateMotorista(id, motorista);

            if(motorista.email || motorista.senha) {
                const user = {
                    email: motorista.email,
                    senha: bcrypt.hashSync(motorista.senha, 10)
                }

                await database.updateUser(result.id_user, user);
            }
            sendJsonResponse(res, HttpStatus.OK, 'Motorista atualizado');
        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }

    public async remove(req: Request, res: Response){
        const id: any = {_id: req.params.id};

        try {
            const resultMotorista: any = await database.getByIdMotorista(id);
            const id_user: any = {_id: resultMotorista.id_user};
            const removeUsuario = await database.removeUser(id_user);
            const removeMotorista = await database.removeMotorista(id);

            if(removeUsuario){
                sendJsonResponse(res, HttpStatus.OK, 'Motorista removido com sucesso!');
            } else {
                sendJsonResponse(res, HttpStatus.INTERNAL_SERVER_ERROR , 'Erro ao remover o motorista!');
            }

        } catch(error) {
            res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
        }
    }
    
}


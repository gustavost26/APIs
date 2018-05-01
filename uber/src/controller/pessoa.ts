import {Request, Response} from 'express';
import { PessoaModel, IPessoaModel } from '../models/pessoa';
import { emailValidate } from '../commons/utils/validate';
import * as bcrypt from 'bcrypt';
import * as HttpStatus from 'http-status';
import * as ErrorUtil from '../commons/utils/error';
import * as database from '../providers/database';
import PessoaDatabase from '../providers/pessoa';
import axios from 'axios';

const sendJsonResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({'result: ': data});
}

export default class Pessoa {
    private pessoaDatabase: PessoaDatabase;

    constructor() {
        this.pessoaDatabase = new PessoaDatabase();
    }

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
        const dadosLogin = {
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 10)
        }
        
        if (emailValidate(dadosLogin.email)) {
            try {
                let resultUsuario = await database.createUser(dadosLogin);

                const pessoa = {
                    nome: req.body.nome,
                    dt_nascimento: req.body.dt_nascimento,
                    telefone: req.body.telefone,
                    nif: req.body.nif,
                    id_usuario: resultUsuario._id
                };

                let resultPessoa = await database.create(pessoa);                

                //TODO: Verificar por que o metodo generico não esta funcionando 
                //const result = await this.pessoaDatabase.add(
                //    pessoa as IPessoaModel
                //);

                if(resultPessoa){                    
                    let resultEmail = await axios.post(
                        'http://127.0.0.1:3001/api/enviarEmail',
                        {
                            email: dadosLogin.email,
                            assunto: 'Confirmação de cadastro' ,
                            mensagem: 'Cadastro realizado com sucesso!'
                        }
                    );

                    console.log(resultEmail.data);                    

                    if(resultEmail.data){                      
                        sendJsonResponse(res, HttpStatus.CREATED, `Usuário criado com sucesso. Foi enviado um email para o novo usuário: ${resultEmail.data}`);                      
                    }else{   
                        res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Erro ao enviar o email.');                    
                    }
                }else{
                    res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Não foi possivel cadastrar o usuário. Tente mais tarde.');
                }
            } catch(error) {
                res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
            }
        } else {
            res.status(ErrorUtil.generateHttpCode('internalServerError')).send('Email invalido');
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


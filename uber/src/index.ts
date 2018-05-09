import * as Express from 'express';
import PessoaRouter from './router/pessoa';
import MotoristaRouter from './router/motorista';
import LoginRouter from './router/login';

export function init(server: Express.Application) {
  PessoaRouter(server);
  MotoristaRouter(server);
  LoginRouter(server);
}

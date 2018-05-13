import * as Express from 'express';
import PessoaRouter from './router/pessoa';
import MotoristaRouter from './router/motorista';
import LoginRouter from './router/login';
import LocalizacaoRouter from './router/localizacao';

export function init(server: Express.Application) {
  PessoaRouter(server);
  MotoristaRouter(server);
  LoginRouter(server);
  LocalizacaoRouter(server);
}

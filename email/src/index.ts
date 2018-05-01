import * as Express from 'express';
import EmailRota from './rotas/email';

export function init(server: Express.Application) {
  // INICIAR ROTAS
  EmailRota(server);
}

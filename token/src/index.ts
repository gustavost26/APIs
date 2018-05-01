import * as Express from 'express';
import TokenRota from './rotas/token';

export function init(server: Express.Application) {
  // INICIAR ROTAS
  TokenRota(server);
}

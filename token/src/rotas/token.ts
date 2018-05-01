import * as Express from "express";
import TokenControlador from '../controladores/token';

export default function (server: Express.Application) {
    const tokenControlador = new TokenControlador();
    server.post('/api/tokenGenerate', tokenControlador.tokenGenerate);
    server.post('/api/tokenValidate', tokenControlador.tokenValidate);    
}
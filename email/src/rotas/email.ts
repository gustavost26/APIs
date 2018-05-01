import * as Express from "express";
import EmailControlador from '../controladores/email';

export default function (server: Express.Application) {
    const emailControlador = new EmailControlador();
    server.post('/api/enviarEmail', emailControlador.enviarEmail);
}
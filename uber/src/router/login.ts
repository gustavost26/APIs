import * as Express from "express";
import LoginController from '../controller/login';

export default function (server: Express.Application) {
    const loginController = new LoginController();
    server.post('/api/login', loginController.auth);
}
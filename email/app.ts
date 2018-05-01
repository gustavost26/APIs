import * as Server from "./config/servidor";
import { getConfiguracaoServidor } from './config/config';
import * as App from "./src";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Starting Application Server
const server = Server.init();

server.listen(getConfiguracaoServidor().porta, function () {
  App.init(server);
});
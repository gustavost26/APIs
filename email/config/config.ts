import * as nconf from 'nconf';
import * as path from 'path';
//Read Configurations
const configs = new nconf.Provider({
  store: {
    type: 'file',
    file: path.join(
      __dirname,
      `./env/config.${process.env.NODE_ENV || 'dev'}.json`
    )
  }
});

export interface IConfiguracaoServidor {
  porta: number;
}

export interface IConfigEmail {
  host: string;
  port: number;
  security: boolean;
  auth: {
      user: string;
      pass: string;
  }
}

export const getConfiguracaoServidor = (): IConfiguracaoServidor =>
  configs.get('servidor');

export const getConfigEmail = (): IConfigEmail =>
  configs.get('email');

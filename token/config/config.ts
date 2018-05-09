import * as nconf from 'nconf';
import * as path from 'path';

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

export interface IConfiguracaoBancoDados {
  stringConexao: string;
}

export interface IConfigToken {
  secret: string;
}

export const getConfiguracaoBancoDados = (): IConfiguracaoBancoDados =>
  configs.get('bancoDados');

export const getConfiguracaoServidor = (): IConfiguracaoServidor =>
  configs.get('servidor');

export const getConfigToken = (): IConfigToken =>
  configs.get('token');

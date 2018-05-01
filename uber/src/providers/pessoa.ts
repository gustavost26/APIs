import { DbService } from './db';
import { PessoaModel, IPessoaModel  } from './../models/pessoa';

export default class PessoaDatabase extends DbService<IPessoaModel> {
  constructor() {
    super(PessoaModel);
  }
}

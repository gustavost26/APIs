import { DbService } from './db';
import { MotoristaModel, IMotoristaModel  } from './../models/motorista';

export default class MotoristaDatabase extends DbService<IMotoristaModel> {
  constructor() {
    super(MotoristaModel);
  }
}

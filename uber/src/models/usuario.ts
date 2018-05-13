import { Schema, Document, model } from 'mongoose';

export interface IUsuarioModel extends Document {
  email: string,
  senha: string,
  token?: string,
  dataCriacao?: Date;
}

export const UsuarioSchema = new Schema({
  email: { type: String, unique: true, required: [true, 'Nome é obrigatório.'] },
  senha: { type: String, required: [true, 'Senha é obrigatório'] },
  token: { type: String},
  dataCriacao: { type: Date, default: Date.now }
});

export const UsuarioModel = model<IUsuarioModel>('Usuario', UsuarioSchema);
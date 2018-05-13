import { Schema, Document, model } from 'mongoose';

export interface IPessoaModel extends Document {
    nome: string;
    dt_nascimento: Date;
    telefone: string;
    nif: number;
    id_usuario: Schema.Types.ObjectId;
    dataCriacao: Date;
}

export const PessoaSchema = new Schema({
    nome: {type: String, required: [true, 'Nome é obrigatorio']},
    dt_nascimento: {type: Date, required: [true, 'Data de Nascimento é obrigatorio']},
    telefone: {type: String, required: [true, 'Telefone é obrigatorio']},
    nif: {type: Number, unique: true, required: [true, 'Nif é obrigatorio']},
    id_usuario: {type: Schema.Types.ObjectId, unique: true, required: [true, 'Id do usuário é obrigatorio']},
    dataCriacao: {type: Date, default: Date.now }
});

export const PessoaModel = model<IPessoaModel>('Pessoa', PessoaSchema);
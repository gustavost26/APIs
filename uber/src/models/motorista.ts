import { Schema, Document, model } from 'mongoose';

export interface IMotoristaModel extends Document {
    nome: string;
    dt_nascimento: Date;
    cnh: string;
    user: number;
    endereco: {
        rua: string;
        numero: number;
        complemento: string;
        estado: string;
        cidade: string;
        pais: string;
    }
    telefone: string;
    veiculo: {
        marca: string;
        modelo: string;
        ano: number;
        cor: string;
        placa: string;
        status: string;
    };
    dataCriacao?: Date;
}

export interface ILacalizaçãoMotoristaModel extends Document {
    id_motorista: Schema.Types.ObjectId;
    localizacao: {
        latitude: number;
        longitude: number;
    };
    data: Date;

}

export const MotoristaSchema = new Schema({
    nome: {type: String, required: [true, 'Nome é obrigatorio']},
    dt_nascimento: {type: Date, required: [true, 'Data de Nascimento é obrigatorio']},
    endereco: {
        rua: {type: String, required: [true, 'Rua é obrigatorio']},
        numero: {type: String, required: [true, 'Numero é obrigatorio']},
        complemento: {type: String},
        estado: {type: String, required: [true, 'Estado é obrigatorio']},
        cidade: {type: String, required: [true, 'Cidade é obrigatorio']},
        pais: {type: String, required: [true, 'Pais é obrigatorio']}
    },
    telefone: {type: String, required: [true, 'Telefone é obrigatorio']},
    veiculo: {
        marca: {type: String, required: [true, 'Marca é obrigatorio']},
        modelo: {type: String, required: [true, 'Modelo é obrigatorio']},
        ano: {type: String, required: [true, 'Ano é obrigatorio']},
        cor: {type: String, required: [true, 'Cor é obrigatorio']},
        placa: {type: String, required: [true, 'Placa é obrigatorio']},
        status: {type: String, required: [true, 'Status é obrigatorio']},
    },
    dataCriacao: {type: Date, default: Date.now }
});

export const LocalizacaoSchema = new Schema({
    id_motorista: {type: Schema.Types.ObjectId, required: [true, 'Id é obrigatorio']},
    localizacao: {
        latitude: {type: Number, required: [true, 'Latitude é obrigatorio']},
        longitude: {type: Number, required: [true, 'Longitude é obrigatorio']},
    },
    data: {type: Date, default: Date.now }
});

export const MotoristaModel = model<IMotoristaModel>('Motorista', MotoristaSchema);
export const LocalizacaoModel = model<ILacalizaçãoMotoristaModel>('Localizacao', LocalizacaoSchema);
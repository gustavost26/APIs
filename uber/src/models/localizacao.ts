import { Schema, Document, model } from 'mongoose';

export interface ILocalizacaoModel extends Document {
    id_user: Schema.Types.ObjectId;
    motorista: boolean;
    localizacao: {
        latitude: number;
        longitude: number;
    };
    data: Date;
}

export const LocalizacaoSchema = new Schema({
    id_user: {type: Schema.Types.ObjectId, required: [true, 'Id é obrigatorio']},
    motorista: {type: Boolean, required: [true, 'flag é obrigatorio']},
    localizacao: {
        latitude: {type: Number, required: [true, 'Latitude é obrigatorio']},
        longitude: {type: Number, required: [true, 'Longitude é obrigatorio']},
    },
    data: {type: Date, default: Date.now }
});

export const LocalizacaoModel = model<ILocalizacaoModel>('Localizacao', LocalizacaoSchema);
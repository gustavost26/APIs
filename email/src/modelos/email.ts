import { Schema, Document, model } from 'mongoose';

export interface IEmailModel extends Document {
    email: string;
    assunto: string;
    mensagem: string;
    dataEnvio: Date;
}

export const EmailSchema = new Schema({
    email: { type: String, required: [true, 'Email é obrigatório.'] },
    assunto: { type: String, required: [true, 'Assunto é obrigatório.']},
    mensagem: { type: String, required: [true, 'Mensagem é obrigatório.']},
    dataEnvio: { type: Date, default: Date.now }
});

export const EmailModel = model<IEmailModel>('Email', EmailSchema);
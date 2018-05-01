import { Schema, Document, model } from 'mongoose';

export interface IUserModel extends Document {
    email: string;
    password: string;
    dataCriacao?: Date;
}

export const UserSchema = new Schema({
    email: { type: String, required: [true, 'Email é obrigatório.'] },
    password: { type: String, required: [true, 'Password é obrigatório.']},
    dataCriacao: { type: Date, default: Date.now }
});

export const UserModel = model<IUserModel>('User', UserSchema);
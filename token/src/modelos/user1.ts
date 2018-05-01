import * as mongoose from 'mongoose';

export interface IUserModel {
    email: string;
    password: string;
}

const User1Schema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: [true, 'Email é obrigatório.'] },
    password: { type: String, required: [true, 'Password é obrigatório.']},
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User1', User1Schema); 
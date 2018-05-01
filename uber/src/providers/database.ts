import { PessoaModel } from '../models/pessoa';
import { UsuarioModel } from '../models/usuario';
import { MotoristaModel } from '../models/motorista';
import * as ErrorUtil from '../commons/utils/error';

export const getAll = async () => {
    try {
        return await PessoaModel.find({});
    } catch(error) {
        console.log('getAll: ', error);
        throw error;
    }
}

export const getById = async (id: any) => {
    try {
        return await PessoaModel.findById(id);
    } catch(error) {
        console.log('getById: ', error);
        throw error;
    }
}

export const create = async (pessoa: any) => {
    try {
        return await PessoaModel.create(pessoa);
    } catch(error) {
        console.log('create: ', error);
        throw error;
    }
}

export const createUser = async (usuario: any) => {
    try {
        return await UsuarioModel.create(usuario);
    } catch(error) {
        console.log('create : ', error);
        throw error;
    }
}

export const update = async (id: number, pessoa: any) => {
    try {
        return PessoaModel.findByIdAndUpdate(id, pessoa);
    } catch(error) {
        console.log('update: ', error);
        throw error;
    }
}

export const remove = async (id: number) => {
    try {
        return await PessoaModel.remove(id);
    } catch(error) {
        console.log('Remover: ', error);
        throw error;
    }
}

export const getAllMotorista = async () => {
    try {
        return await MotoristaModel.find({});
    } catch(error) {
        console.log('getAll: ', error);
        throw error;
    }
}

export const getByIdMotorista = async (id: any) => {
    try {
        return await MotoristaModel.findById(id);
    } catch(error) {
        console.log('getById: ', error);
        throw error;
    }
}

export const createMotorista = async (pessoa: any) => {
    try {
        return await MotoristaModel.create(pessoa);
    } catch(error) {
        console.log('create: ', error);
        throw error;
    }
}

export const updateMotorista = async (id: number, pessoa: any) => {
    try {
        return MotoristaModel.findByIdAndUpdate(id, pessoa);
    } catch(error) {
        console.log('update: ', error);
        throw error;
    }
}

export const removeMotorista = async (id: number) => {
    try {
        return await MotoristaModel.remove(id);
    } catch(error) {
        console.log('Remover: ', error);
        throw error;
    }
}

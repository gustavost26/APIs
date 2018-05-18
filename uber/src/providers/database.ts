import { PessoaModel } from '../models/pessoa';
import { UsuarioModel } from '../models/usuario';
import { MotoristaModel } from '../models/motorista';
import { LocalizacaoModel } from '../models/localizacao';
import * as ErrorUtil from '../commons/utils/error';

//PESSOA
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

export const getByEmail = async (email: any) => {
    try {
        return await UsuarioModel.findOne(email);
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

export const update = async (id: number, pessoa: any) => {
    try {
        console.log('entrou 1', id, pessoa);
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

//USUARIO
export const createUser = async (usuario: any) => {
    try {
        return await UsuarioModel.create(usuario);
    } catch(error) {
        console.log('create : ', error);
        throw error;
    }
}

export const updateUser = async (id: number, user: any) => {
    try {
        return UsuarioModel.findByIdAndUpdate(id, user);
    } catch(error) {
        console.log('update: ', error);
        throw error;
    }
}

export const removeUser = async (id: number) => {
    try {
        return await UsuarioModel.remove(id);
    } catch(error) {
        console.log('Remover: ', error);
        throw error;
    }
}

//MOTOTISTA
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

export const findMotoristaLocalizacao = async (lat: number, log: number) => {
    /*try {
        return await LocalizacaoModel.find({localizacao:{$nearSphere:{
            $geometry:
            {type:"Point", coordinates:[lat, log]}
            }}, motorista: true}).limit(1).exec();
    } catch(error) {
        console.log('get: ', error);
        throw error;
    }*/
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

//LOCALIZAÇÃO

export const getAllLocalizacao = async () => {
    try {
        return await LocalizacaoModel.find({});
    } catch(error) {
        console.log('getAll: ', error);
        throw error;
    }
}

export const getByIdLocalizacao = async (id: any) => {
    try {
        return await LocalizacaoModel.findById(id);
    } catch(error) {
        console.log('getById: ', error);
        throw error;
    }
}

export const createLocalizacao = async (localizacao: any) => {
    try {
        return await LocalizacaoModel.create(localizacao);
    } catch(error) {
        console.log('create: ', error);
        throw error;
    }
}

export const getIdUserLocalizacao = async (id: any) => {
    try {
        return await LocalizacaoModel.find({id_user: id});
    } catch(error) {
        console.log('getById: ', error);
        throw error;
    }
}

export const updateLocalizacao= async (id: number, localizacao: any) => {
    try {
        return LocalizacaoModel.findByIdAndUpdate(id, localizacao);
    } catch(error) {
        console.log('update: ', error);
        throw error;
    }
}

export const removeLocalizacao = async (id: string) => {
    try {
        return await LocalizacaoModel.remove({_id: id});
    } catch(error) {
        console.log('Remover: ', error);
        throw error;
    }
}

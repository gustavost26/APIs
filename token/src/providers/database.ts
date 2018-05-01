import User1 from '../modelos/user1';
import * as ErrorUtil from '../commons/utils/error';

const getAll = () => {
    try {
        return User1.find({});
    } catch(error) {
        console.log('getAll: ', error);
        throw error;
    }
}

const getById = (id: any) => {
    try {
        return User1.findById(id);
    } catch(error) {
        console.log('getById: ', error);
        throw error;
    }
}

const create = (user: any) => {
    try {
        return User1.create(user);
    } catch(error) {
        console.log('create: ', error);
        throw error;
    }
}

const update = (id: number, user: any) => {
    try {
        return User1.findByIdAndUpdate(id, user);
    } catch(error) {
        console.log('update: ', error);
        throw error;
    }
}

const remove = (id: number) => {
    try {
        return User1.remove(id);
    } catch(error) {
        console.log('Remover: ', error);
        throw error;
    }
}

export { getAll, getById, create, update, remove }
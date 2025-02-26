import { DB } from '@/database';
import { User , CreateUser} from '@/interfaces/user.interfaces';

const repo = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        const createdUser =  await DB.User.findOne({ where: { email } });
        if (createdUser) {
            return createdUser.toJSON();
        }    
        return null;
    },

    findUserById: async (id: number): Promise<User | null> => {
        const createdUser =  await DB.User.findOne({ where: { id } });
        if (createdUser) {
            return createdUser.toJSON();
        }    
        return null;
    },

    createUser: async (userData: CreateUser): Promise<User> => {
        const createdUser = await DB.User.create(userData);
        return createdUser.toJSON() ;
    },
};

export default repo;

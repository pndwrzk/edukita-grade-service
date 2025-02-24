import { DB } from '@/database';
import { User , CreateUser} from '@/interfaces/user.interfaces';

const repo = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        const createdUser =  await DB.Users.findOne({ where: { email } });
        if (createdUser) {
            return createdUser.toJSON();
        }    
        return null;
    },

    createUser: async (userData: CreateUser): Promise<User> => {
        const createdUser = await DB.Users.create(userData);
        return createdUser.toJSON() ;
    },
};

export default repo;

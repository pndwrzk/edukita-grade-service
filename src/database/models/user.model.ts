import { User } from '@/interfaces/user.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type UserCreationAttributes = Optional<
    User,
    'id'
>;

export class UserModel
    extends Model<User, UserCreationAttributes>
    implements User
{
    public id!: number;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public role!: 'student' | 'teacher';
    public created_at: string | undefined;
    public updated_at: string | undefined;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('student', 'teacher'),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {  
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {  
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'users',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return UserModel;
}

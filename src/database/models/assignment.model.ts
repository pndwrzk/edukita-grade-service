import { Assignment } from "@/interfaces/assignment.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { UserModel} from './user.model';


export type UserCreationAttributes = Optional<Assignment, "id">;

export class AssignmentModel
  extends Model<Assignment, UserCreationAttributes>
  implements Assignment
{
  public id!: number;
  public subject!: 'math' | 'english';
  public title!: string;
  public content!: string;
  public user_id!: number;
  public created_at: string | undefined;
  public updated_at: string | undefined;
}

export default function (sequelize: Sequelize): typeof AssignmentModel {
  AssignmentModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
      subject: {
        allowNull: false,
        type: DataTypes.ENUM('math', 'english'),
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100), 
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT(), 
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "assignments",
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
    }
  );

  AssignmentModel.belongsTo(UserModel, {
      foreignKey: "user_id",
      as: "student",  
  });




  return AssignmentModel;
}

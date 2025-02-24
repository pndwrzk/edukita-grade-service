import { Grade } from "@/interfaces/grade.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { AssignmentModel} from './assignment.model';
import { UserModel} from './user.model';

export type UserCreationAttributes = Optional<Grade, "id">;

export class GradeModel
  extends Model<Grade, UserCreationAttributes>
  implements Grade
{
  public user_id!: number;
  public assignment_id!: number;
  public feedback!: string;
  public grade!: number;
  public id!: number;
  public created_at: string | undefined;
  public updated_at: string | undefined;
}

export default function (sequelize: Sequelize): typeof GradeModel {
  GradeModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      assignment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "assignments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      tableName: "grades",
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
    }
  );

  AssignmentModel.hasOne(GradeModel, {
    foreignKey: "assignment_id",
    as: "grade",
  });

  GradeModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "teacher",  
});

  return GradeModel;
}

import { DataTypes, Model } from 'sequelize';

class Task extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'TODO',
                validate: {
                    isIn: [['todo', 'ongoing', 'success', 'failed']]
                }
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
            projectId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'project',
                    key: 'id'
                }
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }
        }, {
            sequelize,
            modelName: 'Task',
            tableName: 'task',
        });
    }
}

export default Task; 
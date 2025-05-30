import { DataTypes, Model } from 'sequelize';

class Project extends Model {
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
            memberIds: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                defaultValue: [],
                references: null
            },
            taskIds: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                defaultValue: [],
                references: null
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
            modelName: 'Project',
            tableName: 'project',
            foreignKeyChecks: false
        });
    }
}

export default Project; 
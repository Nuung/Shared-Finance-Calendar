module.exports = (sequelize, DataTypes) => (

    sequelize.define('reports', {
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        report_comment: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        reporter_user_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        report_content_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        report_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

);
'user strict';

module.exports = (sequelize, DataTypes) => (

    sequelize.define('bookmark', {
        index: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        toiletId: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
);
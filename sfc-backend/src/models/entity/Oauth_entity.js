'use strict';

module.exports = (sequelize, DataTypes) => (

    sequelize.define('oauth', {
        id: {
            type: DataTypes.STRING(40),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING(40),
            allowNull: false
        },        
        is_oauth: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
);






'user strict';

const { _hasPrimaryKeys } = require("sequelize/lib/model");

module.exports = (sequelize, DataTypes) => (

    sequelize.define('toilet', {
        id: {
            type: DataTypes.STRING(40),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        open_time: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        sex: {
            type: DataTypes.TINYINT(2),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        city_name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        goo_name: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        dong_name: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        street_name: {
            type: DataTypes.STRING(40),
            allowNull: true
        },        
        street_num_main: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        street_num_sub: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        detail: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })


);
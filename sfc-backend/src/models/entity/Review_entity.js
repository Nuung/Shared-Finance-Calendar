
module.exports = (sequelize, DataTypes) => (

    sequelize.define('reviews', {
        id: {
            type: DataTypes.STRING(40),
            allowNUll: false,
            primaryKey: true
        },
        toiletId: {
            type: DataTypes.STRING(40),
            allowNull: false
            // unique: true 
        },
        userId: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        sex: {
            type: DataTypes.TINYINT,
            allowNull: false
        },        
        title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        clean_of_toilet: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount_of_tissue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_old: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        is_secret: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        shot_detail: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
);
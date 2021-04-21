
module.exports = (sequelize, DataTypes) => (
    sequelize.define('ratings', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        toiletId: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        reviewId: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        rate: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
);

module.exports = (sequelize, DataTypes) => (

    sequelize.define('rank', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        review_number: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        review_avg_star: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })

);
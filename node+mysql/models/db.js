const Sequelize = require('sequelize')
    ////conexao com banco de dados
    const sequelize = new Sequelize('postapp', 'root', 'Pipoca006.', {
        host: "localhost",
        dialect: 'mysql'
    })

//para exportar:
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
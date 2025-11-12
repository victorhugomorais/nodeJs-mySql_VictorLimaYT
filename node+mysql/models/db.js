const Sequelize = require('sequelize')
    ////conexao com banco de dados
    const sequelize = new Sequelize('postapp', 'root', 'SenhaBanco', {
        host: "localhost",
        dialect: 'mysql'
    })

//para exportar:
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

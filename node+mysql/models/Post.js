const db = require("./db")

const Post = db.sequelize.define('postagens',{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

//Post.sync({force: true})
//sempre que criar a tabela, COMENTE EM SEGUIDA, se nao fica criando nova e apagando os registros anteriores.

module.exports = Post

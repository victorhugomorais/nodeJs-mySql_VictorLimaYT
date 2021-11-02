const express = require('express')//importamos a a biblioteca express após instalarmos com npm install express --save
const app = express() // aqui estamos importando todas as funções do express para a constante app, logo usaremos a constante app para usar as funções do express

//nesta aula instalamos o handlebars com o comando "npm install --save express-handlebars"
//chamando o handlebars pro nosso projeto, após instala-lo
const handlebars = require('express-handlebars')

//o body parser é um analisador de corpo: ele analisa o corpo de um formulario, por exemplo, e temos acesso a seus campos a partir do body parser, para jogar numa variavel ou num banco de dados, por exemplo
const bodyParser = require('body-parser')

//aqui irei chamar nossa tabela Posts(model Posts), para que possamos colocar os conteúdos dentro de um banco de dados!
const Post = require('./models/Post')



//config
    //template engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
        //com estas duas linhas estamos falando pro express que queremos usar o handlebars como o template engine do nosso projeto
        //agora criamos a pasta "views" no diretório do projeto, e "layouts" dentro, e "main.handlebars" dentro -> que será nosso layout padrão chamado "main", como foi definido na linha acima

        //body-parser
        app.use(express.urlencoded({extended:false}))
        app.use(express.json())

        //como estou me conectando com Posts, apaguei o codigo abaixo
        //conexao com banco de dados
            // const Sequelize = require('sequelize')
            // const sequelize = new Sequelize('teste', 'root', 'Pipoca006.', {
            //     host: "localhost",
            //     dialect: 'mysql'
            // })
                //fim da aula 19


//inicio da aula 20
            app.get("/cad", function(req, res){ 
                res.render('formulario')
            }) //usamos o res.render para que a URL localhost:8081/cad chame o arquivo formulario criado no diretório "views", que é nosso diretorio de templates do handlebars(html)

            // app.post("/add", function(req, res){
            //     res.send("titulo: " +req.body.titulo + " conteudo: " + req.body.conteudo)
            // })

            //fim aula 21

//inicio aula 22 body-parser
//npm install --save body-parser e importar com require lá em cima e configurar nas config logo abaixa das requires.

        //aula 24
            app.post("/add", function(req, res){
                Post.create({
                    titulo: req.body.titulo,
                    conteudo: req.body.conteudo
                }).then(function(){
                    res.redirect("/home")
                    //res.send("post criado com sucesso")
                }).catch(function(erro){
                    res.send("houve um erro: " + erro)
                })
            })

            //pagina de redirecionamento
            // app.get("/home", function(req,res){
            //     res.render("home")
            // })

            //redireciona pra página abaixo após cadastrar novo registro no banco de dados
            //aula 24
            app.get("/home",function(req,res){// o findAll retorna todos os dados que existe na tabela postagens
                //o then recebe todos os posts
                Post.findAll({order: [['id', 'DESC']]}).then(function(posts){//{order: [['id', 'DESC']]} DENTRO de findAll para ordenar em ordem descrecente(do mais novo, pro mais antigo)
                    res.render('home', {posts: posts})
                })
            })
            //ordem crescente(posts mais antigo seguidos dos mais recentes) é o padrão, não precisa colocar nada dentro do findAll
            // app.get("/home",function(req,res){// o findAll retorna todos os dados que existe na tabela postagens
            //     //o then recebe todos os posts
            //     Post.findAll()).then(function(posts){//{order: [['id', 'DESC']]} DENTRO de findAll para ordenar em ordem descrecente(do mais novo, pro mais antigo)
            //         res.render('home', {posts: posts})
            //     })
            // })

            //aula 25 deletando posts
            app.get("/deletar/:id", function(req,res){
                Post.destroy({where: {
                    id: req.params.id
                }
                }).then(function(){
                    res.send("Postagem deletada com sucesso")
                    
                }).catch(function(erro){
                    res.send("esta postagem não existe! " + erro)
                })
            })

            //desafio próprio: fazer o update dos registros!
            app.get("/editar/:id", function(req,res){    
                id = req.params.id;
                res.render('edit')
            })

            app.post("/edit", function(req,res){
                Post.update({
                    titulo: req.body.titulo,
                    conteudo: req.body.conteudo
                }, {
                    where: { id: id },
                }).then( () => {
                    res.redirect('/home')
                })  
            })

app.listen(8082, function(){
    console.log("server ta on na url http://localhost:8082/home http://localhost:8082/cad ")
})
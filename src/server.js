// Servidor
const express = require('express')
const server = express()

const {pageGiveClasses, pageLanding, pageStudy, saveClasses, pageClassCreated } = require('./pages')

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
}) 

// Início e configuração do servidor
server 
// receber os dados do req.body
.use(express.urlencoded({ extended: true}))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/classcreated", pageClassCreated)
// Start do servidor
.listen(5500)
const express = require("express")

const server = express()

const db = require("./database/db.js")
var sav = new Boolean(true)
var saved = new Boolean(false)

//Configurar pasta pública
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({
    extended: true
}))
//Solicitando o Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//home-page
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    //req.query
    return res.render("create-point.html")

})
server.post("/savepoint", (req, res) => {


    const query = `
            INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `


    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", {
                saved: false,
                sav: false,
            })

        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {
            saved: true,
            sav: true,
        })

    }

    db.run(query, values, afterInsertData)


})

server.get("/search", (req, res) => {
    const search = req.query.search

    //mostrar pesquisa vazia
    if (search == "") {
        return res.render("search-results.html", {
            total: 0
        })

    }



    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,
        function (err, rows) {
            if (err) {
                return console.log(err)
            }

            const total = rows.length

            return res.render("search-results.html", {
                places: rows,
                total: total
            })
        })

})


//inicia o servidor
server.listen(3000)
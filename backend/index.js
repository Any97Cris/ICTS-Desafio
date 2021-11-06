const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudicts",
});

app.use(express.json());
app.use(cors());

app.post("/api/produto", (req, res) => {

    const { descricao, nome, preco } = req.body;

    let mysql = "INSERT INTO produtos ( nome, preco, descricao, data_criacao) VALUES (?, ?, ?, NOW())";
    db.query(mysql, [nome, preco, descricao], (err, result) => {
        res.send(result);
    });
});

app.get("/api/produto/:id", (req, res) => {

    const { id } = req.params;

    let mysql = "SELECT * from produtos WHERE id = ?";

    db.query(mysql, [id], (err, result) => {
        if (err) res.send(err);
        res.send(result[0]);
    });
});

app.get("/api/produtos", (req, res) => {
    let mysql = "SELECT * FROM produtos";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/produto", (req, res) => {

    const { id, descricao, nome, preco } = req.body;

    let mysql = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizacao = NOW() WHERE id = ?";

    db.query(mysql, [nome, descricao, preco, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/api/produto/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM produtos WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/api/compra", (req, res) => {

    const { total, tipo_pagamento, status } = req.body;

    let mysql = "INSERT INTO compras ( total, tipo_pagamento, status) VALUES (?, ?, ?)";
    db.query(mysql, [total, tipo_pagamento, status], (err, result) => {
        res.send(result);
    });
});

app.get("/api/compra/:id", (req, res) => {
    const { id } = req.params;

    let mysql = "SELECT * from compras WHERE id = ?";
    db.query(mysql, [id], (err, result) => {
        if (err) res.send(err);
        res.send(result[0]);
    });
});

app.get("/api/compras", (req, res) => {
    let mysql = "SELECT * FROM compras";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/compra", (req, res) => {

    const { id, total, tipo_pagamento, status } = req.body;

    let mysql = "UPDATE compras SET total = ?, tipo_pagamento = ?, status = ? WHERE id = ?";

    db.query(mysql, [total, tipo_pagamento, status, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/api/compra/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM compras WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});
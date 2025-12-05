const express = require('express');
const router = express.Router();

router.get('/inicio', (req, res) => {
    res.render('pt/home');
});

router.get("/sobre-nos", (req, res) => {
    res.render('pt/sobre-nos');
});

router.get("/missao-visao-e-valores", (req, res) => {
    res.render('pt/missao-visao-e-valores');
});

router.get("/responsabilidade-social-e-ambiental", (req, res) => {
    res.render('pt/responsabilidade-social-e-ambiental');
});

router.get("/o-que-fazemos", (req, res) => {
    res.render('pt/o-que-fazemos');
});

router.get("/inventarios-de-activos-patrimoniais", (req, res) => {
    res.render('pt/inventario-de-ativos');
});

router.get("/logistica-contratual", (req, res) => {
    res.render('pt/logistica-contratual');
});

router.get("/inventario-de-stocks", (req, res) => {
    res.render('pt/inventario-de-stocks');
});

router.get("/operacoes-logisticas-de-campo", (req, res) => {
    res.render('pt/operacoes-logisticas-de-campo');
});

router.get("/academia-prolog", (req, res) => {
    res.redirect('academia');
});

router.get('/trabalhe-conosco', (req, res) => { 
    res.render('pt/trabalhe-conosco');
});

router.get("/prochain", (req, res) => {
    res.redirect('https://www.prochain.ao');
});

router.get('/termos-de-servicos', (req, res) => { 
    res.render('pt/termos-de-servicos');
});

router.get('/politica-de-privacidade', (req, res) => { 
    res.render('pt/politica-de-privacidade');
});

module.exports = router;
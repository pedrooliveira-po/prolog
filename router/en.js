const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/inicio');
});

router.get('/inicio', (req, res) => {
    res.render('en/home');
});

router.get("/sobre-nos", (req, res) => {
    res.render('en/sobre-nos');
});

router.get("/missao-visao-e-valores", (req, res) => {
    res.render('en/missao-visao-e-valores');
});

router.get("/responsabilidade-social-e-ambiental", (req, res) => {
    res.render('en/responsabilidade-social-e-ambiental');
});

router.get("/o-que-fazemos", (req, res) => {
    res.render('en/o-que-fazemos');
});

router.get("/inventarios-de-activos-patrimoniais", (req, res) => {
    res.render('en/inventario-de-ativos');
});

router.get("/logistica-contratual", (req, res) => {
    res.render('en/logistica-contratual');
});

router.get("/inventario-de-stocks", (req, res) => {
    res.render('en/inventario-de-stocks');
});

router.get("/operacoes-logisticas-de-campo", (req, res) => {
    res.render('en/operacoes-logisticas-de-campo');
});

router.get("/academia-prolog", (req, res) => {
    res.render('en/academia');
});

router.get('/trabalhe-conosco', (req, res) => { 
    res.render('en/trabalhe-conosco');
});

router.get("/prochain", (req, res) => {
    res.redirect('https://www.prochain.ao');
});

router.get('/termos-de-servicos', (req, res) => { 
    res.render('en/termos-de-servicos');
});

router.get('/politica-de-privacidade', (req, res) => { 
    res.render('en/politica-de-privacidade');
});

module.exports = router;
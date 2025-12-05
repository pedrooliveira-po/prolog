const sequelize = require('sequelize');

const bancoDados = process.env.DB_NAME || 'prologsite';
const usuario = process.env.DB_USUARIO || 'root';
const senha = process.env.DB_SENHA || '';

const conexao = new sequelize(bancoDados, usuario, senha, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: 0,
    dialectOptions: {
        charset: 'utf8mb4',
    },
});

module.exports = conexao;
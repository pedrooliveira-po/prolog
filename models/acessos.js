const { DataTypes } = require('sequelize')
const conexao = require('../config/db');

const Acesso = conexao.define('acessos', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lingua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pagina: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Acesso;
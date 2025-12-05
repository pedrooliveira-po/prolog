const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { randomUUID } = require("crypto");
require("dotenv").config();

// Importações dos roteadores
const defaultRouter = require("./router/default");
const ptRouter = require("./router/pt");
const enRouter = require("./router/en");

// Importações do banco de dados
const conexao = require("./config/db");
const Acesso = require("./models/acessos");

/* ========================== CONEXÃO E SINCRONIZAÇÃO COM O BANCO DE DADOS ========================== */

conexao
  .authenticate()
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((erro) =>
    console.error("Erro ao se conectar ao Banco de dados: " + erro)
  );

conexao
  .sync({ alter: false })
  .then(() => console.log("Tabelas sincronizadas com sucesso!"))
  .catch((erro) => console.error("Erro ao sincronizar Tabelas: " + erro));

const app = express();
const port = process.env.PORT || 3952;

app.disable("x-powered-by");

app.set("views", "views");
app.set("view engine", "ejs");

app.set("trust proxy", true);

app.use(express.static(path.join(__dirname, "public")));

app.locals.versao = "01.01";
app.locals.cssLinksCentralizados = [];
app.locals.jsLinksCentralizados = [
  '/assets/js/neve.js',
  '/assets/js/natal.js',
];

/* ========================== MIDDLEWARES ========================== */

// Middleware para registrar visitas
async function adicionarVisita(req, res, next) {
  if (
    req.path.match(
      /\.(css|js|png|jpg|jpeg|gif|ico|webp|svg|mp4|woff|woff2)$/
    ) ||
    req.path.startsWith("/api/") ||
    req.path.startsWith("/.")
  ) {
    return next();
  }

  const suspiciousPatterns = [
    /\.php$/i,
    /wp-admin|wp-content|wp-includes/i,
    /\.xml$/i,
    /shell|alfa|wso|backdoor/i,
    /\.env|config\.json|sftp-config/i,
    /eval|base64|exec/i,
    /\.\./,
    /\x00/,
  ];

  const isSuspicious = suspiciousPatterns.some((pattern) =>
    pattern.test(req.path)
  );

  if (isSuspicious) {
    console.warn(`🚨 Tentativa suspeita bloqueada: ${req.ip} -> ${req.path}`);
    return next();
  }

  const blockedIPs = new Set([
    "74.176.186.150",
    "172.190.71.43",
    "103.186.31.45",
    "45.149.173.209",
    "45.149.173.225",
  ]);

  if (blockedIPs.has(req.ip)) {
    console.warn(`🚫 IP bloqueado: ${req.ip}`);
    return next();
  }

  try {
    let ip = req.ip;

    if (ip === "127.0.0.1" || ip === "::1") {
      const forwardedFor = req.headers["x-forwarded-for"];
      if (forwardedFor) {
        ip = forwardedFor.split(",")[0].trim();
      } else {
        ip =
          req.headers["x-real-ip"] ||
          req.headers["cf-connecting-ip"] ||
          req.socket.remoteAddress;
      }
    }

    if (!ip) {
      return next();
    }

    const pathParts = req.originalUrl.split("/").filter(Boolean);
    const langPrefix = pathParts[0];
    const lingua = langPrefix === "pt" ? "portugues" : "ingles";
    const pagina =
      "/" + pathParts.slice(lingua === "portugues" ? 1 : 0).join("/");

    const visitante = await Acesso.findOne({
      where: { ip },
      order: [["timestamp", "DESC"]],
    });

    const agora = new Date();
    const tempoLimite = new Date(agora.getTime() - 1000 * 60 * 5);

    if (
      !visitante ||
      visitante.timestamp < tempoLimite ||
      pagina !== visitante.pagina
    ) {
      await Acesso.create({
        id: randomUUID(),
        ip,
        pagina,
        lingua,
        timestamp: agora,
      });
    }
  } catch (erro) {
    console.error("Erro ao adicionar visita: ", erro);
  }

  next();
}

app.use(adicionarVisita);

/* ========================== ROTAS ========================== */

// Rota principal que redireciona com base no idioma do navegador
app.get("/", (req, res) => {
  const idioma = req.headers["accept-language"]?.split(",")[0] || "pt";

  if (idioma.startsWith("pt")) {
    res.render("pt/home");
  } else if (idioma.startsWith("en")) {
    res.render("en/home");
  } else {
    res.render("pt/home");
  }
});

app.get('/gerar-assinatura', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/geradorAssinatura.html'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'))
});

function redirecionarLinguagem(req, res, next) {
  const idioma = req.headers["accept-language"]?.split(",")[0] || "pt";
  const caminho = req.path;

  if(caminho.startsWith('/pt/') || caminho.startsWith('/en/') || caminho === '/pt' || caminho === '/en') {
    return next()
  }

  if (idioma.startsWith("pt")) {
    res.redirect(`/pt${caminho}`);
  } else if (idioma.startsWith("en")) {
    res.redirect(`/en${caminho}`);
  } else {
    res.redirect(`/pt${caminho}`);
  }
}

// Usa os roteadores para cada idioma
app.use("/", redirecionarLinguagem, defaultRouter);
app.use("/pt", ptRouter);
app.use("/en", enRouter);

app.use((req, res, next) => res.status(404).render('erros/404'));


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

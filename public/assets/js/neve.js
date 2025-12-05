(() => {
  'use strict';

  const configuracaoPadrao = {
    quantidade: 50,
    velocidade: 1,
    velocidadeVento: 0.5,
    tamanho: { min: 12, max: 20 },
    opacidade: { min: 0.4, max: 0.9 },
    cor: '#ffffff',
    zIndex: 9999,
    ativo: true,
    caracteres: ['❄', '❅', '❆']
  };

  const config = Object.assign({}, configuracaoPadrao, window.SnowConfig || {});

  if (!config.ativo) return;

  let canvas, ctx, flocos = [], animacaoId;

  function criarFloco() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      tamanho: Math.random() * (config.tamanho.max - config.tamanho.min) + config.tamanho.min,
      velocidadeY: Math.random() * 1 + 0.5,
      velocidadeX: Math.random() * config.velocidadeVento - config.velocidadeVento / 2,
      opacidade: Math.random() * (config.opacidade.max - config.opacidade.min) + config.opacidade.min,
      oscilacao: Math.random() * 0.5,
      contadorOscilacao: 0,
      caractere: config.caracteres[Math.floor(Math.random() * config.caracteres.length)]
    };
  }

  function atualizarFloco(f) {
    f.y += f.velocidadeY * config.velocidade;
    f.contadorOscilacao += 0.01;
    f.x += Math.sin(f.contadorOscilacao) * f.oscilacao + f.velocidadeX;

    if (f.y > canvas.height) {
      f.y = -10;
      f.x = Math.random() * canvas.width;
    }

    if (f.x > canvas.width) {
      f.x = 0;
    } else if (f.x < 0) {
      f.x = canvas.width;
    }
  }

  function desenharFloco(f) {
    ctx.font = `${f.tamanho}px Arial`;
    ctx.fillStyle = config.cor;
    ctx.globalAlpha = f.opacidade;
    ctx.fillText(f.caractere, f.x, f.y);
    ctx.globalAlpha = 1;
  }

  function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flocos.length; i++) {
      atualizarFloco(flocos[i]);
      desenharFloco(flocos[i]);
    }

    animacaoId = requestAnimationFrame(animar);
  }

  function iniciarEfeitoNeve() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = config.zIndex;

    document.body.appendChild(canvas);

    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);

    for (let i = 0; i < config.quantidade; i++) {
      flocos.push(criarFloco());
    }

    animar();

    window.SnowEffect = {
      parar: () => {
        if (animacaoId) {
          cancelAnimationFrame(animacaoId);
          animacaoId = null;
        }
        canvas.style.display = 'none';
      },
      iniciar: () => {
        canvas.style.display = 'block';
        if (!animacaoId) {
          animar();
        }
      },
      destruir: () => {
        if (animacaoId) cancelAnimationFrame(animacaoId);
        canvas.remove();
        window.removeEventListener('resize', redimensionarCanvas);
        flocos = [];
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarEfeitoNeve);
  } else {
    iniciarEfeitoNeve();
  }

})();

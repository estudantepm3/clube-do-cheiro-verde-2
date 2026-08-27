/* =========================================================
   Clube do Cheiro Verde — comportamento da página
   JavaScript puro, sem dependências.
   ========================================================= */

(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Menu do celular ---------- */
  var menuBotao = document.getElementById('menu-botao');
  var menu = document.getElementById('menu');

  if (menuBotao && menu) {
    menuBotao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      menuBotao.setAttribute('aria-expanded', String(aberto));
    });

    // clicar em um link fecha o menu
    menu.addEventListener('click', function (evento) {
      if (evento.target.tagName === 'A') {
        menu.classList.remove('aberto');
        menuBotao.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. Cabeçalho ganha fundo depois do topo ---------- */
  var topo = document.getElementById('topo');

  function marcarTopo() {
    topo.classList.toggle('fixo', window.scrollY > 40);
  }

  if (topo) {
    marcarTopo();
    window.addEventListener('scroll', marcarTopo, { passive: true });
  }

  /* ---------- 3. Prateleira de pigmentos ---------- */
  var prateleira = document.getElementById('prateleira');

  if (prateleira) {
    var pigmentos = Array.prototype.slice.call(prateleira.querySelectorAll('.pigmento'));

    function abrir(alvo) {
      pigmentos.forEach(function (pigmento) {
        var ativo = pigmento === alvo;
        pigmento.classList.toggle('aberto', ativo);
        pigmento.setAttribute('aria-expanded', String(ativo));
      });
    }

    pigmentos.forEach(function (pigmento) {
      pigmento.addEventListener('click', function () {
        // clicar de novo no que já está aberto fecha a ficha
        abrir(pigmento.classList.contains('aberto') ? null : pigmento);
      });

      // navegação por teclado abre a ficha junto com o foco
      // (só no teclado: no mouse, o clique já resolve)
      pigmento.addEventListener('focus', function () {
        var porTeclado = true;
        try {
          porTeclado = pigmento.matches(':focus-visible');
        } catch (erro) {
          porTeclado = true;
        }
        if (porTeclado) abrir(pigmento);
      });
    });

    // o primeiro pigmento já entra aberto, depois da animação de subida
    window.setTimeout(function () {
      abrir(pigmentos[0]);
    }, semMovimento ? 0 : 900);
  }

  /* ---------- 4. Ciclo de cobrança dos planos ---------- */
  var opcoesCiclo = document.querySelectorAll('.ciclo__opcao');
  var camposCiclo = document.querySelectorAll('[data-mensal]');

  function trocarCiclo(ciclo) {
    camposCiclo.forEach(function (campo) {
      campo.textContent = campo.getAttribute('data-' + ciclo);
    });

    opcoesCiclo.forEach(function (opcao) {
      var ativa = opcao.getAttribute('data-ciclo') === ciclo;
      opcao.classList.toggle('ativo', ativa);
      opcao.setAttribute('aria-pressed', String(ativa));
    });
  }

  opcoesCiclo.forEach(function (opcao) {
    opcao.addEventListener('click', function () {
      trocarCiclo(opcao.getAttribute('data-ciclo'));
    });
  });

  /* ---------- 5. Doses: uma faixa de pigmento por tempero do plano ---------- */
  var pigmentosDaCasa = ['#B5330E', '#E9AE2B', '#2F5A33', '#C9647A', '#B7202B', '#56331E'];

  document.querySelectorAll('.doses').forEach(function (doses) {
    var quantidade = parseInt(doses.getAttribute('data-doses'), 10) || 0;

    for (var i = 0; i < quantidade; i++) {
      var faixa = document.createElement('span');
      faixa.style.background = pigmentosDaCasa[i % pigmentosDaCasa.length];
      doses.appendChild(faixa);
    }
  });

  /* ---------- 6. Revelação no scroll ---------- */
  var elementosRevelar = document.querySelectorAll('.revelar');

  if (semMovimento || !('IntersectionObserver' in window)) {
    elementosRevelar.forEach(function (elemento) {
      elemento.classList.add('visivel');
    });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada, indice) {
        if (!entrada.isIntersecting) return;

        var elemento = entrada.target;
        elemento.style.transitionDelay = (indice * 90) + 'ms';
        elemento.classList.add('visivel');
        observador.unobserve(elemento);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

    elementosRevelar.forEach(function (elemento) {
      observador.observe(elemento);
    });
  }

})();

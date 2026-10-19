// Service worker do app de membros. Existe por UM motivo: notificação.
//
// Não faz cache de nada. Guardar as páginas aqui dentro ia congelar o app na versão
// que o aparelho baixou primeiro, e material novo (bônus, vídeo, extra) deixaria de
// aparecer até alguém limpar os dados do site — o custo é alto e o ganho, com o app
// já leve e hospedado em CDN, é pequeno.
//
// O payload do push é o JSON que a Edge Function `push-enviar` manda:
//   { titulo, corpo, url, tag, imagem }
// `url` é para onde o toque leva (ex.: "app.html#/videos" ou um link de checkout).

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { corpo: e.data && e.data.text() }; }
  var titulo = d.titulo || 'Miçangas da Juh';
  var opcoes = {
    body: d.corpo || '',
    icon: d.imagem || 'assets/logo-192.webp',
    badge: 'assets/logo-96.webp',
    // a tag faz o aviso novo SUBSTITUIR o antigo do mesmo assunto, em vez de
    // empilhar três ofertas iguais na bandeja de quem ficou dias sem abrir
    tag: d.tag || 'oferta',
    renotify: true,
    data: { url: d.url || 'app.html' },
  };
  e.waitUntil(self.registration.showNotification(titulo, opcoes));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var destino = (e.notification.data && e.notification.data.url) || 'app.html';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (abas) {
      // se o app já está aberto, leva ESSA aba para o destino em vez de abrir outra
      for (var i = 0; i < abas.length; i++) {
        if (abas[i].url.indexOf(self.registration.scope) === 0 && 'focus' in abas[i]) {
          abas[i].navigate && abas[i].navigate(destino);
          return abas[i].focus();
        }
      }
      return self.clients.openWindow(destino);
    })
  );
});

// A inscrição expira sozinha de vez em quando. Quando isso acontece o navegador avisa
// aqui, e a próxima abertura do app refaz — quem salva é o assinarPush() do app.html.
self.addEventListener('pushsubscriptionchange', function (e) {
  e.waitUntil(
    self.registration.pushManager.getSubscription().then(function (s) {
      if (!s) return;
      return fetch('https://dxybmayffxvepmwbyezc.supabase.co/functions/v1/membros-push', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ inscricao: s, renovacao: true }),
      });
    })
  );
});

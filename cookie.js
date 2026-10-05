/* Consentimiento de cookies y anuncios. Se carga en el <head> antes del script de AdSense. */
(function () {
  var KEY = "cookieConsent";
  function get() {
    try {
      var v = localStorage.getItem(KEY);
      if (!v && localStorage.getItem("cookiesAceptadas") === "true") { v = "all"; }
      return v;
    } catch (e) { return null; }
  }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.adsbygoogle = window.adsbygoogle || [];
  if (get() === "necessary") { window.adsbygoogle.requestNonPersonalizedAds = 1; }

  document.addEventListener("DOMContentLoaded", function () {
    if (get()) { return; }
    var b = document.createElement("div");
    b.className = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML =
      '<p>Usamos cookies propias y de terceros (como Google AdSense) para que el sitio funcione y para mostrar publicidad. ' +
      'Podés aceptar todo o elegir solo las necesarias, que muestran anuncios no personalizados. ' +
      'Más información en la <a href="privacidad.html">Política de Privacidad</a>.</p>' +
      '<div class="cookie-actions"><button type="button" id="ck-accept">Aceptar todo</button>' +
      '<button type="button" id="ck-necessary" class="secondary">Solo necesarias</button></div>';
    document.body.appendChild(b);
    document.getElementById("ck-accept").addEventListener("click", function () { set("all"); b.remove(); });
    document.getElementById("ck-necessary").addEventListener("click", function () { set("necessary"); b.remove(); location.reload(); });
  });
})();

// Test de Barrios CABA - lógica del quiz. Los perfiles de los barrios los inyecta el build.
const BARRIOS = {"palermo": {"nombre": "Palermo", "zone": "ZONA_NORTE", "w": {"moderno": 3, "centro_movida": 1, "norte_top": 1}, "tagline": "Cafés de especialidad, parques enormes y outfit pensado. Siempre tenés un plan cerca."}, "recoleta": {"nombre": "Recoleta", "zone": "ZONA_NORTE", "w": {"norte_top": 3, "tradicional": 1}, "tagline": "Elegancia, plazas con historia y paseos de domingo. Tenés buen gusto y buenos modales."}, "belgrano": {"nombre": "Belgrano", "zone": "ZONA_NORTE", "w": {"residencial": 3, "norte_top": 1}, "tagline": "Barrio lindo, casas con jardín, barrancas y running. Rutina tranquila y buen mate."}, "colegiales": {"nombre": "Colegiales", "zone": "ZONA_NORTE", "w": {"tradicional": 2, "moderno": 2, "residencial": 1}, "tagline": "Todo lo bueno de Palermo sin tanto ruido: PH, cafés escondidos y bici."}, "almagro": {"nombre": "Almagro", "zone": "ZONA_CENTRO_OESTE", "w": {"centro_movida": 3, "tradicional": 1, "oeste": 1}, "tagline": "Bodegones, tango y movida cultural. Sabés dónde se come bien."}, "caballito": {"nombre": "Caballito", "zone": "ZONA_CENTRO_OESTE", "w": {"residencial": 3, "oeste": 2, "tradicional": 1}, "tagline": "En el medio de todo, con parques y mate. Plaza, termo y vueltas largas."}, "villa-crespo": {"nombre": "Villa Crespo", "zone": "ZONA_CENTRO_OESTE", "w": {"moderno": 2, "centro_movida": 2}, "tagline": "Outlets, cafés y rock. Buscás la ganga, pero también el lugar con onda."}, "flores": {"nombre": "Flores", "zone": "ZONA_CENTRO_OESTE", "w": {"bardo": 2, "oeste": 2, "sur_centro": 1}, "tagline": "Barrio grande, comercial y multicultural. Laburo, comunidad y colectivo directo."}, "boedo": {"nombre": "Boedo", "zone": "ZONA_CENTRO_OESTE", "w": {"tradicional": 3, "centro_movida": 1}, "tagline": "Tango, bodegón y camiseta del Ciclón. Esquina, café y fútbol con amigos."}, "villa-urquiza": {"nombre": "Villa Urquiza", "zone": "ZONA_CENTRO_OESTE", "w": {"residencial": 3, "tradicional": 2}, "tagline": "Zona tranquila, casas con vereda y tango de salón. Barrio, familia y domingo largo."}, "san-telmo": {"nombre": "San Telmo", "zone": "ZONA_SUR_CENTRO", "w": {"moderno": 2, "tradicional": 2, "sur_centro": 1}, "tagline": "Adoquines, antigüedades y bohemia. Historia, feria y mate con tango de fondo."}, "puerto-madero": {"nombre": "Puerto Madero", "zone": "ZONA_SUR_CENTRO", "w": {"norte_top": 3, "moderno": 1}, "tagline": "Modernidad frente al río, puentes y bicicletas. Agenda prolija y cena frente al agua."}, "la-boca": {"nombre": "La Boca", "zone": "ZONA_SUR_SUR", "w": {"bardo": 3, "tradicional": 1}, "tagline": "Pasión, colores y camiseta azul y oro. Aguante, comunidad y barrio con historia."}, "villa-devoto": {"nombre": "Villa Devoto", "zone": "ZONA_SUR_SUR", "w": {"residencial": 3, "tradicional": 1}, "tagline": "Árboles enormes, casonas y calles curvas. Paz, plaza y barrio de película."}, "mataderos": {"nombre": "Mataderos", "zone": "ZONA_SUR_SUR", "w": {"tradicional": 3, "bardo": 1, "sur_centro": 1}, "tagline": "Folklore, asado y criollismo en plena Ciudad. Peña y tradición."}, "parque-patricios": {"nombre": "Parque Patricios", "zone": "ZONA_SUR_SUR", "w": {"sur_centro": 2, "bardo": 2, "moderno": 1}, "tagline": "Un barrio que se reinventó: fútbol, tecnología y bares nuevos en galpones de ladrillo."}};

const QUESTIONS = [
  { q: "1. Sábado 7 de la tarde, ¿cuál plan te gusta más?", ops: [{t:"Quedarse en casa 🏠", tag:"tradicional"}, {t:"Café de especialidad en un lugar estético ☕", tag:"moderno"}, {t:"Tomarse una birrita en algún kiosco o esquina 🍺", tag:"bardo"}, {t:"Mates con algo dulce en la plaza 🧉🥐", tag:"residencial"}]},
  { q: "2. ¿Cómo te movilizás?", ops: [{t:"Subte A, Subte D o colectivos que van directo al oeste 🚊🚍", tag:"oeste"}, {t:"Uber, Cabify o bici 🚗🚲", tag:"norte_top"}, {t:"Colectivo a morir o Subte B, Subte H 🚇🚌", tag:"centro_movida"}, {t:"Tren, Subte C o líneas que salen directo a las terminales 🚆🚊", tag:"sur_centro"}]},
  { q: "3. ¿Qué es lo que más te jode de caminar por la calle?", ops: [{t:"Los manteros y las veredas detonadas", tag:"bardo"}, {t:"Que derrumben casas viejas para meter edificios", tag:"tradicional"}, {t:"Que te arranquen la cabeza por un tostado y un café", tag:"moderno"}, {t:"Los piquetes y las marchas", tag:"sur_centro"}]},
  { q: "4. Bajón a la noche, ¿cuál te sirve?", ops: [{t:"Pizza fría 🍕", tag:"sur_centro"}, {t:"Tiramisú o heladito 🍨", tag:"moderno"}, {t:"Algún bajón del kiosco 🍫🏪", tag:"bardo"}, {t:"Hamburguesita por delivery 🍔", tag:"residencial"}]},
  { q: "5. Si salís de noche, ¿qué lugar te gusta más?", ops: [{t:"Fiesta electrónica o bar cheto 🥃🕺", tag:"norte_top"}, {t:"Centro cultural independiente o peña 💃🎤", tag:"centro_movida"}, {t:"Cervecería de avenida con pantallas o el bar de siempre 🍺📺", tag:"oeste"}, {t:"Bar de rock nacional o boliche de cumbia 🎸🪩", tag:"bardo"}]},
  { q: "6. ¿Cómo es la cuadra ideal donde te gustaría vivir?", ops: [{t:"Calle empedrada con PHs viejos 🏘️", tag:"tradicional"}, {t:"Avenida gigante con movimiento 24hs 🏬", tag:"bardo"}, {t:"Calle residencial, arbolada y silenciosa 🏡", tag:"residencial"}, {t:"Edificio alto con subte en la esquina 🏢", tag:"centro_movida"}]},
  { q: "7. Tenés que elegir un punto de encuentro, ¿cuál te queda cómodo?", ops: [{t:"Corrientes y Dorrego", tag:"ZONA_NORTE"}, {t:"Plaza Serrano / Parque Las Heras", tag:"ZONA_NORTE"}, {t:"Parque Centenario", tag:"ZONA_CENTRO_OESTE"}, {t:"Plaza Flores / Primera Junta", tag:"ZONA_CENTRO_OESTE"}, {t:"Estación Once", tag:"ZONA_SUR_CENTRO"}, {t:"Plaza Constitución / Corrientes y Callao", tag:"ZONA_SUR_CENTRO"}, {t:"Parque Patricios / Mataderos / La cancha de Boca", tag:"ZONA_SUR_SUR"}]},
  { q: "8. ¿Cuál sería tu espacio verde para pasar el domingo?", ops: [{t:"Los Lagos de Palermo, Jardín Japonés o el Planetario", tag:"ZONA_NORTE"}, {t:"Parque Centenario, Parque Rivadavia o Parque Chacabuco", tag:"ZONA_CENTRO_OESTE"}, {t:"Plaza Dorrego, Parque Lezama o Costanera Sur", tag:"ZONA_SUR_CENTRO"}, {t:"Parque Avellaneda, la plaza de Devoto o Agronomía", tag:"ZONA_SUR_SUR"}]},
  { q: "9. ¿Qué prenda o accesorio no te puede faltar en la calle?", ops: [{t:"Gorrita, ropa oversize y algún bolsito 🧢👖👜", tag:"moderno"}, {t:"Campera de cuero gastada o ropa oscura de rock 🎸🥾", tag:"bardo"}, {t:"Chomba o camisa, perfume y zapatos 👔👞", tag:"norte_top"}, {t:"Ropa deportiva cómoda 👟👕", tag:"residencial"}]},
  { q: "10. Si te ganás el Quini 6, ¿qué te comprás?", ops: [{t:"Departamento estilo europeo en Recoleta", tag:"norte_top"}, {t:"Monoambiente moderno", tag:"moderno"}, {t:"PH enorme con patio interno y parrilla", tag:"tradicional"}, {t:"Caserón gigante con patio cerca de la General Paz", tag:"residencial"}]},
  { q: "11. Te tomás un bondi lleno en hora pico, ¿qué actitud tomás?", ops: [{t:"Te ponés los auriculares y ponés la mente en blanco 🎧", tag:"residencial"}, {t:"Vas re atento cuidando las pertenencias 🚌", tag:"sur_centro"}, {t:"Aprovechás el viaje largo para responder audios 📱", tag:"centro_movida"}, {t:"Tratás de viajar en hora valle o pedís un auto privado 🚗", tag:"norte_top"}]},
  { q: "12. ¿Dónde solés comprar la ropa o las cosas que necesitás?", ops: [{t:"En locales independientes o ferias americanas seleccionadas 🧥", tag:"moderno"}, {t:"En el shopping más cercano o locales oficiales 🛍️", tag:"norte_top"}, {t:"En centros comerciales a cielo abierto o mayoristas 🏪", tag:"bardo"}, {t:"En el negocio de toda la vida atendido por sus dueños 👴", tag:"tradicional"}]},
  { q: "13. ¿Cuál es tu relación ideal con el fútbol de la ciudad?", ops: [{t:"Cancha todos los findes a puro grito y aguante popular ⚽", tag:"bardo"}, {t:"Lo mirás tranqui por la tele con amigos comiendo un asado 📺", tag:"tradicional"}, {t:"No te cambia la vida, preferís ir al gimnasio 🏃", tag:"moderno"}, {t:"Hincha de club de barrio, te gusta ir a las actividades sociales 🏆", tag:"residencial"}]},
  { q: "14. Si te invitan a cenar afuera un viernes, ¿qué menú preferís?", ops: [{t:"Plato gourmet palermitano con luces bajas 🍽️", tag:"moderno"}, {t:"Un plato abundante de pastas o milanesa de bodegón 🍝", tag:"tradicional"}, {t:"Algo rápido al paso, tipo hamburguesa 🍔", tag:"centro_movida"}, {t:"Una parrilla con reserva previa 🥩", tag:"norte_top"}]},
  { q: "15. ¿Qué tipo de música suena en tus auriculares?", ops: [{t:"Indie, trap, urbano o algún podcast del momento 🎧", tag:"moderno"}, {t:"Rock nacional, folclore, tango o clásicos rioplatenses 🎸", tag:"tradicional"}, {t:"Cumbia, cuarteto o RKT bien arriba 🪩", tag:"bardo"}, {t:"Música tranqui, pop, electrónica melódica 📻", tag:"residencial"}]}
];

function newScores() {
  return {
    style: { tradicional: 0, moderno: 0, bardo: 0, residencial: 0, oeste: 0, norte_top: 0, centro_movida: 0, sur_centro: 0 },
    zone: { ZONA_NORTE: 0, ZONA_CENTRO_OESTE: 0, ZONA_SUR_CENTRO: 0, ZONA_SUR_SUR: 0 }
  };
}

function addAnswer(scores, tag) {
  if (tag.indexOf("ZONA_") === 0) { scores.zone[tag] += 3; } else { scores.style[tag] += 1; }
}

// Puntaje esperado de cada tag si se respondiera al azar. Se resta para que
// los tags que aparecen en muchas opciones no favorezcan siempre a los mismos barrios.
const EXPECTED = (function () {
  const e = { style: {}, zone: {} };
  QUESTIONS.forEach(function (q) {
    q.ops.forEach(function (op) {
      const isZone = op.tag.indexOf("ZONA_") === 0;
      const bucket = isZone ? e.zone : e.style;
      bucket[op.tag] = (bucket[op.tag] || 0) + (isZone ? 3 : 1) / q.ops.length;
    });
  });
  return e;
})();

function rankBarrios(scores) {
  return Object.keys(BARRIOS).map(function (slug) {
    const b = BARRIOS[slug];
    let s = ((scores.zone[b.zone] || 0) - (EXPECTED.zone[b.zone] || 0)) * 1.5;
    for (const t in b.w) { s += b.w[t] * ((scores.style[t] || 0) - (EXPECTED.style[t] || 0)); }
    return { slug: slug, score: s, b: b };
  }).sort(function (a, c) { return c.score - a.score; });
}

if (typeof module !== "undefined") { module.exports = { QUESTIONS, BARRIOS, newScores, addAnswer, rankBarrios }; }

if (typeof document !== "undefined") {
  (function () {
    let gender = "";
    let current = 0;
    let scores = newScores();
    let ranking = [];
    const $ = function (id) { return document.getElementById(id); };
    const screens = ["screen-start", "screen-gender", "screen-quiz", "screen-loading", "screen-result"];

    function show(id) {
      screens.forEach(function (s) { $(s).classList.add("hidden"); });
      $(id).classList.remove("hidden");
      const box = $("main-container");
      if (id === "screen-start" || id === "screen-result") { box.classList.add("fileteado-active"); }
      else { box.classList.remove("fileteado-active"); }
    }

    function showQuestion() {
      if (current >= QUESTIONS.length) {
        $("progress-container").style.display = "none";
        show("screen-loading");
        setTimeout(showResult, 1800);
        return;
      }
      $("progress").style.width = ((current / QUESTIONS.length) * 100) + "%";
      const q = QUESTIONS[current];
      $("question-text").textContent = q.q;
      const box = $("options-container");
      box.innerHTML = "";
      q.ops.forEach(function (op) {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = op.t;
        btn.addEventListener("click", function () {
          addAnswer(scores, op.tag);
          current++;
          showQuestion();
        });
        box.appendChild(btn);
      });
    }

    function showResult() {
      ranking = rankBarrios(scores);
      const win = ranking[0];
      const nombre = win.b.nombre;
      $("result-name").textContent = nombre.toUpperCase();
      const prefijo = gender === "piba" ? "Sos una piba de " : "Sos un pibe de ";
      $("result-text").textContent = prefijo + nombre + ". " + win.b.tagline;
      const link = $("result-link");
      link.href = "barrios-" + win.slug + ".html";
      link.textContent = "Conocé más sobre " + nombre + " →";
      const sec = $("result-secondary");
      sec.innerHTML = "";
      const label = document.createElement("span");
      label.textContent = "También podrías ser: ";
      sec.appendChild(label);
      [ranking[1], ranking[2]].forEach(function (r, i) {
        const a = document.createElement("a");
        a.href = "barrios-" + r.slug + ".html";
        a.textContent = r.b.nombre;
        sec.appendChild(a);
        if (i === 0) { sec.appendChild(document.createTextNode(" · ")); }
      });
      const msg = "Me salió " + nombre + " en el Test de Barrios de CABA. ¿Y a vos? https://testdebarrios.com.ar/";
      $("share-wa").href = "https://wa.me/?text=" + encodeURIComponent(msg);
      show("screen-result");
    }

    $("btn-start").addEventListener("click", function () { show("screen-gender"); });
    document.querySelectorAll("[data-gender]").forEach(function (b) {
      b.addEventListener("click", function () {
        gender = b.getAttribute("data-gender");
        scores = newScores();
        current = 0;
        $("progress-container").style.display = "block";
        show("screen-quiz");
        showQuestion();
      });
    });
    $("btn-restart").addEventListener("click", function () { show("screen-gender"); });
    $("btn-feedback").addEventListener("click", function () {
      const text = $("user-opinion").value;
      if (!text.trim()) { alert("¡Escribí una opinión antes de enviar!"); return; }
      window.location.href = "mailto:santiagosolari48@gmail.com?subject=" + encodeURIComponent("Opinión sobre el test") + "&body=" + encodeURIComponent(text);
    });
  })();
}

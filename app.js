/* Lógica de la clase. JavaScript nativo, sin dependencias.
   Todo el contenido dinámico se crea con textContent (nunca con innerHTML), así que
   lo que escribe la persona no se ejecuta como código. */
(function () {
  "use strict";

  var D = window.CLASE_DATA;
  var SECTIONS = D.sections;

  /* ---------- Utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, props) {
    var node = document.createElement(tag);
    var p = props || {};
    Object.keys(p).forEach(function (k) {
      var v = p[k];
      if (v === false || v == null) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2), v);
      else if (v === true) node.setAttribute(k, "");
      else node.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kids = Array.isArray(arguments[i]) ? arguments[i] : [arguments[i]];
      kids.forEach(function (c) {
        if (c == null || c === false) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  var uid = 0;
  function nextId(prefix) { uid += 1; return prefix + "-" + uid; }

  function copyText(text, statusEl, fallbackField) {
    function ok() { statusEl.textContent = "Copiado al portapapeles."; }
    function fail() {
      if (fallbackField) {
        fallbackField.focus();
        fallbackField.select && fallbackField.select();
      }
      statusEl.textContent = "No se pudo copiar automáticamente. Selecciona el texto y cópialo con Ctrl+C (o Cmd+C).";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, fail);
    } else {
      fail();
    }
  }

  /* ---------- Navegación entre secciones ---------- */
  var panels = $all(".panel");
  var navLinks = $all("#nav a");
  var progress = $("#prog");
  var progressLabel = $("#prog-label");
  var pagerPrev = $("#pager-prev");
  var pagerNext = $("#pager-next");
  var menuBtn = $("#menu-btn");
  var visited = {};
  var currentId = "s1";

  function indexOfSection(id) {
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return i;
    return -1;
  }

  function idFromHash() {
    var h = (location.hash || "").replace("#", "");
    return indexOfSection(h) >= 0 ? h : null;
  }

  function updateProgress() {
    var n = Object.keys(visited).length;
    progress.max = SECTIONS.length;
    progress.value = n;
    progressLabel.textContent = "Progreso: " + n + " de " + SECTIONS.length + " secciones vistas";
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var v = $(".visit", a);
      v.textContent = visited[id] && id !== currentId ? "✓ Vista" : "";
    });
  }

  function updatePager() {
    var i = indexOfSection(currentId);
    if (i > 0) {
      pagerPrev.hidden = false;
      pagerPrev.setAttribute("href", "#" + SECTIONS[i - 1].id);
      pagerPrev.textContent = "Anterior: " + SECTIONS[i - 1].title;
    } else {
      pagerPrev.hidden = true;
    }
    if (i < SECTIONS.length - 1) {
      pagerNext.hidden = false;
      pagerNext.setAttribute("href", "#" + SECTIONS[i + 1].id);
      pagerNext.textContent = "Siguiente: " + SECTIONS[i + 1].title;
    } else {
      pagerNext.hidden = true;
    }
  }

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function show(id, focus) {
    currentId = id;
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
    visited[id] = true;
    updateProgress();
    updatePager();
    var title = SECTIONS[indexOfSection(id)].title;
    document.title = title + " | Inteligencia Artificial Generativa";
    setMenu(false);
    window.scrollTo(0, 0);
    if (focus) {
      var h = $("h2", $("#" + id));
      if (h) h.focus({ preventScroll: true });
    }
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.addEventListener("hashchange", function () {
    show(idFromHash() || "s1", true);
  });

  /* ---------- Pregunta de selección múltiple (reutilizable) ----------
     opts: { allowRetry, onAnswered(isCorrect, chosenIndex) } */
  function choiceQuestion(q, opts) {
    var settings = opts || {};
    var name = nextId("preg");
    var answered = false;
    var optionEls = [];

    var legend = el("legend", { text: q.prompt });
    var list = el("div", { class: "opts" });
    var feedback = el("div", { class: "feedback", "aria-live": "polite" });
    var checkBtn = el("button", { type: "button", class: "btn btn-primary", text: "Comprobar respuesta" });
    var actions = el("div", { class: "actions" }, checkBtn);

    q.options.forEach(function (o, i) {
      var input = el("input", { type: "radio", name: name, value: String(i) });
      var text = el("span", { text: o.text });
      var label = el("label", { class: "opt" }, input, el("span", null, text));
      input.addEventListener("change", function () {
        optionEls.forEach(function (x) { x.label.classList.toggle("selected", x.input.checked); });
      });
      optionEls.push({ input: input, label: label, mark: null });
      list.appendChild(label);
    });

    function chosen() {
      for (var i = 0; i < optionEls.length; i++) if (optionEls[i].input.checked) return i;
      return -1;
    }

    function resetState() {
      answered = false;
      clear(feedback);
      optionEls.forEach(function (x) {
        x.input.disabled = false;
        x.input.checked = false;
        x.label.className = "opt";
        if (x.mark && x.mark.parentNode) x.mark.parentNode.removeChild(x.mark);
        x.mark = null;
      });
      checkBtn.textContent = "Comprobar respuesta";
    }

    checkBtn.addEventListener("click", function () {
      if (answered) {
        if (settings.allowRetry) { resetState(); optionEls[0].input.focus(); }
        return;
      }
      var c = chosen();
      if (c < 0) {
        clear(feedback);
        feedback.appendChild(el("div", { class: "fb fb-info" }, el("strong", { text: "Falta tu respuesta." }), el("p", { text: "Elige una opción y vuelve a pulsar «Comprobar respuesta»." })));
        return;
      }
      answered = true;
      var ok = c === q.correct;
      optionEls.forEach(function (x, i) {
        x.input.disabled = true;
        x.label.classList.remove("selected");
        var tag = null;
        if (i === q.correct) { x.label.classList.add("correct"); tag = "Respuesta correcta" + (i === c ? " (tu respuesta)" : ""); }
        else if (i === c) { x.label.classList.add("wrong"); tag = "Tu respuesta (incorrecta)"; }
        if (tag) {
          x.mark = el("span", { class: "mark", text: tag });
          x.label.lastChild.appendChild(x.mark);
        }
      });
      clear(feedback);
      var fbParts = [
        el("strong", { text: ok ? "Correcto." : "Todavía no." }),
        el("p", { text: q.options[c].feedback })
      ];
      if (q.explanation) fbParts.push(el("p", { text: "Explicación: " + q.explanation }));
      if (!ok && !q.explanation) fbParts.push(el("p", { text: "La respuesta correcta es: " + q.options[q.correct].text }));
      feedback.appendChild(el("div", { class: "fb " + (ok ? "fb-ok" : "fb-bad") }, fbParts));
      if (settings.allowRetry) checkBtn.textContent = "Intentar de nuevo";
      else checkBtn.hidden = true;
      if (settings.onAnswered) settings.onAnswered(ok, c);
    });

    var fieldset = el("fieldset", { class: "q" }, legend, list, actions, feedback);
    return { node: fieldset, actions: actions };
  }

  /* Preguntas rápidas de las secciones 2 y 3 */
  $all(".quick").forEach(function (host) {
    var q = D.quick[host.getAttribute("data-quick")];
    if (!q) return;
    host.appendChild(choiceQuestion(q, { allowRetry: true }).node);
  });

  /* ---------- Cuestionario final ---------- */
  (function quizModule() {
    var host = $("#quiz");
    var state;

    function start() {
      state = { i: 0, score: 0, results: [] };
      renderQuestion(true);
    }

    function renderQuestion(focus) {
      clear(host);
      var q = D.quiz[state.i];
      var total = D.quiz.length;
      var meta = el("p", { class: "quiz-meta", tabindex: "-1", text: "Pregunta " + (state.i + 1) + " de " + total + ". Puntuación actual: " + state.score + "." });
      var cq = choiceQuestion(q, {
        allowRetry: false,
        onAnswered: function (ok, chosenIdx) {
          if (ok) state.score += 1;
          state.results.push({ ok: ok, chosen: chosenIdx });
          var last = state.i === total - 1;
          var next = el("button", { type: "button", class: "btn btn-primary", text: last ? "Ver resultado" : "Siguiente pregunta" });
          next.addEventListener("click", function () {
            if (last) renderResult(); else { state.i += 1; renderQuestion(true); }
          });
          cq.actions.appendChild(next);
          next.focus();
        }
      });
      host.appendChild(meta);
      host.appendChild(cq.node);
      if (focus) meta.focus({ preventScroll: false });
    }

    function renderResult() {
      clear(host);
      var total = D.quiz.length;
      var msg;
      var ratio = state.score / total;
      if (ratio === 1) msg = "Excelente: dominas los conceptos y sabes aplicarlos.";
      else if (ratio >= 0.75) msg = "Muy bien: entiendes lo principal. Repasa las preguntas que fallaste.";
      else if (ratio >= 0.5) msg = "Vas por buen camino. Te conviene repasar las secciones indicadas abajo y volver a intentarlo.";
      else msg = "Todavía hay conceptos por reforzar. Repasa las secciones y vuelve a intentarlo.";

      var heading = el("h3", { tabindex: "-1", text: "Tu resultado" });
      var score = el("p", { class: "score", text: state.score + " de " + total });
      var review = el("ol", { class: "review" });
      D.quiz.forEach(function (q, i) {
        var r = state.results[i];
        review.appendChild(el("li", null,
          el("strong", { text: r.ok ? "Correcta. " : "Incorrecta. " }),
          q.prompt,
          r.ok ? "" : " Respuesta correcta: " + q.options[q.correct].text
        ));
      });
      var retry = el("button", { type: "button", class: "btn btn-primary", text: "Volver a intentarlo" });
      retry.addEventListener("click", start);
      var toClose = el("a", { class: "btn btn-secondary", href: "#s9", text: "Ir al cierre" });

      host.appendChild(heading);
      host.appendChild(score);
      host.appendChild(el("p", { text: msg }));
      host.appendChild(el("h4", { text: "Repaso de tus respuestas" }));
      host.appendChild(review);
      host.appendChild(el("div", { class: "actions" }, retry, toClose));
      heading.focus();
    }

    start();
  })();

  /* ---------- Selector de herramienta según la tarea ---------- */
  (function toolSelector() {
    var select = $("#tarea");
    var out = $("#tarea-out");
    D.tasks.forEach(function (t, i) {
      select.appendChild(el("option", { value: String(i), text: t.label }));
    });
    select.addEventListener("change", function () {
      clear(out);
      if (select.value === "") return;
      var t = D.tasks[Number(select.value)];
      out.appendChild(el("div", { class: "card-out" },
        el("p", null, el("strong", { text: "Categoría: " }), t.category),
        el("p", null, el("strong", { text: "Herramientas que podrías considerar: " }), t.tools),
        el("p", null, el("strong", { text: "Precaución: " }), t.tip)
      ));
    });
  })();

  /* ---------- Detective de riesgos ---------- */
  (function detective() {
    var host = $("#detective");
    var S = D.detective.sentences;
    var checks = [];

    function build() {
      clear(host);
      checks = [];
      var list = el("ul", { class: "detective-list" });
      S.forEach(function (s, i) {
        var input = el("input", { type: "checkbox" });
        checks.push(input);
        list.appendChild(el("li", null, el("label", { class: "sentence" }, input, el("span", null, el("b", { text: "Frase " + (i + 1) + ". " }), s.text))));
      });
      var btn = el("button", { type: "button", class: "btn btn-primary", text: "Revisar mi análisis" });
      var results = el("div", { "aria-live": "polite" });
      btn.addEventListener("click", function () { grade(results, btn); });
      host.appendChild(el("p", null, el("strong", { text: "Petición: " }), "«" + D.detective.request + "»"));
      host.appendChild(el("fieldset", { class: "q" },
        el("legend", { text: "Marca las frases que presenten un riesgo" }), list));
      host.appendChild(el("div", { class: "actions" }, btn));
      host.appendChild(results);
    }

    function grade(results, btn) {
      var correct = 0;
      var items = [];
      S.forEach(function (s, i) {
        var marked = checks[i].checked;
        var good = marked === s.risk;
        if (good) correct += 1;
        var status;
        if (s.risk && marked) status = "Acertaste: detectaste un riesgo.";
        else if (s.risk && !marked) status = "Se te pasó: aquí había un riesgo.";
        else if (!s.risk && marked) status = "Marcaste una frase sin riesgo evidente.";
        else status = "Acertaste: esta frase no presenta un riesgo evidente.";
        items.push(el("li", { class: good ? "good" : "miss" },
          el("strong", { text: "Frase " + (i + 1) + ": " + status }),
          el("p", null, el("em", { text: s.kind + ". " }), s.why)));
      });
      clear(results);
      var retry = el("button", { type: "button", class: "btn btn-secondary", text: "Intentar de nuevo" });
      retry.addEventListener("click", function () { build(); $("#detective .btn").focus(); });
      results.appendChild(el("h4", { text: "Acertaste " + correct + " de " + S.length }));
      results.appendChild(el("ul", { class: "d-results" }, items));
      results.appendChild(el("div", { class: "actions" }, retry));
      btn.hidden = true;
      S.forEach(function (_, i) { checks[i].disabled = true; });
    }

    build();
  })();

  /* ---------- Prompt de ejemplo y constructor ---------- */
  (function promptTools() {
    var P = D.examplePrompt;
    function compose(parts) {
      var lines = [];
      if (parts.contexto) lines.push("Contexto: " + parts.contexto);
      if (parts.objetivo) lines.push("Objetivo: " + parts.objetivo);
      if (parts.restricciones) lines.push("Restricciones: " + parts.restricciones);
      if (parts.formato) lines.push("Formato de respuesta: " + parts.formato);
      return lines.join("\n\n");
    }

    var pre = $("#ejemplo-prompt");
    pre.textContent = compose(P);
    $("#ejemplo-copiar").addEventListener("click", function () {
      copyText(pre.textContent, $("#ejemplo-estado"), null);
    });

    var fields = {
      contexto: $("#pb-contexto"), objetivo: $("#pb-objetivo"),
      restricciones: $("#pb-restricciones"), formato: $("#pb-formato")
    };
    var out = $("#pb-salida");
    var status = $("#pb-estado");

    function read() {
      var o = {};
      Object.keys(fields).forEach(function (k) { o[k] = fields[k].value.trim(); });
      return o;
    }
    function refresh() {
      var parts = read();
      out.value = compose(parts);
      var missing = Object.keys(parts).filter(function (k) { return !parts[k]; }).length;
      status.textContent = missing === 0 ? "Tu prompt tiene las cuatro partes." : "Faltan " + missing + (missing === 1 ? " parte" : " partes") + " por completar.";
    }
    Object.keys(fields).forEach(function (k) { fields[k].addEventListener("input", refresh); });

    $("#pb-ejemplo").addEventListener("click", function () {
      Object.keys(fields).forEach(function (k) { fields[k].value = P[k]; });
      refresh();
    });
    $("#pb-limpiar").addEventListener("click", function () {
      Object.keys(fields).forEach(function (k) { fields[k].value = ""; });
      refresh();
      status.textContent = "Campos limpiados.";
      fields.contexto.focus();
    });
    $("#pb-copiar").addEventListener("click", function () {
      if (!out.value) { status.textContent = "Todavía no hay nada para copiar. Completa al menos una parte."; return; }
      copyText(out.value, status, out);
    });
    refresh();
  })();

  /* ---------- Etapas del ejercicio ---------- */
  (function stages() {
    var items = $all(".timeline li");
    var stageEls = $all(".stage");
    var total = stageEls.reduce(function (a, s) { return a + Number(s.getAttribute("data-minutes")); }, 0);
    $("#total-min").textContent = String(total);
    items.forEach(function (li) { li.style.flexGrow = li.getAttribute("data-minutes"); });
    var summary = $("#etapas-resumen");
    function update() {
      var done = 0, mins = 0;
      stageEls.forEach(function (s) {
        if ($(".stage-done", s).checked) { done += 1; mins += Number(s.getAttribute("data-minutes")); }
      });
      summary.textContent = "Etapas completadas: " + done + " de " + stageEls.length + " (" + mins + " de " + total + " minutos planificados)." + (done === stageEls.length ? " Completaste el ejercicio." : "");
    }
    $all(".stage-done").forEach(function (c) { c.addEventListener("change", update); });
    update();
  })();

  /* ---------- Lista de verificación del cierre ---------- */
  (function checklist() {
    var boxes = $all(".obj");
    var out = $("#check-resumen");
    function update() {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      out.textContent = "Has marcado " + n + " de " + boxes.length + " objetivos." + (n === boxes.length ? " Alcanzaste todos los objetivos." : "");
    }
    boxes.forEach(function (b) { b.addEventListener("change", update); });
  })();

  $("#reiniciar").addEventListener("click", function () {
    location.hash = "";
    location.reload();
  });

  /* ---------- Inicio ---------- */
  var initial = idFromHash();
  show(initial || "s1", !!initial);
})();

/*
  Datos de la clase: secciones, preguntas, herramientas y ejercicios interactivos.
  Para cambiar el contenido de los cuestionarios no necesitas tocar app.js.
  Regla de las preguntas: "correct" es el índice (empezando en 0) de la opción correcta.
*/
window.CLASE_DATA = {
  sections: [
    { id: "s1", title: "Introducción" },
    { id: "s2", title: "¿Qué es la IA generativa?" },
    { id: "s3", title: "Características principales" },
    { id: "s4", title: "Aplicaciones" },
    { id: "s5", title: "Herramientas" },
    { id: "s6", title: "Riesgos y uso responsable" },
    { id: "s7", title: "Ejercicio práctico" },
    { id: "s8", title: "Evaluación" },
    { id: "s9", title: "Cierre" }
  ],

  /* Preguntas de comprobación rápida (secciones 2 y 3). */
  quick: {
    "q-clasifica": {
      prompt: "Una aplicación recibe una foto y responde «es un gato». Otra recibe la instrucción «dibuja un gato con sombrero» y entrega una imagen nueva. ¿Cuál es generativa?",
      correct: 1,
      options: [
        { text: "La primera, porque trabaja con imágenes.", feedback: "No. La primera asigna una etiqueta a algo que ya existe: clasifica. Que use imágenes no la hace generativa." },
        { text: "La segunda, porque produce una imagen nueva a partir de una instrucción.", feedback: "Correcto. Un modelo generativo crea contenido nuevo; el que clasifica solo asigna una categoría a lo que recibe." },
        { text: "Las dos, porque ambas usan inteligencia artificial.", feedback: "No. Las dos son IA, pero solo la segunda genera contenido nuevo. La primera clasifica." },
        { text: "Ninguna, porque las imágenes no se pueden generar.", feedback: "No. Los modelos generativos pueden producir imágenes, además de texto, sonidos, videos y código." }
      ]
    },
    "q-creatividad": {
      prompt: "Cuando una IA escribe un poema, ¿qué describe mejor lo que ocurre?",
      correct: 1,
      options: [
        { text: "Siente una emoción y la expresa con palabras.", feedback: "No. La presentación habla de contenido que simula la creatividad humana; no afirma que la IA sienta ni tenga intención." },
        { text: "Combina patrones aprendidos de muchos datos para producir un texto que parece creativo.", feedback: "Correcto. Es creatividad algorítmica: el resultado puede parecer creativo, pero surge de patrones aprendidos." },
        { text: "Copia siempre un poema que ya existe en una base de datos.", feedback: "No. Normalmente produce texto nuevo a partir de patrones. Eso no garantiza que sea original en todos los casos, pero no es una copia automática." }
      ]
    },
    "q-profundo": {
      prompt: "En «Me senté en el banco del parque» y «El banco cerró a las cinco», la palabra «banco» significa cosas distintas. ¿Qué ayuda a un modelo a distinguirlas?",
      correct: 2,
      options: [
        { text: "Una lista fija de significados escrita a mano para cada palabra.", feedback: "No. Los modelos de aprendizaje profundo aprenden relaciones entre palabras a partir de datos; no dependen de una lista fija." },
        { text: "Lanzar una moneda entre los dos significados.", feedback: "No. El modelo no elige al azar entre significados: usa el contexto para que uno resulte más probable." },
        { text: "El contexto: las palabras de alrededor, que arquitecturas como los transformers aprenden a relacionar.", feedback: "Correcto. Las redes profundas, en especial los transformers, ayudan a manejar el contexto de una frase." }
      ]
    },
    "q-lenguaje": {
      prompt: "Necesitas que una IA te explique qué es la energía solar. ¿Qué instrucción tiene más probabilidades de darte un resultado útil?",
      correct: 1,
      options: [
        { text: "«Hazme algo sobre la energía.»", feedback: "Es demasiado vaga: no dice tema, público ni formato, así que el resultado será genérico." },
        { text: "«Explica qué es la energía solar a estudiantes de 12 años, en 5 oraciones y con un ejemplo cotidiano.»", feedback: "Correcto. Aunque puedes escribir como hablas, mientras más claro el público, la extensión y el formato, mejor el resultado." },
        { text: "«Energía.»", feedback: "Una sola palabra no indica qué quieres que haga la IA con ella." }
      ]
    },
    "q-generalizacion": {
      prompt: "Pides una imagen de «un perro astronauta pintando un mural» y el resultado combina elementos que, juntos así, probablemente no estaban en los datos. ¿Qué característica ilustra mejor esto?",
      correct: 0,
      options: [
        { text: "Generalización: combina elementos aprendidos para formar algo nuevo.", feedback: "Correcto. La generalización es producir resultados que no están literalmente en los datos de entrenamiento." },
        { text: "Interacción con lenguaje natural: escribiste la petición con tus palabras.", feedback: "Es verdad que usaste lenguaje natural, pero lo que describe la pregunta es que el resultado sea nuevo y combine elementos." },
        { text: "Aprendizaje profundo: usa capas de una red neuronal.", feedback: "Eso describe cómo está construido el modelo, no que el resultado combine elementos para formar algo nuevo." }
      ]
    }
  },

  /* Selector «elige la herramienta según la tarea» (sección 5). */
  tasks: [
    { label: "Resumir un artículo largo", category: "Generación de texto", tools: "ChatGPT, Claude, Gemini o Copilot", tip: "Compara el resumen con el original: puede omitir o cambiar datos importantes." },
    { label: "Redactar un correo formal y amable", category: "Generación de texto", tools: "ChatGPT, Claude, Gemini o Copilot", tip: "Revisa nombres, fechas y compromisos antes de enviarlo, y no incluyas datos personales de terceros." },
    { label: "Crear una ilustración para un afiche", category: "Generación de imágenes", tools: "Midjourney, Stable Diffusion o los generadores de imagen que hoy reemplazan a DALL-E", tip: "Revisa los textos dentro de la imagen, posibles estereotipos y los derechos de uso." },
    { label: "Componer música de fondo para un video escolar", category: "Generación de música y audio", tools: "Suno AI o AIVA", tip: "Lee los términos de uso y de derechos antes de publicar la música." },
    { label: "Transformar el timbre de mi voz con efectos", category: "Generación de música y audio", tools: "Voicemod", tip: "No uses voces transformadas para hacerte pasar por otra persona." },
    { label: "Producir un clip corto de video desde una descripción", category: "Generación de video", tools: "Runway o Pika (Sora ya no está disponible)", tip: "Verifica la disponibilidad actual y señala que el video fue generado con IA." },
    { label: "Escribir una función y que me explique cómo funciona", category: "Asistentes de código", tools: "GitHub Copilot, o asistentes de texto como ChatGPT, Claude o Gemini", tip: "Prueba el código antes de usarlo y no pegues claves ni datos privados." }
  ],

  /* Ejercicio de identificación de riesgos (sección 6). */
  detective: {
    request: "Escribe un párrafo para el boletín escolar sobre cómo estudiar mejor.",
    sentences: [
      { text: "Según un estudio de la Universidad de Harvard de 2019, el 87 % de los estudiantes que estudian con música mejora sus notas.", risk: true, kind: "Información falsa o inventada", why: "Da una cifra exacta y una fuente prestigiosa sin enlace ni título. Una IA puede producir datos y citas que suenan reales sin serlo. Habría que buscar el estudio antes de usarlo." },
      { text: "Estudiar de noche siempre es mejor que estudiar en la mañana.", risk: true, kind: "Afirmación absoluta sin sustento", why: "«Siempre» generaliza algo que depende de cada persona. Es un ejemplo de seguridad excesiva: suena firme, pero no está respaldado." },
      { text: "Las estudiantes mujeres suelen preferir humanidades, mientras que los hombres destacan en matemáticas.", risk: true, kind: "Sesgo y estereotipo", why: "Reproduce un prejuicio sobre grupos de personas. La presentación advierte que los modelos pueden reproducir estereotipos presentes en sus datos de entrenamiento." },
      { text: "Para estudiar mejor conviene hacer pausas cortas y organizar el tiempo en bloques.", risk: false, kind: "Sin riesgo evidente", why: "Es un consejo general y razonable que no afirma datos concretos. Aun así, conviene leerlo con ojo crítico antes de publicarlo." },
      { text: "Para darte un plan personalizado, envíame tu nombre completo, tu dirección y tu número de documento.", risk: true, kind: "Privacidad y datos personales", why: "No necesitas compartir datos de identidad para recibir consejos de estudio. Pedirlos es una señal de alerta." },
      { text: "Este texto se inspira en varios artículos publicados en línea, aunque no puedo indicar cuáles.", risk: true, kind: "Atribución y posible plagio", why: "Si no se pueden indicar las fuentes, no puedes comprobar la información ni dar crédito a sus autores. Esto afecta la transparencia." }
    ]
  },

  /* Parte del prompt de ejemplo (etapa 2 del ejercicio). */
  examplePrompt: {
    contexto: "Voy a preparar una guía de una página para [compañeros de primer semestre], que usan IA generativa para sus trabajos pero no saben cómo comprobar si lo que responde es confiable.",
    objetivo: "Redacta una guía con 5 recomendaciones prácticas para verificar la información que entrega una IA generativa. Cada recomendación debe incluir un ejemplo breve.",
    restricciones: "Usa lenguaje sencillo y sin tecnicismos; máximo 250 palabras; no inventes estadísticas ni estudios; si no estás seguro de un dato, dilo; no pidas datos personales; evita estereotipos sobre cualquier grupo de personas.",
    formato: "Un título corto y una lista numerada. Cada punto con una frase en negrita y un ejemplo en una línea. Al final, una nota de dos líneas con las limitaciones de la guía."
  },

  /* Cuestionario final (sección 8): 8 preguntas de comprensión y aplicación. */
  quiz: [
    {
      prompt: "Tu escuela quiere un sistema que haga dos cosas: (A) marcar cada mensaje recibido como «urgente» o «no urgente»; (B) redactar un borrador de respuesta para cada mensaje. ¿Cuál función corresponde a un modelo generativo?",
      correct: 2,
      options: [
        { text: "Solo A, porque analiza mensajes reales.", feedback: "No. Marcar un mensaje con una etiqueta es clasificar." },
        { text: "A y B por igual, porque ambas usan texto.", feedback: "No. Que ambas usen texto no las hace iguales: A asigna una categoría y B crea contenido nuevo." },
        { text: "Solo B, porque produce un texto nuevo en lugar de asignar una etiqueta.", feedback: "Correcto." },
        { text: "Ninguna, porque los modelos generativos no trabajan con texto.", feedback: "No. Generar texto es uno de sus usos principales." }
      ],
      explanation: "Los modelos tradicionales se centran en clasificar o predecir; los generativos imitan patrones complejos para producir contenido nuevo, como un borrador de respuesta."
    },
    {
      prompt: "Le pides a una IA un resumen con fuentes y te entrega tres citas con autor, título y año. Parecen reales. ¿Qué haces antes de usarlas?",
      correct: 0,
      options: [
        { text: "Busco cada fuente por mi cuenta en un sitio o catálogo confiable para confirmar que existe y dice lo que se afirma.", feedback: "Correcto." },
        { text: "Las uso: si tienen formato correcto, son confiables.", feedback: "No. El formato correcto no demuestra que la fuente exista." },
        { text: "Le pregunto a la misma IA si está segura y, si dice que sí, las uso.", feedback: "No. La misma IA no es una verificación independiente y puede repetir el error con seguridad." },
        { text: "Las uso solo si el texto suena profesional.", feedback: "No. Una respuesta convincente no es una respuesta correcta." }
      ],
      explanation: "Una IA puede producir respuestas incorrectas que suenan convincentes. Verificar en fuentes independientes es la forma de comprobarlo."
    },
    {
      prompt: "Pides un menú para una cena con tres restricciones (sin gluten, vegetariano y económico) y la IA propone una combinación que no aparece tal cual en ningún libro de recetas. ¿Qué característica ilustra mejor esta situación?",
      correct: 3,
      options: [
        { text: "Interacción con lenguaje natural, porque escribiste la petición con tus palabras.", feedback: "Es cierto que usaste lenguaje natural, pero lo que destaca de la situación es que el resultado es nuevo." },
        { text: "Aprendizaje profundo, porque usa capas de una red neuronal.", feedback: "Describe cómo está construido el modelo, no que el resultado combine elementos nuevos." },
        { text: "Creatividad algorítmica, porque la IA siente inspiración.", feedback: "No. La creatividad algorítmica simula la creatividad humana; no implica inspiración ni emociones." },
        { text: "Generalización, porque combina elementos aprendidos para formar algo que no estaba literalmente en los datos.", feedback: "Correcto." }
      ],
      explanation: "La generalización permite producir resultados que no están literalmente en los datos de entrenamiento, combinando elementos para formar algo nuevo."
    },
    {
      prompt: "Necesitas el texto de un cartel del barrio sobre reciclaje. ¿Qué instrucción tiene más probabilidades de dar un resultado útil?",
      correct: 1,
      options: [
        { text: "«Escribe sobre reciclaje.»", feedback: "Es demasiado general: no indica público, extensión ni formato." },
        { text: "«Redacta el texto de un cartel de máximo 60 palabras para vecinos de un barrio, en tono cercano, que explique cómo separar vidrio, papel y plástico. Incluye un título corto.»", feedback: "Correcto." },
        { text: "«Haz el mejor cartel posible.»", feedback: "«El mejor» no se puede medir y no da datos concretos sobre qué necesitas." },
        { text: "«Reciclaje cartel.»", feedback: "Muy escueta: la IA tendría que adivinar casi todo." }
      ],
      explanation: "Una buena instrucción incluye contexto (quién lo leerá), objetivo, restricciones (longitud, tono) y formato de respuesta."
    },
    {
      prompt: "Pides a un generador de imágenes «una persona científica» diez veces y casi todos los resultados muestran el mismo tipo de persona. ¿Cuál es la mejor interpretación y reacción?",
      correct: 2,
      options: [
        { text: "La IA es neutral; ese es el resultado correcto.", feedback: "No. Los modelos aprenden de datos que pueden contener prejuicios." },
        { text: "Es una casualidad sin importancia.", feedback: "Diez repeticiones sugieren un patrón, no una casualidad." },
        { text: "Puede reflejar estereotipos de los datos de entrenamiento; conviene revisar, pedir variedad de forma explícita y no dar por neutral el resultado.", feedback: "Correcto." },
        { text: "El modelo está roto y no sirve para ninguna tarea.", feedback: "Es exagerado. El sesgo es un riesgo que se puede detectar y mitigar." }
      ],
      explanation: "Los modelos pueden reproducir estereotipos o prejuicios presentes en los datos con los que fueron entrenados. La revisión humana ayuda a detectarlos."
    },
    {
      prompt: "¿Cuál es la forma más prudente de pedir ayuda a una IA para ordenar las notas de un curso?",
      correct: 1,
      options: [
        { text: "Pegar la lista real con nombres, documentos y correos de cada estudiante.", feedback: "No. Son datos personales de terceros que no necesitas compartir." },
        { text: "Usar una lista ficticia o anonimizada («Estudiante 1», «Estudiante 2») con las mismas columnas.", feedback: "Correcto." },
        { text: "Pegar la lista real, pero pedirle a la IA que prometa no guardarla.", feedback: "No. Una promesa dentro del chat no reemplaza la política de privacidad de la herramienta." },
        { text: "Subir la lista a cualquier herramienta gratuita que encuentres.", feedback: "No. No sabes cómo trata esa herramienta los datos." }
      ],
      explanation: "Evita compartir datos personales innecesarios. Con datos ficticios o anonimizados puedes obtener la misma ayuda."
    },
    {
      prompt: "Quieres música de fondo original para un video escolar. ¿Qué categoría de herramienta de la presentación encaja, y qué debes revisar antes de publicarlo?",
      correct: 0,
      options: [
        { text: "Música y audio (como Suno AI o AIVA); revisar los términos de uso y los derechos de lo generado.", feedback: "Correcto." },
        { text: "Asistentes de código; revisar que el código compile.", feedback: "No. Los asistentes de código ayudan a programar, no a crear música." },
        { text: "Generación de imágenes; revisar la resolución.", feedback: "No. Ese tipo de herramienta crea imágenes, no música." },
        { text: "Generación de texto; revisar la ortografía.", feedback: "No. Las herramientas de texto no son la categoría adecuada para componer música." }
      ],
      explanation: "Elegir la herramienta según la tarea es parte del uso crítico. La autoría y los derechos sobre lo generado por IA siguen siendo objeto de debate legal."
    },
    {
      prompt: "Usaste una IA para obtener un primer borrador de un informe de trabajo. ¿Cuál es la práctica más responsable?",
      correct: 3,
      options: [
        { text: "Entregarlo tal cual: si lo escribió la IA, la responsabilidad es de la IA.", feedback: "No. Quien presenta el texto responde por él." },
        { text: "Entregarlo sin decir nada, porque nadie lo notará.", feedback: "No. Es opaco y puede incumplir las reglas de tu organización." },
        { text: "Cambiar algunas palabras para que no se note.", feedback: "No. Disimular el uso de IA no corrige errores ni mejora la transparencia." },
        { text: "Revisar y corregir el contenido, cumplir las reglas de tu organización sobre IA y declarar su uso cuando corresponda.", feedback: "Correcto." }
      ],
      explanation: "La presentación pide un uso justo, inclusivo y transparente. En la práctica: revisión humana, respeto de las reglas y claridad sobre cuándo se usó IA."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = window.CLASE_DATA;
}

/** Texto de /aviso. Se mantiene aquí para que la página y las pruebas usen la misma fuente. */
export const NOTICE = {
  title: "Aviso de demostración",
  intro:
    "Esta web es una demostración con fines de portfolio. Cerrajería REX es un nombre de ejemplo y los datos de contacto no corresponden a un servicio real.",
  sections: [
    {
      heading: "Qué ocurre con el formulario",
      body: "El formulario valida los datos en tu navegador y de nuevo en el servidor. No envía ningún correo, no avisa a ningún cerrajero y no guarda los datos: al enviarlo recibes una respuesta de demostración y nada más.",
    },
    {
      heading: "Cookies y almacenamiento",
      body: "La web no usa cookies de seguimiento ni analítica. Solo guarda en tu navegador la preferencia de tema claro u oscuro, si eliges una.",
    },
    {
      heading: "Textos y fotografías",
      body: "El código se distribuye con licencia MIT. Las fotografías y los textos no están cubiertos por esa licencia.",
    },
  ],
} as const;

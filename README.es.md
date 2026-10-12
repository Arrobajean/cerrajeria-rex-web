# Cerrajería REX: web

> Versión en inglés: [README.md](README.md)

Página de presentación de una cerrajería de urgencia abierta las 24 horas en Madrid: servicios, zonas con servicio, canales de contacto y un formulario de solicitud. Es un **proyecto de demostración, no un negocio real**. No se envía nada a nadie, y los datos de contacto son marcadores de posición heredados de un prototipo anterior (ver [Limitaciones conocidas](#limitaciones-conocidas)).

No está desplegado. Para verlo en local, sigue los pasos de [Cómo ejecutarlo](#cómo-ejecutarlo).

| Inicio (claro) | Inicio (oscuro) | Servicios (oscuro) |
|---|---|---|
| ![Inicio con tema claro](docs/img/home-light.webp) | ![Inicio con tema oscuro](docs/img/home-dark.webp) | ![Servicios con tema oscuro](docs/img/servicios-dark.webp) |

| Contacto (claro) | Inicio en móvil (claro) | Contacto en móvil (oscuro) |
|---|---|---|
| ![Contacto con tema claro](docs/img/contacto-light.webp) | ![Inicio en móvil](docs/img/home-mobile-light.webp) | ![Contacto en móvil con tema oscuro](docs/img/contacto-mobile-dark.webp) |

## Qué demuestra

- **Un único esquema de validación en dos sitios.** El formulario y la API usan el mismo esquema de zod (`src/lib/schemas.ts`). El esquema es estricto: un campo desconocido responde 400 y no se descarta en silencio, y el campo trampa debe llegar vacío.
- **Enlaces de contacto que no pueden salir mal formados.** Los enlaces `tel:`, de WhatsApp y `mailto:` los construyen funciones puras que lanzan un error ante una entrada incorrecta (`src/lib/links.ts`). Un número mal escrito hace fallar las pruebas en lugar de publicar un enlace roto.
- **Datos estructurados honestos.** El JSON-LD de `Locksmith` solo contiene lo que la web afirma: nombre, zona, contacto y horario de 24 horas. No hay valoraciones, precios ni años de actividad, porque el material de origen no los tenía, y una prueba falla si aparece alguno.
- **Contenido como datos tipados.** Servicios, distritos, textos y el aviso de demostración viven en `src/content`. Una prueba revisa todos los archivos publicados buscando guiones largos o medios y afirmaciones que no se pueden comprobar (años de experiencia, certificaciones, tiempos de respuesta).
- **Lógica separada de la interfaz.** Funciones puras en `src/lib`, estado en `src/hooks` y presentación en `src/components`. Solo `src/lib/api.ts` llama a `fetch`.
- **Accesibilidad como prueba, no como promesa.** axe revisa todas las páginas públicas en los dos temas, en escritorio y en móvil, con las reglas WCAG 2.1 AA y las buenas prácticas. Si hay una sola infracción, la suite falla. También se revisan los estados de error del formulario.
- **El comportamiento de demostración es explícito.** La API responde a cada solicitud válida con un mensaje claro de demostración y no guarda nada. La página de aviso y el pie lo dicen.

## Calidad

| Qué | Cómo | Cantidad |
|---|---|---|
| Pruebas unitarias, de contenido y de rutas | Vitest | 55 pruebas en 8 archivos |
| Extremo a extremo, contrato de la API y accesibilidad | Playwright + `@axe-core/playwright` | 52 pruebas: 38 en escritorio y 14 en móvil (el proyecto móvil solo ejecuta la prueba de accesibilidad) |
| Reglas de accesibilidad | axe, `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice` | 5 páginas públicas y 2 estados del formulario, en oscuro y en claro |
| Tipos | `tsc --noEmit`, `strict` + `noUncheckedIndexedAccess` | sin errores |
| Lint | ESLint 9, `next/core-web-vitals` y `typescript-eslint` | sin avisos |

La CI (`.github/workflows/ci.yml`) ejecuta lint, tipos, pruebas unitarias, compilación y la suite de Playwright en cada push y pull request a `main`.

### Rendimiento medido

Lighthouse 12.8.2, emulación móvil con limitación simulada, compilación de producción servida en local (`next start -p 3201`), mediana de 3 ejecuciones por página.

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Inicio | 97 | 100 | 100 | 100 | 2,6 s | 0 | 86 ms |
| Servicios | 95 | 100 | 100 | 100 | 2,6 s | 0 | 142 ms |
| Contacto | 96 | 100 | 100 | 100 | 2,3 s | 0 | 187 ms |

Son números de laboratorio en localhost. Un sitio desplegado detrás de una CDN dará otros, y los datos de usuarios reales dirían más que cualquier prueba. El elemento LCP es la fotografía de portada, servida en WebP. La mediana de LCP en inicio y servicios (2,6 s) sigue por encima del umbral de 2,5 s, así que la imagen de portada es lo primero que habría que optimizar más.

## Arquitectura

```
src/
  app/          Solo rutas: páginas, la ruta de la API de solicitudes, metadatos, icono y imagen para compartir generados
  components/   Presentación: props dentro, callbacks fuera (ui, layout, home, services, contact, seo)
  hooks/        Estado: use-theme, use-quote-form
  lib/          Lógica pura: esquemas, solicitudes, enlaces, teléfono, límite de peticiones, datos SEO, tema, cliente de la API
  content/      Datos tipados: sitio, servicios, distritos, textos de inicio, aviso, tipos de urgencia
e2e/            Playwright: inicio y navegación, formulario de contacto, contrato de la API, accesibilidad
scripts/        Optimización de imágenes y capturas para el README
```

## Decisiones y compromisos

| Decisión | Elección | Compromiso |
|---|---|---|
| Solicitudes de presupuesto | Se validan y se responde con un mensaje de demostración. No se envía correo ni se guarda nada | El formulario no llega a nadie. El punto de extensión está marcado en `src/lib/quotes.ts` |
| Límite de peticiones | Ventana deslizante en memoria, 5 solicitudes cada 10 minutos por IP | Por instancia, y confía en `x-forwarded-for`, que un cliente puede falsear. Vale para una demo, no para producción |
| Tema | Sigue al sistema por defecto; la elección del usuario se guarda en `localStorage`. Un solo tema por página | No hay preferencia en el servidor |
| Animación | Solo transiciones CSS, desactivadas con `prefers-reduced-motion` | No hay coreografía al hacer scroll. La web trata de llegar al teléfono, no del movimiento |
| Mapas | Sin mapa incrustado. La cobertura es una lista de distritos | Sin precisión geográfica. El mapa anterior era una imagen generada con etiquetas ilegibles, así que se eliminó |
| Testimonios | Eliminados | La página anterior usaba retratos de archivo y valoraciones inventadas. Las reseñas reales necesitan una fuente real |
| Imágenes | WebP generadas a partir de originales que no van a git (`images-src/`) | Quien ejecute `pnpm images` debe tener los originales |

## Limitaciones conocidas

- **Los datos de contacto son marcadores de posición.** Los teléfonos (900 123 456 y 600 123 456), el correo y la dirección vienen del prototipo anterior. Parecen de relleno y hay que confirmarlos o sustituirlos antes de usarlos.
- **La fotografía de portada no tiene origen documentado.** Parece generada por una máquina. Considérala sin licencia hasta que el titular confirme de dónde viene.
- **No hay política de privacidad.** El formulario recoge nombre, teléfono y dirección. La demo no los guarda, pero un servicio real necesitaría un aviso de privacidad y una base legal para el tratamiento.
- **Las formas de pago y las descripciones de servicio necesitan confirmación del titular.** Vienen del prototipo anterior.
- **El límite de peticiones es por instancia** y no se comparte entre invocaciones serverless.
- **Solo en español**, y no se muestran precios porque la web no los tiene.

## Cómo ejecutarlo

```bash
pnpm install
cp .env.example .env.local   # opcional: fija la URL pública usada en las etiquetas SEO
pnpm dev                     # http://localhost:3201
```

| Script | Qué hace |
|---|---|
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript |
| `pnpm test` | Pruebas de Vitest: unitarias, de contenido y de rutas |
| `pnpm build && pnpm test:e2e` | Compilación de producción y después Playwright (arranca `next start` en el puerto 3201) |
| `pnpm images` | Convierte los originales de `images-src/` (no versionados) a WebP en `public/images/` |
| `pnpm screenshots` | Hace las capturas del README desde un `pnpm start` en marcha |

Define `PW_CHROMIUM_PATH` para usar un Chromium ya instalado en la suite E2E; si no, ejecuta una vez `pnpm exec playwright install chromium`.

## Sobre este repositorio

Es una reconstrucción desde cero de un prototipo anterior. No se copió código, estilos ni configuración de él. Sus textos y su fotografía de portada se revisaron y se reutilizaron cuando se podían comprobar; el resto se eliminó o se reescribió. El historial de commits es el historial real de la construcción.

## Licencia

El código tiene licencia MIT (ver [LICENSE](LICENSE)). La fotografía de `public/images` y los textos de `src/content` **no** están cubiertos por esa licencia.

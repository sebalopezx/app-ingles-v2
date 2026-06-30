# English App v2 - Past Simple Verbs

App para aprender y memorizar los verbos en pasado del ingles
(infinitivo, pasado simple, participio y traduccion). Es la version 2 de mi
primer proyecto, reconstruida con codigo moderno y mejor estructura.

## Como se usa

- Pasa el mouse en PC o toca en movil una palabra para ver su traduccion al instante.
- Marca como aprendida con el check de cada tarjeta. Tu progreso se guarda solo.
- Busca en ingles o espanol, filtra por regulares/irregulares, mezcla y revela todo.
- Reloj en vivo en ingles para aprender dias, meses y hora.

## Tecnologias

- Vue 3 (`<script setup>`) + Vite 6 + Vue Router
- CSS con variables en `:root` para centralizar colores
- PWA instalable/offline con `vite-plugin-pwa`
- Datos en `src/data/verbs.json` y progreso en `localStorage`

## Paginas

- Inicio: que es la app y como usarla
- Verbos: listado completo con busqueda, filtros, marcado y mezcla
- Calendario: proximamente

## Estructura

```text
src/
|-- data/          JSON con los verbos
|-- models/        logica de datos y progreso
|-- composables/   estado y reloj
|-- components/    componentes .vue reutilizables
|-- views/         paginas: Home / Verbs / Calendar
|-- router/        rutas de Vue Router
`-- styles/        theme.css y estilos generales
```

## Desarrollo local

```bash
npm install
npm run dev
```

La app queda en `http://localhost:5173`.

Si aparece `"vite" no se reconoce como un comando interno o externo`, faltan las
dependencias locales. Ejecuta `npm install` o usa Docker.

## Desarrollo con Docker

```bash
docker compose up --build
```

La app queda en `http://localhost:5173`.

Docker evita depender de las dependencias instaladas en cada computador. El
codigo se monta como volumen y `node_modules` queda dentro del contenedor.

Para probar una build estatica en Docker:

```bash
docker build --target static -t app-ingles-v2 .
docker run --rm -p 8080:80 app-ingles-v2
```

Luego abre `http://localhost:8080`.

## GitHub Pages

Docker no reemplaza GitHub Pages ni lo rompe. Este proyecto sigue siendo una app
estatica: GitHub Actions instala dependencias, ejecuta `npm run build` y publica
`dist/` en Pages.

El archivo `vite.config.js` usa `base: "./"` para que los assets funcionen en
hosts estaticos como GitHub Pages.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Personalizar

- Colores: edita `src/styles/theme.css`.
- Verbos: edita `src/data/verbs.json`.

---

Hecho por Sebastian Lopez.

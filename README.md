# English App v2 — Past Simple Verbs

App para **aprender y memorizar** los verbos en pasado del inglés
(infinitivo · pasado simple · participio · traducción). Es la versión 2 de mi
primer proyecto, reconstruida con código moderno y mejor estructura.

## Cómo se usa

- **Pasa el mouse** (PC) o **toca** (móvil) una palabra para ver su traducción al instante.
- **Marca como aprendida** con el check de cada tarjeta (tu progreso se guarda solo).
- **Busca** en inglés o español, **filtra** por regulares/irregulares, **mezcla** y revela todo.
- Reloj en vivo en inglés para aprender días, meses y hora.

## Tecnologías

- **Vue 3** (`<script setup>`) + **Vite 6** + **Vue Router**
- **CSS** con variables en `:root` (todos los colores en un solo lugar)
- **PWA** (instalable / offline) con `vite-plugin-pwa`
- Datos en un único `src/data/verbs.json` · progreso en `localStorage`

## Páginas

- **Inicio** — qué es la app y cómo usarla
- **Verbos** — el listado completo (buscar, filtrar, marcar, mezclar)
- **Calendario** — próximamente

## Estructura (MVC)

```
src/
├── data/          JSON con los 272 verbos (la "base de datos")
├── models/        lógica de datos y progreso (Model)
├── composables/   estado y reloj (Controller)
├── components/    componentes .vue reutilizables (View)
├── views/         páginas: Home / Verbs / Calendar (View)
├── router/        rutas de Vue Router
└── styles/        theme.css (colores) + estilos
```

## Comandos

```bash
npm install     # solo la primera vez
npm run dev     # modo desarrollo -> http://localhost:5173
npm run build   # versión de producción (dist/)
```

## Personalizar

- **Colores:** edita `src/styles/theme.css` (`:root`).
- **Verbos:** edita `src/data/verbs.json`.

---

Hecho por Sebastián López.

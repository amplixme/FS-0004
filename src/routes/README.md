# Rutas de la API

Todas las rutas de la API se registran en `index.js`, que centraliza los routers de cada módulo y los monta con su prefijo correspondiente.

## Cómo agregar una ruta nueva

1. Crear el archivo de rutas del módulo, por ejemplo `post.routes.js`, siguiendo el mismo patrón que `auth.routes.js` (Router de Express, validación con Zod si corresponde, conectado a su controller).

2. Importarlo en `index.js` y montarlo con `router.use()`:

\`\`\`js
import postRoutes from './post.routes.js';

router.use('/posts', postRoutes);
\`\`\`

3. No es necesario tocar `app.js` — `index.js` es el único punto donde se registran los módulos de rutas.

## Rutas actuales

| Prefijo | Archivo | Descripción |
|---|---|---|
| `/api/auth` | `auth.routes.js` | Registro y login de usuarios |
| `/api/health` | `index.js` | Healthcheck del servidor |
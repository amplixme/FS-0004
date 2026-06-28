# FS-0004 · Plataforma Editorial de Blog

Plataforma fullstack de blog editorial. Backend en Node.js/Express con PostgreSQL (vía Prisma) y frontend en React con Vite.

## Tech Stack

**Backend**
- Node.js + Express 5
- PostgreSQL + Prisma (ORM)
- JWT (`jsonwebtoken`) para autenticación
- bcrypt para hash de contraseñas
- Zod para validación de schemas
- dotenv + cors

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios (con interceptors de JWT)
- Tailwind CSS v4
- SweetAlert2

## Estructura del proyecto

```
.
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

> El backend y el frontend son dos proyectos Node independientes (cada uno con su propio `package.json`), así que las dependencias se instalan por separado.

## Prerrequisitos

Antes de empezar, asegurate de tener instalado:

- **Node.js** (v18 o superior) — [nodejs.org](https://nodejs.org/)
- **PostgreSQL** corriendo localmente (o accesible remotamente) — [postgresql.org](https://www.postgresql.org/download/)
- **npm** (viene incluido con Node.js)
- Un cliente para probar la API (opcional): [Thunder Client](https://www.thunderclient.com/) (extensión de VS Code), [Postman](https://www.postman.com/), o `curl`/Git Bash

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/amplixme/FS-0004
cd FS-0004
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

## Configuración de variables de entorno

Este proyecto usa **dos archivos `.env` separados**: uno para el backend y otro para el frontend. Ambos tienen su `.env.example` correspondiente como plantilla.

### Backend

Desde la carpeta `backend/`, copiá el archivo de ejemplo:

```bash
cd backend
cp .env.example .env
```

Abrí `backend/.env` y completá los valores:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db
JWT_SECRET=tu_secreto_super_seguro_aqui
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde corre el servidor backend. Si no se define, usa `3000` por defecto. |
| `DATABASE_URL` | Cadena de conexión a tu base PostgreSQL. Reemplazá `usuario`, `password`, `localhost:5432` y `nombre_db` con tus credenciales reales. |
| `JWT_SECRET` | Clave usada para firmar los tokens JWT. Usá un valor largo y aleatorio (podés generarlo con `openssl rand -base64 32`). |

> ⚠️ **Importante:** `DATABASE_URL` y `JWT_SECRET` no tienen valores funcionales por defecto — el servidor no va a arrancar (o va a fallar al autenticar) si no los completás correctamente.

### Frontend

Desde la carpeta `frontend/`, copiá el archivo de ejemplo:

```bash
cd frontend
cp .env.example .env
```

Abrí `frontend/.env` y completá el valor:

```env
VITE_API_URL=http://localhost:3000/api
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API backend. **Debe incluir el prefijo `/api`**, ya que todas las rutas del backend se montan bajo ese path (ver `backend/src/app.js`). Si cambiaste el `PORT` del backend, actualizá el puerto acá también. |

> ⚠️ **Importante:** en Vite, las variables de entorno expuestas al cliente deben empezar con el prefijo `VITE_`. Si el nombre no coincide exactamente con el usado en el código (`import.meta.env.VITE_API_URL` en `frontend/src/services/api.js`), Axios va a usar `undefined` como `baseURL` y todas las requests van a fallar silenciosamente o devolver errores de red.

## Base de datos: migraciones de Prisma

Con `backend/.env` ya configurado y PostgreSQL corriendo, generá las tablas en tu base de datos corriendo las migraciones:

```bash
cd backend
npx prisma migrate dev
```

Esto va a:
1. Crear la base de datos especificada en `DATABASE_URL` si no existe.
2. Aplicar todas las migraciones existentes en `prisma/migrations/`.
3. Generar el Prisma Client.

Si en algún momento necesitás regenerar el cliente sin crear una migración nueva (por ejemplo, después de un `git pull`):

```bash
npx prisma generate
```

## Levantar los servidores

Necesitás **dos terminales abiertas en simultáneo** (una para el backend, otra para el frontend).

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

El servidor va a quedar escuchando en `http://localhost:3000` (o el puerto que hayas definido en `PORT`). Deberías ver en consola:

```
Servidor corriendo en http://localhost:3000
```

Podés verificar que está vivo abriendo `http://localhost:3000` en el navegador — debería responder `{ "status": "ok", "message": "Servidor activo" }`.

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Vite va a mostrar la URL local (típicamente `http://localhost:5173`). Abrila en el navegador para ver la aplicación.

## Problemas frecuentes al levantar el proyecto por primera vez:

- **El backend no arranca / error de conexión a la base de datos**: revisá que PostgreSQL esté corriendo y que `DATABASE_URL` en `backend/.env` tenga el usuario, password, host, puerto y nombre de base de datos correctos.
- **Error 401 o falla la autenticación**: verificá que `JWT_SECRET` esté definido en `backend/.env`. Si lo cambiás después de generar tokens existentes, esos tokens viejos van a dejar de ser válidos.
- **El frontend no se conecta al backend (requests fallan o devuelven 404)**: confirmá que `VITE_API_URL` en `frontend/.env` apunte exactamente al puerto del backend **e incluya el `/api`** al final (ej: `http://localhost:3000/api`, no `http://localhost:3000`).
- **Cambié el `.env` del frontend y no se actualiza nada**: Vite solo lee las variables de entorno al iniciar. Reiniciá el servidor (`Ctrl+C` y `npm run dev` de nuevo) después de modificar `frontend/.env`.
- **`npx prisma migrate dev` falla**: chequeá que la base de datos especificada en `DATABASE_URL` exista y que el usuario tenga permisos para crear tablas.
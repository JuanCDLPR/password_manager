# Password Manager Web

Cliente React de **Password Manager**. Incluye autenticación, perfil, control de
sesión y catálogo de plataformas.

> [!IMPORTANT]
> Aún no guarda accesos ni contraseñas. Grupos, accesos y dashboard están
> pendientes; no deben anunciarse como funciones terminadas.

## Funciones disponibles

- Registro con correo e inicio de sesión por usuario o correo.
- Validación de sesión, estado y rol contra el backend al abrir la app.
- Contador y renovación de JWT mediante POST seguro.
- Perfil y cambio de contraseña.
- CRUD de plataformas con búsqueda, ordenamiento y paginación local.
- Manejo HTTP centralizado y API configurable por entorno.
- Cliente reutilizable `api.get/post/patch/delete`.
- Errores `ApiError` con estado, código, detalles e identificador de solicitud.

## Instalación

```bash
git clone https://github.com/JuanCDLPR/password_manager.git
cd password_manager
npm install
```

Copia `.env.example` como `.env`:

```dotenv
REACT_APP_API_URL=http://localhost:3024/
```

Inicia el backend en `3024` y después:

```bash
npm start
```

El cliente inicia en `http://localhost:3021` en Windows.

## Módulos

| Módulo | Estado |
| --- | --- |
| Login y registro | Integrado |
| Perfil y contraseña | Integrado |
| Plataformas | Integrado |
| Grupos | UI sin backend |
| Accesos | Pendiente |
| Dashboard | Provisional |

## Tecnologías

React 18, React Router 6, Material UI 5, React Bootstrap, SweetAlert2,
`jwt-decode` y `moment-timezone`.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Desarrollo en Windows |
| `npm run build` | Bundle en `build/` |
| `npm test` | Pruebas de Create React App |

El script `start` usa `set PORT=3021`, específico de Windows.
En la validación del 30 de julio de 2026, `react-scripts build` no finalizó
dentro del tiempo de prueba; la sintaxis Babel sí pasó y el servidor de
desarrollo respondió HTTP 200. El build de producción requiere diagnóstico.
El árbol heredado de Create React App también reporta 80 vulnerabilidades en
`npm audit`; deben resolverse mediante una migración controlada, no con
`npm audit fix --force`.

## Configuración de seguridad

- La URL ya no está fija en el código; utiliza `REACT_APP_API_URL`.
- La renovación envía la contraseña en JSON mediante POST.
- El cliente HTTP acepta respuestas 2xx y conserva errores del backend.
- Las pantallas ya no comparan campos duplicados como `codigo`; el estado HTTP
  determina éxito o error.
- Al cerrar sesión solo elimina `JWT`, `nombre` y `user`.
- El JWT aún vive en `localStorage`; una futura etapa debe migrarlo a cookie
  HttpOnly junto con protección CSRF.

No deben almacenarse secretos reales hasta implementar el diseño criptográfico
de la bóveda descrito en la
[documentación de seguridad](https://github.com/JuanCDLPR/password_manager_back/blob/main/docs/03-SEGURIDAD.md).

## Producción

```bash
npm run build
node server.js
```

`server.js` todavía necesita fallback a `index.html` para que recargar rutas
como `/perfil` no responda 404.

## Autores

- [MrLoop15](https://github.com/Mrloop15)
- [JuanCDLPR](https://github.com/JuanCDLPR)

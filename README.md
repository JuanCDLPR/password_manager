# Password Manager Web

Cliente web de **Password Manager**, desarrollado con React. Incluye
autenticación, perfil de usuario, control de sesión y administración de un
catálogo personal de plataformas.

> [!IMPORTANT]
> El proyecto aún está en desarrollo. Hoy no almacena credenciales de acceso:
> las plataformas contienen únicamente nombre y URL. Los módulos de grupos,
> accesos y dashboard no están completos.

## Funcionalidades actuales

- Registro e inicio de sesión.
- Sesión JWT almacenada en el navegador.
- Contador de expiración y renovación manual de la sesión.
- Consulta y edición de perfil e imagen por URL.
- Cambio de contraseña.
- CRUD de plataformas con búsqueda, ordenamiento y paginación local.
- Diseño oscuro adaptable con Material UI y React Bootstrap.

## Estado de los módulos

| Módulo | Estado |
| --- | --- |
| Login y registro | Integrado con el backend |
| Perfil y cambio de contraseña | Integrado con el backend |
| Plataformas | Integrado con el backend |
| Grupos | Interfaz creada; backend pendiente |
| Accesos | Opción de menú; ruta y funcionalidad pendientes |
| Dashboard | Contenido provisional |

## Tecnologías

- React 18 y Create React App
- React Router 6
- Material UI 5
- React Bootstrap y Bootstrap 5
- SweetAlert2
- jwt-decode
- moment-timezone

## Requisitos

- Node.js 18 o una versión LTS compatible.
- npm.
- La [API de Password Manager](https://github.com/JuanCDLPR/password_manager_back)
  en ejecución.

## Instalación

```bash
git clone https://github.com/JuanCDLPR/password_manager.git
cd password_manager
npm install
npm start
```

En Windows, el script inicia el cliente en `http://localhost:3021`.

El frontend apunta actualmente a `http://localhost:3024/`, por lo que el
backend debe ejecutarse con:

```dotenv
PORT=3024
```

La URL está definida de forma fija en `src/context/backend.js`. Conviene
reemplazarla por una variable de entorno antes de desplegar.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo en Windows |
| `npm run build` | Genera el bundle de producción en `build/` |
| `npm test` | Ejecuta las pruebas de Create React App |

El repositorio no contiene todavía pruebas propias. El script `start` usa la
sintaxis `set PORT=3021`, específica de Windows.

## Estructura

```text
public/                Plantilla HTML, manifiesto, estilos y recursos públicos
src/assets/            Imágenes e iconos
src/context/           Cliente HTTP y almacenamiento local
src/includes/          Menú y componentes compartidos
src/lib/               Utilidades de UI
src/modules/login/     Inicio de sesión
src/modules/register/  Registro
src/modules/perfil/    Perfil y cambio de contraseña
src/modules/plataformas/ Catálogo de plataformas
src/modules/grupos/    UI pendiente de soporte en backend
server.js              Servidor estático del build
ecosystem.config.js    Configuración PM2
```

## Producción

```bash
npm run build
node server.js
```

El servidor usa `PORT` o `4001`. En el estado actual sirve archivos estáticos,
pero no aplica fallback a `index.html` para rutas internas de React Router; una
recarga directa en `/perfil` o `/plataformas` puede responder 404. Debe
corregirse antes del despliegue.

Existe configuración de PM2:

```bash
pm2 start ecosystem.config.js --env prod
```

## Consideraciones de seguridad

- El JWT se guarda en `localStorage`; cualquier XSS podría leerlo.
- La sesión se envía mediante un encabezado personalizado.
- La renovación actual envía la contraseña en la URL.
- No se deben almacenar contraseñas reales hasta resolver los hallazgos de
  seguridad documentados en el backend.

Consulta la
[evaluación técnica completa](https://github.com/JuanCDLPR/password_manager_back/blob/main/docs/ESTADO-Y-MEJORAS.md)
y la
[referencia de la API](https://github.com/JuanCDLPR/password_manager_back/blob/main/docs/API.md).

## Autores

- [MrLoop15](https://github.com/Mrloop15)
- [JuanCDLPR](https://github.com/JuanCDLPR)

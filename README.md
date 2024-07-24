# Password Manager

#### Aplicacion creada con Create React App

---

###### Aplicacion para la grestion de contraseñas del usuario asi, guardadas en una base de datos en la cual sus datos estaran completamente encriptados para asi asegurar la integridad de sus datos

###### NOTA: el proyecto se complementa con un backend que se podra encontrar en el repositorio de [PASSWORD MANAGER BACK](https://github.com/JuanCDLPR/password_manager_back)

---

<br>

### Comandos disponibles

### `npm start`

### `npm build`

---

<br>

#### Version de node

> [18.12.1](https://nodejs.org/en/download/package-manager)

---

<br>

### Instrucciones para servidor local de compilado persistente en Windows

<br>

Paso 1: instalar los recursos necesarios

```bash
npm install pm2-windows-startup -g
```

```bash
npm install -g pm2
```

Paso 2: inicializar el entorno (estar ubicado en la carpeta del proyecto)

```bash
pm2 start ecosystem.config.js --env prod
```

```bash
pm2-startup install
```

```bash
pm2 save
```

Eliminar procesos (eso solo en caso que ya no sea requerido que sea persistente)

```bash
pm2-startup uninstall
```

## Creadores

- [MrLoop15](https://github.com/Mrloop15)
- [JuanCDLPR](https://github.com/JuanCDLPR)

---

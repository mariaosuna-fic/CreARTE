# Introducción

CREARTE es un sistema web desarrollado para apoyar la administración académica y administrativa de una academia de artes. El proyecto surge como una solución para organizar de mejor manera la información relacionada con alumnos, profesores, clases, horarios, inscripciones y pagos.

El sistema busca reducir el uso de registros manuales, evitar errores en la administración de datos y permitir que la información pueda consultarse de forma más rápida, clara y ordenada desde una plataforma web.

---

# Resumen del Sistema

CREARTE permite gestionar la información principal de una academia artística mediante una aplicación web conectada a una base de datos MySQL. El sistema cuenta con una interfaz visual para los usuarios y un backend encargado de procesar las solicitudes, conectarse con la base de datos y responder a las operaciones realizadas desde el frontend.

Entre sus funciones principales se encuentran el registro de usuarios, inicio de sesión, administración de clases, consulta de cursos y manejo de información académica relacionada con alumnos, profesores y pagos.

El proyecto está diseñado bajo una arquitectura cliente-servidor, donde el frontend se encarga de la interacción con el usuario y el backend procesa la lógica del sistema mediante rutas y servicios conectados a la base de datos.

---

# Requisitos Funcionales

| Requisito | Descripción |
|---|---|
| Registro de usuarios | El sistema debe permitir registrar usuarios con información básica como nombre, correo, contraseña y rol. |
| Inicio de sesión | El sistema debe permitir que los usuarios accedan mediante correo electrónico y contraseña. |
| Gestión de roles | El sistema debe diferenciar el acceso según el tipo de usuario: administrador, alumno o profesor. |
| Gestión de clases | El administrador debe poder registrar, consultar, editar y eliminar clases. |
| Consulta de cursos | Los usuarios deben poder visualizar información sobre los cursos disponibles. |
| Gestión de alumnos | El sistema debe permitir almacenar información relacionada con los alumnos. |
| Gestión de profesores | El sistema debe permitir registrar información de profesores y su especialidad. |
| Gestión de horarios | El sistema debe organizar los horarios relacionados con las clases. |
| Gestión de pagos | El sistema debe permitir registrar y consultar información relacionada con mensualidades y pagos. |
| Navegación del sitio | El sistema debe contar con páginas principales como inicio, nosotros, cursos, contacto, login y registro. |
| Conexión con base de datos | El sistema debe guardar y consultar la información desde una base de datos MySQL. |

---

# Requisitos No Funcionales

| Requisito | Descripción |
|---|---|
| Seguridad | El sistema debe proteger el acceso mediante autenticación de usuarios y separación de roles. |
| Disponibilidad | El sistema debe estar disponible desde un navegador web con conexión a internet. |
| Usabilidad | La interfaz debe ser clara, sencilla y fácil de utilizar. |
| Rendimiento | Las consultas y operaciones deben ejecutarse de forma eficiente. |
| Escalabilidad | El sistema debe permitir agregar nuevos módulos en el futuro. |
| Mantenimiento | El código debe estar organizado para facilitar correcciones y mejoras. |
| Compatibilidad | El sistema debe funcionar en navegadores modernos. |
| Integridad de datos | La información almacenada debe mantenerse correcta y relacionada entre tablas. |
| Accesibilidad | El sistema debe ser fácil de navegar para usuarios con diferentes niveles de conocimiento tecnológico. |

---

# Requisitos Técnicos

| Tecnología | Uso en el proyecto |
|---|---|
| HTML5 | Estructura de las páginas web. |
| CSS3 | Diseño visual y estilos del sistema. |
| JavaScript | Interactividad del frontend y consumo de rutas del backend. |
| Node.js | Entorno de ejecución para el backend. |
| Express.js | Creación del servidor y manejo de rutas. |
| MySQL | Base de datos relacional del sistema. |
| MySQL Workbench | Administración y visualización de la base de datos. |
| Git | Control de versiones del proyecto. |
| GitHub | Almacenamiento remoto del repositorio. |
| Render | Despliegue del backend en servidor remoto. |
| Visual Studio Code | Editor de código utilizado para el desarrollo. |
| Postman | Prueba de rutas y endpoints del backend. |

---

# Diseño del Sistema

El diseño visual y la estructura de navegación de CREARTE fueron planificados utilizando Figma. Esta etapa permitió organizar la experiencia de usuario, distribución de componentes y estructura general de las interfaces antes del desarrollo del sistema.

## Prototipo en Figma

[Visualizar diseño del sistema en Figma](AQUI_COLOCA_EL_LINK_DE_TU_FIGMA)

---

## Vista previa del diseño

![Diseño en Figma](./assets/figma-diseno.png)

---

# Arquitectura del Sistema

![Arquitectura del sistema](./assets/arquitectura-sistema.png)

---

El sistema CREARTE utiliza una arquitectura web cliente-servidor dividida en tres capas principales:

```text
Usuario
↓
Frontend
↓
Backend / API
↓
Base de Datos MySQL
```

## Capas del sistema

| Capa | Descripción |
|---|---|
| Frontend | Es la parte visual del sistema. Permite al usuario interactuar con las páginas, formularios, botones y secciones del sitio. |
| Backend | Procesa las solicitudes del frontend, maneja la lógica del sistema y se comunica con la base de datos. |
| Base de Datos | Almacena la información de usuarios, alumnos, profesores, clases, horarios, pagos e inscripciones. |

## Funcionamiento general

```text
1. El usuario interactúa con la interfaz web.
2. El frontend envía solicitudes al backend.
3. El backend procesa la solicitud mediante rutas creadas con Express.js.
4. El backend consulta o modifica la información en MySQL.
5. La base de datos devuelve la información solicitada.
6. El backend responde al frontend.
7. El frontend muestra el resultado al usuario.
```

---

## Diagrama de clases

El siguiente diagrama representa la estructura lógica y las relaciones principales entre las entidades del sistema CREARTE.

![Diagrama de clases](./assets/diagrama-clases.png)

# Requerimientos del Proyecto

Para que el sistema funcione correctamente, se requiere contar con los siguientes elementos:

## Requerimientos de software

- Navegador web moderno.
- Node.js instalado.
- Git instalado.
- Visual Studio Code o editor de código similar.
- Acceso al repositorio de GitHub.
- Acceso al servidor remoto donde se encuentra desplegado el backend.
- Acceso a la base de datos MySQL utilizada por el sistema.

## Requerimientos de conexión

- Conexión a internet.
- Acceso al servidor remoto del backend.
- Acceso a la base de datos configurada para el proyecto.

## Requerimientos para desarrollo

- Conocimiento básico de HTML, CSS y JavaScript.
- Conocimiento básico de Node.js y Express.js.
- Conocimiento básico de MySQL.
- Uso básico de Git y GitHub.
- Uso de herramientas como Postman para probar rutas del backend.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/mariaosuna-fic/CreARTE.git
```

## 2. Entrar a la carpeta del proyecto

```bash
cd CreARTE
```

## 3. Instalar dependencias

Dependiendo de la estructura del proyecto, entrar a la carpeta donde se encuentra el archivo `package.json`.

```bash
cd backend
```

Después instalar las dependencias:

```bash
npm install
```

## 4. Verificar conexión con el servidor remoto

El proyecto utiliza un backend desplegado en un servidor remoto, por lo que las rutas del frontend deben apuntar a la URL correspondiente del servidor.

```text
https://crearte-or0f.onrender.com
```

## 5. Ejecutar el servidor en desarrollo

```bash
node server.js
```

También puede ejecutarse con nodemon:

```bash
npx nodemon server.js
```

## 6. Abrir la aplicación

Desde el navegador se puede acceder a las rutas principales del sistema.

### Servidor remoto

```text
https://crearte-or0f.onrender.com
```

---

# Uso del Sistema

## Página principal

La página principal funciona como la primera vista del sistema CREARTE. Desde esta sección, los usuarios pueden conocer información general sobre la academia, sus cursos y las opciones principales de navegación.

## Registro de usuario

El sistema permite registrar usuarios proporcionando información básica. Estos datos son enviados al backend y almacenados en la base de datos.

## Inicio de sesión

Los usuarios pueden iniciar sesión utilizando su correo electrónico y contraseña. Dependiendo del rol asignado, el sistema puede redirigirlos a una sección específica.

## Módulo de clases

El administrador puede gestionar las clases disponibles en la academia. Este módulo permite:

- Registrar nuevas clases.
- Consultar clases existentes.
- Editar información de una clase.
- Eliminar clases registradas.

## Consulta de cursos

Los usuarios pueden visualizar los cursos disponibles de la academia, como:

- Pintura
- Teatro
- Danza
- Escultura

## Gestión administrativa

El sistema está pensado para facilitar el control de información académica y administrativa, permitiendo que los datos se almacenen de forma organizada en la base de datos.

---

# Base de Datos

La base de datos del sistema se llama:

```text
CREARTE
```

CREARTE utiliza una base de datos relacional en MySQL para almacenar la información del sistema. Esta base de datos contiene tablas relacionadas entre sí para organizar usuarios, alumnos, profesores, clases, horarios, salones, inscripciones, asistencias, mensualidades y pagos.

---

## Diagrama entidad-relación

El siguiente diagrama muestra la estructura de la base de datos y las relaciones entre las tablas del sistema.

![Diagrama entidad-relación](./assets/diagrama-entidad-relacion.png)

## Tablas principales

| Tabla | Descripción |
|---|---|
| Usuario | Almacena la información general de los usuarios del sistema. |
| Alumno | Guarda los datos específicos de los alumnos. |
| Profesor | Guarda los datos específicos de los profesores. |
| Administrador | Guarda la información relacionada con usuarios administradores. |
| Clase | Almacena la información de las clases disponibles. |
| Horario | Guarda los días y horas en que se imparten las clases. |
| Salon | Almacena los salones o espacios disponibles para las clases. |
| Clase_Programada | Relaciona clases, profesores, horarios y salones. |
| Inscripcion | Registra la inscripción de alumnos a clases programadas. |
| Asistencia | Controla la asistencia de los alumnos a las clases. |
| Mensualidad | Almacena la información de pagos pendientes o realizados por mes. |
| Pago | Registra los pagos realizados por los alumnos. |

## Relaciones principales

- Un usuario puede estar asociado a un alumno, profesor o administrador.
- Un profesor puede impartir una o varias clases.
- Una clase puede tener horarios y salones asignados.
- Un alumno puede inscribirse a una o varias clases programadas.
- Una mensualidad pertenece a un alumno.
- Un pago pertenece a una mensualidad.
- La asistencia se registra por alumno y clase programada.

## Objetivo de la base de datos

La base de datos permite mantener organizada la información del sistema y facilita operaciones como:

- Consultar usuarios.
- Registrar alumnos y profesores.
- Administrar clases.
- Controlar inscripciones.
- Revisar pagos y mensualidades.
- Consultar horarios y salones.
- Mantener la información relacionada de forma estructurada.

## Seguridad en la base de datos

Para proteger la información almacenada, el sistema considera las siguientes medidas:

- Uso de claves primarias para identificar registros.
- Uso de claves foráneas para mantener relaciones correctas entre tablas.
- Restricciones de datos para evitar información inválida.
- Separación de roles de usuario.
- Manejo de credenciales desde el servidor remoto.
- Evitar exponer datos sensibles directamente en el código público.
- Validación de datos antes de enviarlos a la base de datos.
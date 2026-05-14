# CreARTE
# Introducción
CREARTE es una aplicación web desarrollada con el objetivo de mejorar la gestión académica y administrativa de una academia de artes. El sistema busca solucionar los problemas derivados del manejo manual de información, como registros desactualizados, confusión en horarios, dificultad para controlar pagos y poca organización administrativa.

La plataforma permite administrar información relacionada con alumnos, profesores, clases, horarios, inscripciones y pagos, centralizando todos los datos en un solo sistema accesible desde internet. Además, incorpora un acceso para alumnos donde pueden consultar información relacionada con sus clases, horarios y estado de pagos.

El proyecto fue desarrollado utilizando tecnologías web modernas para frontend, backend y base de datos, implementando una arquitectura organizada y escalable que facilita el mantenimiento y futuras mejoras del sistema.

# Resumen del Sistema
CREARTE es un sistema web orientado a la administración académica y administrativa de una academia de artes. La plataforma permite gestionar de manera organizada la información relacionada con alumnos, profesores, clases, horarios, inscripciones y pagos.

El sistema cuenta con diferentes módulos que facilitan las actividades principales de la academia, permitiendo automatizar procesos que normalmente se realizan de forma manual. Entre sus principales funcionalidades se encuentran el registro y autenticación de usuarios, el control de clases y horarios, la administración de alumnos y profesores, así como el seguimiento de mensualidades y pagos.

La aplicación fue desarrollada bajo una arquitectura web en tres capas, separando el frontend, backend y base de datos para mantener una estructura modular, organizada y escalable. Para el desarrollo se utilizaron tecnologías como HTML, CSS y JavaScript para la interfaz visual, Node.js y Express.js para el servidor backend, y MySQL como sistema gestor de base de datos.

Además, el sistema incorpora acceso por roles, permitiendo que administradores, profesores y alumnos interactúen con diferentes funciones según sus permisos dentro de la plataforma.

# Requisitos
## Requisitos Funcionales
El sistema debe permitir:

- Registrar alumnos, profesores y administradores.
- Iniciar sesión mediante autenticación de usuarios.
- Registrar nuevos usuarios dentro del sistema.
- Crear, consultar, actualizar y eliminar clases.
- Gestionar horarios y salones.
- Registrar inscripciones de alumnos a clases.
- Registrar y consultar pagos y mensualidades.
- Consultar información según el rol del usuario.
- Registrar asistencias de alumnos.
- Visualizar clases, horarios y pagos desde la cuenta del alumno.
- Generar reportes básicos administrativos.

## Requisitos No Funcionales
| Requisito | Descripción |
|---|---|
| Usabilidad | El sistema debe contar con una interfaz sencilla y fácil de utilizar. |
| Disponibilidad | El sistema debe ser accesible desde cualquier navegador web con conexión a internet. |
| Seguridad | El acceso debe estar protegido mediante autenticación de usuarios. |
| Rendimiento | Las consultas y operaciones deben ejecutarse de manera rápida y eficiente. |
| Escalabilidad | El sistema debe permitir futuras mejoras y módulos adicionales. |
| Mantenimiento | El código debe mantenerse organizado y modularizado. |
| Compatibilidad | El sistema debe funcionar en navegadores modernos. |

## Requisitos Técnicos
| Tecnología | Uso |
|---|---|
| HTML | Estructura de las páginas web |
| CSS | Diseño visual e interfaz |
| JavaScript | Interacción del frontend |
| Node.js | Desarrollo del backend |
| Express.js | Creación de servidor y rutas |
| MySQL | Base de datos relacional |
| MySQL Workbench | Administración de la base de datos |
| Git y GitHub | Control de versiones |
| Postman | Pruebas de endpoints |

## Requisitos de Arquitectura del Sistema
El sistema utiliza una arquitectura web en tres capas:

| Capa | Función |
|---|---|
| Frontend | Interfaz visual e interacción con el usuario |
| Backend | Procesamiento de solicitudes y lógica de negocio |
| Base de Datos | Almacenamiento y administración de la información |

### Flujo general de funcionamiento
```text
Usuario
↓
Frontend
↓
Backend / API
↓
Base de Datos MySQL
```

La arquitectura modular permite mantener el sistema organizado, facilitar el mantenimiento y mejorar la escalabilidad del proyecto.

# Instalación
## Requisitos previos
Para instalar y ejecutar el sistema CREARTE es necesario contar con las siguientes herramientas:

- Node.js
- MySQL Server
- MySQL Workbench
- Visual Studio Code
- Git
- Navegador web
- Postman para pruebas de endpoints


## Clonar el repositorio
```bash
git clone https://github.com/mariaosuna-fic/CreARTE.git
```

## Entrar a la carpeta del proyecto

```bash
cd CreARTE
```

## Entrar a la carpeta del backend
```bash
cd backend
```

## Instalar dependencias
```bash
npm install
```

## Configurar variables de entorno
Crear un archivo llamado `.env` dentro de la carpeta `backend`.

### Estructura del archivo `.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=CREARTE
DB_PORT=3306
PORT=3000
```

## Ejecutar el servidor
```bash
node server.js
```

## Ejecutar el servidor con nodemon
```bash
npx nodemon server.js
```

## Abrir la aplicación en el navegador
```text
http://localhost:3000
```

## Rutas principales del sistema
```text
http://localhost:3000/login
http://localhost:3000/registro
http://localhost:3000/clases-admin
```

# Uso del Sistema
## Página principal
La página principal funciona como la interfaz inicial del sistema CREARTE. Desde ella, los usuarios pueden acceder a las diferentes secciones de la plataforma, conocer información de la academia y navegar hacia los módulos principales.

## Inicio de sesión
El sistema cuenta con un módulo de autenticación que permite a los usuarios iniciar sesión utilizando un correo electrónico y una contraseña.

### Proceso de login
1. Ingresar correo electrónico.
2. Ingresar contraseña.
3. Presionar el botón de iniciar sesión.
4. El sistema valida las credenciales registradas en la base de datos.

## Registro de usuarios
El sistema permite registrar nuevos usuarios mediante un formulario de registro.

### Datos solicitados
- Nombre
- Correo electrónico
- Contraseña
- Rol del usuario

Una vez completado el formulario, la información se almacena en la base de datos mediante el backend desarrollado con Node.js y Express.js.

## CRUD de clases
El sistema incorpora un formulario CRUD para la gestión de clases.

### Funciones disponibles
| Función | Descripción |
|---|---|
| Crear | Registrar nuevas clases |
| Leer | Consultar clases registradas |
| Actualizar | Modificar información de una clase |
| Eliminar | Borrar clases existentes |

## Consulta de información
Dependiendo del rol del usuario, el sistema permite visualizar información relacionada con:

- Clases registradas
- Horarios
- Profesores
- Pagos
- Mensualidades

## Funcionamiento general
El usuario interactúa con el frontend mediante formularios y botones. Las solicitudes son enviadas al backend mediante peticiones HTTP, donde se procesan y posteriormente se almacenan o consultan desde la base de datos MySQL.

### Flujo del sistema
```text
Usuario
↓
Frontend
↓
Backend
↓
Base de Datos
```

# Base de Datos (Modelado)
La base de datos del sistema CREARTE fue diseñada utilizando un modelo relacional en MySQL con el objetivo de mantener una estructura organizada, escalable y segura para la administración de la información académica y administrativa de la academia.

El modelo de datos permite gestionar usuarios, alumnos, profesores, clases, horarios, pagos e inscripciones mediante tablas relacionadas entre sí a través de llaves primarias y foráneas.

## Entidades principales
| Entidad | Descripción |
|---|---|
| Usuario | Controla el acceso y autenticación dentro del sistema |
| Alumno | Almacena información específica de estudiantes |
| Profesor | Registra información de los docentes |
| Administrador | Gestiona el sistema y los módulos administrativos |
| Clase | Registra las clases disponibles |
| Horario | Define días y horarios de las clases |
| Salon | Registra los espacios físicos disponibles |
| Clase_Programada | Relaciona clases, profesores, horarios y salones |
| Inscripcion | Registra alumnos inscritos en clases |
| Asistencia | Controla la asistencia de alumnos |
| Mensualidad | Gestiona obligaciones de pago |
| Pago | Registra pagos realizados |

## Relaciones principales
| Relación | Cardinalidad |
|---|---|
| Usuario - Alumno | 1 : 1 |
| Usuario - Profesor | 1 : 1 |
| Usuario - Administrador | 1 : 1 |
| Clase - Clase_Programada | 1 : N |
| Profesor - Clase_Programada | 1 : N |
| Horario - Clase_Programada | 1 : N |
| Salon - Clase_Programada | 1 : N |
| Alumno - Clase | N : M |
| Alumno - Mensualidad | 1 : N |
| Mensualidad - Pago | 1 : N |

## Características del modelo
- Uso de llaves primarias para identificar registros únicos.
- Uso de llaves foráneas para mantener integridad referencial.
- Separación de módulos académicos, administrativos y financieros.
- Organización modular para facilitar escalabilidad y mantenimiento.
- Control de acceso mediante roles de usuario.

## Módulos representados en la base de datos
### Gestión de usuarios
Permite administrar:
- Alumnos
- Profesores
- Administradores
- Autenticación y acceso al sistema

### Gestión académica
Incluye:
- Clases
- Horarios
- Salones
- Clases programadas
- Inscripciones

### Gestión administrativa
Incluye:
- Mensualidades
- Pagos
- Control financiero

### Control y seguimiento
Incluye:
- Asistencias
- Historial académico
- Consultas de información

## Sistema gestor de base de datos
El sistema utiliza MySQL como motor de base de datos y MySQL Workbench para la administración y modelado del sistema relacional.
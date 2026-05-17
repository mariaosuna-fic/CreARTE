CREATE DATABASE CREARTE;
USE CREARTE;

-- USUARIO
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL,
    rol ENUM('admin','alumno','profesor') NOT NULL,
    estado BOOLEAN NOT NULL
);

-- ALUMNO
CREATE TABLE Alumno (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro DATE,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- PROFESOR
CREATE TABLE Profesor (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    especialidad VARCHAR(100),
    disponibilidad VARCHAR(100),
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- CLASE
CREATE TABLE Clase (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    nombre_clase VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    nivel VARCHAR(50),
    descripcion TEXT,
    cupo_maximo INT
);

-- HORARIO
CREATE TABLE Horario (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    dia VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME
);

-- SALON
CREATE TABLE Salon (
    id_salon INT AUTO_INCREMENT PRIMARY KEY,
    nombre_salon VARCHAR(50),
    capacidad INT
);

-- CLASE PROGRAMADA
CREATE TABLE Clase_Programada (
    id_clase_programada INT AUTO_INCREMENT PRIMARY KEY,
    id_clase INT,
    id_profesor INT,
    id_horario INT,
    id_salon INT,
    FOREIGN KEY (id_clase) REFERENCES Clase(id_clase),
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor),
    FOREIGN KEY (id_horario) REFERENCES Horario(id_horario),
    FOREIGN KEY (id_salon) REFERENCES Salon(id_salon)
);

-- INSCRIPCION
CREATE TABLE Inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inscripcion DATE,
    id_alumno INT,
    id_clase_programada INT,
    FOREIGN KEY (id_alumno) REFERENCES Alumno(id_alumno),
    FOREIGN KEY (id_clase_programada) REFERENCES Clase_Programada(id_clase_programada)
);

-- ASISTENCIA
CREATE TABLE Asistencia (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado VARCHAR(20),
    id_alumno INT,
    id_clase_programada INT,
    FOREIGN KEY (id_alumno) REFERENCES Alumno(id_alumno),
    FOREIGN KEY (id_clase_programada) REFERENCES Clase_Programada(id_clase_programada)
);

-- MENSUALIDAD
CREATE TABLE Mensualidad (
    id_mensualidad INT AUTO_INCREMENT PRIMARY KEY,
    folio_recibo VARCHAR(50),
    concepto VARCHAR(100),
    monto DECIMAL(10,2),
    fecha_limite DATE,
    estado VARCHAR(20),
    mes INT,
    anio INT,
    id_alumno INT,
    FOREIGN KEY (id_alumno) REFERENCES Alumno(id_alumno)
);

-- PAGO
CREATE TABLE Pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pago DATE,
    monto_pagado DECIMAL(10,2),
    metodo_pago VARCHAR(50),
    id_mensualidad INT,
    FOREIGN KEY (id_mensualidad) REFERENCES Mensualidad(id_mensualidad)
);

-- USUARIOS
INSERT INTO Usuario(nombre, correo, contraseña, rol, estado)
VALUES
('Maria Lopez', 'maria.lopez@gmail.com', '12345', 'alumno', true),
('Juan Perez', 'juan.perez@gmail.com', '12345', 'alumno', true),
('Sofia Hernandez', 'sofia.hernandez@gmail.com', '12345', 'alumno', true),
('Ana Torres', 'ana.torres@gmail.com', '12345', 'profesor', true),
('Luis Martinez', 'luis.martinez@gmail.com', '12345', 'profesor', true),
('Carlos Ruiz', 'carlos.ruiz@gmail.com', '12345', 'admin', true);

-- ALUMNOS
INSERT INTO Alumno(matricula, telefono, fecha_registro, id_usuario)
VALUES
('ALU001', '6671234567', '2026-05-01', 1),
('ALU002', '6672345678', '2026-05-02', 2),
('ALU003', '6673456789', '2026-05-03', 3);

-- PROFESORES
INSERT INTO Profesor(especialidad, disponibilidad, id_usuario)
VALUES
('Pintura', 'Lunes y miercoles por la tarde', 4),
('Ilustracion digital', 'Viernes por la tarde y sabados por la mañana', 5);

-- CLASES
INSERT INTO Clase(nombre_clase, tipo, nivel, descripcion, cupo_maximo)
VALUES
('Pintura basica', 'Artes visuales', 'Principiante', 'Clase introductoria de pintura, mezcla de colores y uso de materiales.', 15),
('Ilustracion digital', 'Artes visuales', 'Intermedio', 'Clase enfocada en composicion, bocetaje y creacion de ilustraciones digitales.', 20),
('Dibujo artistico', 'Artes visuales', 'Principiante', 'Tecnicas basicas de dibujo, proporcion, sombras y volumen.', 12);

-- HORARIOS
INSERT INTO Horario(dia, hora_inicio, hora_fin)
VALUES
('Lunes', '16:00:00', '18:00:00'),
('Miercoles', '17:00:00', '19:00:00'),
('Viernes', '15:00:00', '17:00:00');

-- SALONES
INSERT INTO Salon(nombre_salon, capacidad)
VALUES
('Taller de pintura', 20),
('Taller de dibujo', 25),
('Laboratorio de ilustracion', 15);

-- CLASES PROGRAMADAS
INSERT INTO Clase_Programada(id_clase, id_profesor, id_horario, id_salon)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 3),
(3, 1, 3, 2);

-- INSCRIPCIONES
INSERT INTO Inscripcion(fecha_inscripcion, id_alumno, id_clase_programada)
VALUES
('2026-05-05', 1, 1),
('2026-05-05', 2, 2),
('2026-05-06', 3, 3),
('2026-05-07', 1, 3);

-- ASISTENCIA
INSERT INTO Asistencia(fecha, estado, id_alumno, id_clase_programada)
VALUES
('2026-05-06', 'presente', 1, 1),
('2026-05-06', 'presente', 2, 2),
('2026-05-07', 'falta', 3, 3),
('2026-05-08', 'presente', 1, 3);

-- MENSUALIDADES
INSERT INTO Mensualidad(folio_recibo, concepto, monto, fecha_limite, estado, mes, anio, id_alumno)
VALUES
('REC001', 'Mensualidad mayo - Pintura basica', 800.00, '2026-05-10', 'pagado', 5, 2026, 1),
('REC002', 'Mensualidad mayo - Ilustracion digital', 850.00, '2026-05-10', 'pendiente', 5, 2026, 2),
('REC003', 'Mensualidad mayo - Dibujo artistico', 750.00, '2026-05-10', 'pagado', 5, 2026, 3);

-- PAGOS
INSERT INTO Pago(fecha_pago, monto_pagado, metodo_pago, id_mensualidad)
VALUES
('2026-05-08', 800.00, 'efectivo', 1),
('2026-05-09', 750.00, 'transferencia', 3);
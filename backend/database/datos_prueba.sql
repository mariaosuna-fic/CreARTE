USE CREARTE;

SET SQL_SAFE_UPDATES = 0;

-- Limpiar datos anteriores en orden correcto
DELETE FROM Pago;
DELETE FROM Mensualidad;
DELETE FROM Asistencia;
DELETE FROM Inscripcion;
DELETE FROM Clase_Programada;
DELETE FROM Salon;
DELETE FROM Horario;
DELETE FROM Clase;
DELETE FROM Profesor;
DELETE FROM Alumno;
DELETE FROM Usuario;

-- Reiniciar IDs
ALTER TABLE Usuario AUTO_INCREMENT = 1;
ALTER TABLE Alumno AUTO_INCREMENT = 1;
ALTER TABLE Profesor AUTO_INCREMENT = 1;
ALTER TABLE Clase AUTO_INCREMENT = 1;
ALTER TABLE Horario AUTO_INCREMENT = 1;
ALTER TABLE Salon AUTO_INCREMENT = 1;
ALTER TABLE Clase_Programada AUTO_INCREMENT = 1;
ALTER TABLE Inscripcion AUTO_INCREMENT = 1;
ALTER TABLE Asistencia AUTO_INCREMENT = 1;
ALTER TABLE Mensualidad AUTO_INCREMENT = 1;
ALTER TABLE Pago AUTO_INCREMENT = 1;

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
INSERT INTO Profesor(especialidad, id_usuario)
VALUES
('Pintura', 4),
('Danza', 5);

-- CLASES
INSERT INTO Clase(nombre_clase, tipo, nivel, descripcion, cupo_maximo)
VALUES
('Pintura basica', 'Arte visual', 'Principiante', 'Clase introductoria de pintura.', 15),
('Danza contemporanea', 'Danza', 'Intermedio', 'Clase de expresion corporal.', 20),
('Dibujo artistico', 'Arte visual', 'Principiante', 'Tecnicas basicas de dibujo.', 12);

-- HORARIOS
INSERT INTO Horario(dia, hora_inicio, hora_fin)
VALUES
('Lunes', '16:00:00', '18:00:00'),
('Miercoles', '17:00:00', '19:00:00'),
('Viernes', '15:00:00', '17:00:00');

-- SALONES
INSERT INTO Salon(nombre_salon, capacidad)
VALUES
('Salon A', 20),
('Salon B', 25),
('Salon C', 15);

-- CLASES PROGRAMADAS
INSERT INTO Clase_Programada(id_clase, id_profesor, id_horario, id_salon)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 1, 3, 3);

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
('REC001', 'Mensualidad mayo', 800.00, '2026-05-10', 'pagado', 5, 2026, 1),
('REC002', 'Mensualidad mayo', 800.00, '2026-05-10', 'pendiente', 5, 2026, 2),
('REC003', 'Mensualidad mayo', 750.00, '2026-05-10', 'pagado', 5, 2026, 3);

-- PAGOS
INSERT INTO Pago(fecha_pago, monto_pagado, metodo_pago, id_mensualidad)
VALUES
('2026-05-08', 800.00, 'efectivo', 1),
('2026-05-09', 750.00, 'transferencia', 3);
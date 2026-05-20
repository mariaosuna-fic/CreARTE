<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Profesor - CREARTE</title>

    <link rel="stylesheet" href="/css/clases.css">
</head>

<body class="admin-body">

<header class="navbar-admin">

    <div class="logo-container-admin">
        <img
            src="/assets/logo crearte azul.svg"
            alt="CREARTE"
            class="logo-admin"
        >
    </div>

    <a href="#" class="btn-logout" onclick="cerrarSesion()">
        Cerrar sesión ➔
    </a>

</header>

<div class="layout-container">

    <aside class="sidebar-admin">

        <nav class="sidebar-nav">

            <a href="/profesor-panel.html" class="sidebar-link active">
                Mis clases
            </a>

            <a href="#seccionAlumnos" class="sidebar-link">
                Alumnos
            </a>

            <a href="#seccionAsistencia" class="sidebar-link">
                Asistencia
            </a>

        </nav>

    </aside>

    <main class="main-content">

        <header class="content-header">

            <h1>
                Panel del Profesor
            </h1>

            <p>
                Consulta tus clases asignadas, horarios, salones y alumnos inscritos.
            </p>

        </header>

        <section class="dashboard-grid">

            <div class="dashboard-card">
                <h3>Clases asignadas</h3>
                <p id="totalClases">0</p>
            </div>

            <div class="dashboard-card">
                <h3>Alumnos inscritos</h3>
                <p id="totalAlumnos">0</p>
            </div>

            <div class="dashboard-card">
                <h3>Clases de hoy</h3>
                <p id="totalHoy">0</p>
            </div>

        </section>

        <section class="form-card">

            <h2>
                Seleccionar clase
            </h2>

            <div class="form-grid">

                <div class="form-group full-width">

                    <label for="claseSeleccionada">
                        Clase asignada
                    </label>

                    <select id="claseSeleccionada" required>

                        <option value="">
                            Selecciona una clase
                        </option>

                    </select>

                </div>

            </div>

        </section>

        <section class="table-section">

            <h3 class="table-title">
                Mis clases asignadas
            </h3>

            <div class="table-card">

                <table class="custom-table">

                    <thead>
                        <tr>
                            <th>Clase</th>
                            <th>Tipo</th>
                            <th>Nivel</th>
                            <th>Día</th>
                            <th>Horario</th>
                            <th>Salón</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody id="tablaMisClases">

                        <tr>
                            <td colspan="7">
                                Cargando clases asignadas...
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

        <section class="table-section" id="seccionAlumnos">

            <h3 class="table-title">
                Alumnos de la clase seleccionada
            </h3>

            <div class="table-card">

                <table class="custom-table">

                    <thead>
                        <tr>
                            <th>ID Alumno</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Matrícula</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>

                    <tbody id="tablaAlumnosClase">

                        <tr>
                            <td colspan="5">
                                Selecciona una clase para ver sus alumnos.
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

        <section class="form-section" id="seccionAsistencia">

            <div class="form-card">

                <h2>
                    Tomar asistencia
                </h2>

                <p class="admin-description">
                    Selecciona una clase y marca la asistencia de los alumnos inscritos.
                </p>

                <form id="formAsistencia" class="clase-form">

                    <div class="form-grid">

                        <div class="form-group">

                            <label for="fechaAsistencia">
                                Fecha
                            </label>

                            <input
                                type="date"
                                id="fechaAsistencia"
                                required
                            >

                        </div>

                    </div>

                    <div class="table-card">

                        <table class="custom-table">

                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Presente</th>
                                    <th>Ausente</th>
                                </tr>
                            </thead>

                            <tbody id="tablaAsistencia">

                                <tr>
                                    <td colspan="3">
                                        Selecciona una clase para tomar asistencia.
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <br>

                    <div class="form-buttons">

                        <button type="submit" class="btn-primary">
                            Guardar asistencia
                        </button>

                    </div>

                </form>

            </div>

        </section>

    </main>

</div>

<script src="/js/profesor-panel.js"></script>

</body>

</html> 
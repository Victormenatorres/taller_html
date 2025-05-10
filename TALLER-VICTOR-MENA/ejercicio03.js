const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let estudiantes = [];

function agregarEstudiante() {
    rl.question("Cédula: ", (cedula) => {
        rl.question("Nombres: ", (nombres) => {
            rl.question("Apellidos: ", (apellidos) => {
                rl.question("Programa académico: ", (programa) => {
                    rl.question("Materias (separadas por coma): ", (materiasInput) => {
                        rl.question("Promedio de nota: ", (promedioInput) => {
                            const nuevoEstudiante = {
                                cedula,
                                nombres,
                                apellidos,
                                programaAcademico: programa,
                                materias: materiasInput.split(",").map(m => m.trim()),
                                promedioNota: parseFloat(promedioInput)
                            };
                            estudiantes.push(nuevoEstudiante);
                            console.log("✅ Estudiante agregado correctamente.");
                            mostrarMenu();
                        });
                    });
                });
            });
        });
    });
}

function listarEstudiantes() {
    if (estudiantes.length === 0) {
        console.log("📭 No hay estudiantes registrados.");
    } else {
        const ordenados = [...estudiantes].sort((a, b) => a.apellidos.localeCompare(b.apellidos));
        console.log("📋 Lista de estudiantes:");
        ordenados.forEach(est => {
            console.log(`${est.apellidos}, ${est.nombres} - ${est.cedula}`);
        });
    }
    mostrarMenu();
}

function buscarPorCedula() {
    rl.question("Ingrese la cédula del estudiante: ", (cedula) => {
        const estudiante = estudiantes.find(est => est.cedula === cedula);
        if (estudiante) {
            console.log("🎓 Estudiante encontrado:");
            console.log(estudiante);
        } else {
            console.log("❌ No se encontró ningún estudiante con esa cédula.");
        }
        mostrarMenu();
    });
}

function actualizarEstudiante() {
    rl.question("Ingrese la cédula del estudiante a actualizar: ", (cedula) => {
        const index = estudiantes.findIndex(est => est.cedula === cedula);
        if (index === -1) {
            console.log("❌ Estudiante no encontrado.");
            mostrarMenu();
            return;
        }

        rl.question("Nuevo nombre: ", (nombres) => {
            rl.question("Nuevo apellido: ", (apellidos) => {
                rl.question("Nuevo programa académico: ", (programa) => {
                    rl.question("Nuevas materias (coma separadas): ", (materiasInput) => {
                        rl.question("Nuevo promedio: ", (promedioInput) => {
                            estudiantes[index] = {
                                cedula,
                                nombres,
                                apellidos,
                                programaAcademico: programa,
                                materias: materiasInput.split(",").map(m => m.trim()),
                                promedioNota: parseFloat(promedioInput)
                            };
                            console.log("✅ Estudiante actualizado.");
                            mostrarMenu();
                        });
                    });
                });
            });
        });
    });
}

function eliminarEstudiante() {
    rl.question("Ingrese la cédula del estudiante a eliminar: ", (cedula) => {
        const index = estudiantes.findIndex(est => est.cedula === cedula);
        if (index === -1) {
            console.log("❌ Estudiante no encontrado.");
        } else {
            estudiantes.splice(index, 1);
            console.log("🗑️ Estudiante eliminado correctamente.");
        }
        mostrarMenu();
    });
}

function mostrarMenu() {
    console.log(`
======= MENÚ =======
1. Agregar estudiante
2. Listar estudiantes
3. Buscar por cédula
4. Actualizar estudiante
5. Eliminar estudiante
6. Salir
====================
`);
    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarEstudiante();
                break;
            case '2':
                listarEstudiantes();
                break;
            case '3':
                buscarPorCedula();
                break;
            case '4':
                actualizarEstudiante();
                break;
            case '5':
                eliminarEstudiante();
                break;
            case '6':
                console.log("👋 Saliendo...");
                rl.close();
                break;
            default:
                console.log("❌ Opción no válida.");
                mostrarMenu();
        }
    });
}

// Iniciar
console.log(" sistema de estudiantes");
mostrarMenu();
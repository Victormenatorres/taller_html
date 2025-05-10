const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const libros = [];

function agregarLibro() {
    rl.question('Título: ', (titulo) => {
        rl.question('Autor: ', (autor) => {
            rl.question('Año de publicación: ', (anio) => {
                rl.question('ISBN: ', (isbn) => {
                    libros.push({
                        titulo,
                        autor,
                        anio: parseInt(anio),
                        isbn
                    });
                    console.log('✅ Libro agregado con éxito.');
                    mostrarMenu();
                });
            });
        });
    });
}

function listarLibros() {
    if (libros.length === 0) {
        console.log('📚 No hay libros registrados.');
    } else {
        console.log('\n📖 Lista de libros:');
        libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.anio}) - ISBN: ${libro.isbn}`);
        });
    }
    mostrarMenu();
}

function buscarLibro() {
    rl.question('Ingrese título o autor para buscar: ', (termino) => {
        const resultado = libros.filter(
            libro =>
            libro.titulo.toLowerCase().includes(termino.toLowerCase()) ||
            libro.autor.toLowerCase().includes(termino.toLowerCase())
        );

        if (resultado.length === 0) {
            console.log('🔍 No se encontraron libros con ese criterio.');
        } else {
            console.log('\n📘 Libros encontrados:');
            resultado.forEach(libro => {
                console.log(`${libro.titulo} - ${libro.autor} (${libro.anio}) - ISBN: ${libro.isbn}`);
            });
        }
        mostrarMenu();
    });
}

function mostrarMenu() {
    console.log('\n===== MENÚ =====');
    console.log('1. Agregar libro');
    console.log('2. Listar libros');
    console.log('3. Buscar libro');
    console.log('4. Salir');
    rl.question('Seleccione una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                agregarLibro();
                break;
            case '2':
                listarLibros();
                break;
            case '3':
                buscarLibro();
                break;
            case '4':
                console.log('👋 Saliendo...');
                rl.close();
                break;
            default:
                console.log('❌ Opción no válida.');
                mostrarMenu();
                break;
        }
    });
}

mostrarMenu();
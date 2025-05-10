const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [];

function mostrarMenu() {
    console.log(`
======== MENÚ DE INVENTARIO ========
1. Agregar producto
2. Actualizar stock
3. Listar productos
4. Salir
====================================
`);
    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                agregarProducto();
                break;
            case "2":
                actualizarStock();
                break;
            case "3":
                listarProductos();
                break;
            case "4":
                console.log("👋 Saliendo...");
                rl.close();
                break;
            default:
                console.log("❌ Opción inválida.");
                mostrarMenu();
        }
    });
}

function agregarProducto() {
    rl.question("Código del producto: ", (codigo) => {
        if (productos.find(p => p.codigo === codigo)) {
            console.log("⚠️ Ya existe un producto con ese código.");
            return mostrarMenu();
        }

        rl.question("Nombre del producto: ", (nombre) => {
            rl.question("Precio del producto: ", (precioInput) => {
                let precio = parseFloat(precioInput);
                if (isNaN(precio) || precio <= 0) {
                    console.log("❌ El precio debe ser un número positivo.");
                    return mostrarMenu();
                }

                rl.question("Stock disponible: ", (stockInput) => {
                    let stock = parseInt(stockInput);
                    if (isNaN(stock) || stock < 0) {
                        console.log("❌ El stock debe ser un número positivo o cero.");
                        return mostrarMenu();
                    }

                    let estado = stock > 0 ? "Disponible" : "Agotado";

                    productos.push({ codigo, nombre, precio, stock, estado });
                    console.log("✅ Producto agregado correctamente.");
                    mostrarMenu();
                });
            });
        });
    });
}

function actualizarStock() {
    rl.question("Código del producto a actualizar: ", (codigo) => {
        const producto = productos.find(p => p.codigo === codigo);
        if (!producto) {
            console.log("❌ Producto no encontrado.");
            return mostrarMenu();
        }

        rl.question("Nuevo stock: ", (stockInput) => {
            let nuevoStock = parseInt(stockInput);
            if (isNaN(nuevoStock) || nuevoStock < 0) {
                console.log("❌ Stock inválido.");
                return mostrarMenu();
            }

            producto.stock = nuevoStock;
            producto.estado = nuevoStock > 0 ? "Disponible" : "Agotado";
            console.log("🔁 Stock actualizado correctamente.");
            mostrarMenu();
        });
    });
}

function listarProductos() {
    if (productos.length === 0) {
        console.log("📭 No hay productos en el inventario.");
        return mostrarMenu();
    }

    let ordenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));
    console.log("\n📦 LISTA DE PRODUCTOS:");
    ordenados.forEach(p => {
        console.log(`- ${p.nombre} | Código: ${p.codigo} | Precio: $${p.precio} | Stock: ${p.stock} | Estado: ${p.estado}`);
    });
    mostrarMenu();
}

// Iniciar el programa
console.log("");
mostrarMenu();
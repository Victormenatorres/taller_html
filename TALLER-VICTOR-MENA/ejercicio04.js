const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const IVA = 0.19;
let productos = [];

function solicitarProducto() {
    rl.question("Ingrese el precio del producto: ", (precioInput) => {
        let precio = parseFloat(precioInput);
        if (isNaN(precio) || precio <= 0) {
            console.log("❌ El precio debe ser un número positivo.");
            return solicitarProducto();
        }

        rl.question("Ingrese la cantidad de unidades: ", (cantidadInput) => {
            let cantidad = parseInt(cantidadInput);
            if (isNaN(cantidad) || cantidad <= 0) {
                console.log("❌ La cantidad debe ser un número positivo.");
                return solicitarProducto();
            }

            let totalParcial = precio * cantidad;
            productos.push({ precio, cantidad, totalParcial });

            rl.question("¿Desea ingresar otro producto? (s/n): ", (respuesta) => {
                if (respuesta.toLowerCase() === "s") {
                    solicitarProducto();
                } else {
                    calcularTotales();
                    rl.close();
                }
            });
        });
    });
}

function calcularTotales() {
    let subtotal = productos.reduce((acc, prod) => acc + prod.totalParcial, 0);
    let iva = subtotal * IVA;
    let total = subtotal + iva;

    console.log("\n🧾 RESUMEN DE LA COMPRA");
    productos.forEach((prod, i) => {
        console.log(
            `Producto ${i + 1}: $${prod.precio.toFixed(2)} x ${prod.cantidad} = $${prod.totalParcial.toFixed(2)}`
        );
    });

    console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);
    console.log(`IVA (19%): $${iva.toFixed(2)}`);
    console.log(`Total a pagar: $${total.toFixed(2)}`);
}

// Iniciar
console.log("")
solicitarProducto();
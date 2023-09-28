// Saludo de Bienvenida
alert('¡Bienvenido a la Tienda de Zapatos y Carteras!');

// Array de objetos de productos
class Producto {
    constructor(codigo, producto, tipoDeProducto, precio) {
        this.codigo = codigo;
        this.producto = producto;
        this.tipoDeProducto = tipoDeProducto;
        this.precio = precio;
    }
}

const productos = [];
productos.push(new Producto(1, 'Stiletos', 'Zapatos', 50000));
productos.push(new Producto(2, 'Botas', 'Zapatos', 40000));
productos.push(new Producto(3, 'Zapatillas', 'Zapatos', 30000));
productos.push(new Producto(4, 'Borcegos', 'Zapatos', 45000));
productos.push(new Producto(5, 'Sandalias', 'Zapatos', 20000));
productos.push(new Producto(6, 'Bolso', 'Carteras', 70000));
productos.push(new Producto(7, 'Bandolera', 'Carteras', 20000));
productos.push(new Producto(8, 'Cartera', 'Carteras', 30000));
productos.push(new Producto(9, 'Mochila', 'Carteras', 45000));
productos.push(new Producto(10, 'Tote Bag', 'Carteras', 50000));

productos.forEach(producto => {
    producto.cantidad = 10; 
}); // (añadí las cantidades de productos para la próxima incluir el manejo del stock) 

console.log(productos);

// Array vacío para iniciar el Carrito de compras:
const carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(codigo) {
    const producto = productos.find(item => item.codigo === codigo);
    if (producto) {
        carrito.push(producto);
        alert(producto.producto + ' - $' + producto.precio + ' agregado al carrito.');
    } else {
        alert('Producto no encontrado');
    }
}

// Función para eliminar del carrito
function eliminarDelCarrito() {
    while(true) { 
        if (carrito.length === 0) {
            alert('El carrito está vacío. No hay productos para eliminar.');
            return;
        }

        let mensaje = 'Productos en el carrito:\n';

        for (let i = 0; i < carrito.length; i++) {
            mensaje += (i + 1) + '. ' + carrito[i].producto + ' - $' + carrito[i].precio + '\n';
        }

        mensaje += 'Ingrese el número del producto que desea eliminar o cancele para salir.';

        const eleccion = prompt(mensaje);

        if (eleccion === null) {
            return;
        }

        const indiceProducto = parseInt(eleccion) - 1;

        if (indiceProducto >= 0 && indiceProducto < carrito.length) {
            const productoEliminado = carrito.splice(indiceProducto, 1);
            alert(productoEliminado[0].producto + ' ha sido eliminado del carrito.');
        } else {
            alert('Opción no válida. Por favor, ingrese el número del producto que desea eliminar.');
        }
    }
}

// Función para buscar por nombre
function buscarPorNombre() { 
    while(true) { 
        const nombreBuscado = prompt('Ingrese el nombre del producto que desea buscar:');
        
        if (nombreBuscado === null) {
            return;
        }

        const productosEncontrados = productos.filter(producto => producto.producto.toLowerCase().includes(nombreBuscado.toLowerCase()));

        if (productosEncontrados.length === 0) {
            alert('No se encontraron productos con ese nombre.');
            continue;
        } else {
            while (true) {

                let mensaje = 'Productos disponibles (' + nombreBuscado + '):\n';
                mensaje += 'Ingrese "ordenar" para ordenar por precio de menor a mayor.\n';

                for (const productoEncontrado of productosEncontrados) {
                    mensaje += productoEncontrado.codigo + '. ' + productoEncontrado.producto + ' - $' + productoEncontrado.precio + '\n';
                }

                const eleccion = prompt(mensaje + '\nIngrese el número del producto que desea agregar al carrito o cancele para regresar a las opciones.');

                if (eleccion === 'ordenar' || eleccion === 'ORDENAR') {
                    productosEncontrados.sort((a, b) => a.precio - b.precio);
                    continue;
                }

                if (eleccion === null) {
                    return null;
                }

                const codigoProducto = parseInt(eleccion);

                if (codigoProducto || !Number(codigoProducto)) {
                    const productoSeleccionado = productosEncontrados.find(producto => producto.codigo === codigoProducto);

                    if (productoSeleccionado) {
                        agregarAlCarrito(codigoProducto);
                        return;
                    } else {
                        alert('Opción no válida. Por favor, ingrese el número de código del producto que desea agregar al carrito.');
                    }
                }
            }
        }
    }
}

// Función para vaciar el carrito
function vaciarCarrito () {
    carrito.length= 0;
}

// Función para mostrar el contenido del carrito y procesar el pago
function mostrarCarrito() {
    let mensaje = 'Carrito de compras:\n';
    let total = 0;

    for (const producto of carrito) {
        mensaje += producto.producto + ' - $' + producto.precio + '\n';
        total += producto.precio;
    }

    let confirmacion;

    while (true) {
        const cupon = prompt(
            mensaje + 'Total: $' + total + '\n\nIngrese "COMPRAR" para pagar o cancele para seguir comprando.\nSi tiene un cupón de descuento, ingréselo a continuación:'
            );

        if (cupon === null) {
            return null; 
        } else if (cupon === "DESCUENTO20") {
            const descuento = total * 0.2;
            total -= descuento;
            confirmacion = confirm(
                'Total con descuento del 20%: $' + total + '\n¿Desea proceder con la compra?'
            );
            break;
        } else if (cupon === 'comprar' || cupon === 'COMPRAR') {
            confirmacion = confirm(
                'Total: $' + total + '\n¿Desea proceder con la compra?'
            );
            break;
        } else {
            alert('Opción no válida. Inténte ingresar el cupón nuevamente o ingrese "COMPRAR" para proceder sin descuento.');
        }
    }

    if (confirmacion) {
        alert('Pago realizado con éxito. Gracias por su compra!');
        vaciarCarrito();
    } else {
        return null;
    }
}


// Función para mostrar los productos disponibles y obtener la elección del usuario
function mostrarProductos(vistaProductos) {

    let productosCopia = productos.map(elemento => elemento);

    while (true) {
        let mensaje = '';
        if (vistaProductos === 'Todos') {
            mensaje = 'Productos disponibles:\n';
        } else {
            mensaje = 'Productos disponibles (' + vistaProductos + '):\n';
        }

        mensaje += 'Ingrese "ordenar" para ordenar por precio\n';

        for (const producto of productosCopia) {
            if (vistaProductos === 'Todos' || producto.tipoDeProducto === vistaProductos) {
                mensaje += producto.codigo + '. ' + producto.producto + ' - $' + producto.precio + '\n';
            }
        }

        const eleccion = prompt(mensaje + '\nIngrese el número del producto que desea agregar al carrito o cancele para regresar a las opciones');

        if (eleccion === 'ordenar' || eleccion === 'ORDENAR') {
            productosCopia.sort((a, b) => a.precio - b.precio);
            continue;
        }

        if (eleccion === null) {
            return null;
        }

        const codigoProducto = parseInt(eleccion);
        if (Number(codigoProducto) && codigoProducto >= 1 && codigoProducto <= 10) {
            return codigoProducto;
        } else {
            alert('Opción no válida. Por favor, ingrese el número de la opción deseada');
        }
    }
}

// Función principal para iniciar el simulador
function iniciar() {
    while (true) {

        let opciones = 'Ingrese el número de la opción deseada:\n1. Ver todos los Productos\n2. Ver Zapatos\n3. Ver Carteras\n4. Buscar producto por nombre.';

        if (carrito.length > 0) {
            opciones += '\n5. Ver carrito\n6. Eliminar del carrito';
        }

        const vistaProductos = prompt(opciones);

        if (vistaProductos === null) {
            const decision = confirm('¿Desea salir de la tienda?');
            if (decision) {
                alert('Gracias por visitarnos.');
                break;
            } else {
                continue;
            }
        }

        let tipoDeProducto;

        switch (vistaProductos) {
            case 'todos':
            case '1':
                tipoDeProducto = 'Todos';
                break;
            case 'zapatos':
            case '2':
                tipoDeProducto = 'Zapatos';
                break;
            case 'carteras':
            case '3':
                tipoDeProducto = 'Carteras';
                break;
            case 'buscar por nombre':
            case '4':
                buscarPorNombre();
                continue;
            case 'ver carrito':
            case '5':
                mostrarCarrito();
                continue;
            case 'eliminar del carrito':
            case '6':
                eliminarDelCarrito();
                continue;
            default:
                alert('Opción no válida. Por favor, ingrese el número de la opción deseada.');
                continue;
        }

        const codigoProducto = mostrarProductos(tipoDeProducto);

        if (codigoProducto === null) {
            continue;
        }

        if (codigoProducto) {
            agregarAlCarrito(codigoProducto);
        } else if (codigoProducto === 'Ver carrito') {
            mostrarCarrito();
            continue;
        } else {
            alert('Opción no válida. Por favor, ingrese el número de la opción deseada.');
        }
    }
}

// Llamado a la función principal para iniciar el simulador
iniciar();
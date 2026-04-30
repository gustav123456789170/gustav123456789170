/**
 * productosData.js
 * ──────────────────────────────────────────────────────────────
 * Datos de los productos de la semana.
 * Edita este archivo cada semana para actualizar el menú.
 *
 * CAMPOS DE CADA PRODUCTO:
 *   id          → identificador único (NO cambiar nunca)
 *   nombre      → nombre visible del producto
 *   precio      → precio en dólares (número)
 *   imagen      → nombre del archivo de imagen en esta carpeta
 *   descripcion → texto que se muestra en la página de detalle
 *   stock       → ★ CANTIDAD DISPONIBLE AL INICIO DE LA SEMANA ★
 *                 Google Sheets lo irá descontando con cada pedido web.
 *                 Para pedidos manuales: descuenta en la hoja "Stock".
 *                 Si pones 0, la tarjeta aparece como "Agotado".
 *
 * PARA QUITAR UN PRODUCTO DEL MENÚ: deja nombre y imagen vacíos.
 * ──────────────────────────────────────────────────────────────
 */

const productosSemana = [
  {
    id: '1',
    nombre: 'Berlinesa de Caramelo',
    precio: 1.00,
    imagen: 'Berlinesas_Caramelo.png',
    descripcion: 'Berlinesa esponjosa rellena de crema de caramelo artesanal, cubierta con azúcar glass. Horneada fresca cada mañana.',
    stock: 20   // ← EDITAR: cuántas hay disponibles esta semana
  },
  {
    id: '2',
    nombre: 'Berlinesa de Leche',
    precio: 1.00,
    imagen: 'Berlinesas_Leche.png',
    descripcion: 'Berlinesa esponjosa rellena de crema de leche artesanal, cubierta con azúcar glass. Horneada fresca cada mañana.',
    stock: 20   // ← EDITAR: cuántas hay disponibles esta semana
  },
  {
    id: '3',
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    stock: 0
  },
  {
    id: '4',
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    stock: 0
  }
];

/**
 * Devuelve los productos que tienen nombre, precio > 0 e imagen.
 * Los agotados (stock:0) SÍ se incluyen para mostrar el badge.
 */
function obtenerProductosDisponibles() {
  return productosSemana.filter(p =>
    p.nombre && p.nombre.trim() !== '' &&
    p.precio > 0 &&
    p.imagen && p.imagen.trim() !== ''
  );
}

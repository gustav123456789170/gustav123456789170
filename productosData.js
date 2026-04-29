/**
 * productosData.js
 * ──────────────────────────────────────────────────────────────
 * Datos de los productos de la semana.
 * El dueño edita este archivo manualmente cada semana.
 *
 * Cada posición (máximo 4) tiene:
 *   id          → identificador único (no cambiar)
 *   nombre      → nombre del producto (dejar vacío si no hay producto esta semana)
 *   precio      → precio en números (dejar 0 si no hay producto)
 *   imagen      → URL de la imagen (dejar vacío si no hay producto)
 *   descripcion → descripción del producto que se muestra en la ficha (opcional)
 *
 * Si nombre está vacío, precio es 0 o imagen está vacía,
 * la tarjeta NO se muestra en el catálogo.
 * ──────────────────────────────────────────────────────────────
 */

const productosSemana = [
  {
    id: '1',
    nombre: 'Berlinesa de Caramelo',
    precio: 1.00,
    imagen: 'Berlinesas_Caramelo.png',
    descripcion: 'Berlinesa esponjosa rellena de crema de caramelo artesanal, cubierta con azúcar glass. Horneada fresca cada mañana.'
  },
  {
    id: '2',
    nombre: 'Berlinesa de Leche',
    precio: 1.00,
    imagen: 'Berlinesas_Leche.png',
    descripcion: 'Berlinesa esponjosa rellena de crema de leche artesanal, cubierta con azúcar glass. Horneada fresca cada mañana.'
  },
  {
    id: '3',
    nombre: '',   // ← Dejar vacío si no hay producto esta semana
    precio: 0,
    imagen: '',
    descripcion: ''
  },
  {
    id: '4',
    nombre: '',   // ← Dejar vacío si no hay producto esta semana
    precio: 0,
    imagen: '',
    descripcion: ''
  }
];


/**
 * Devuelve únicamente los productos que tienen:
 *  - nombre no vacío
 *  - precio mayor que 0
 *  - imagen no vacía
 *
 * Se usa en catalogo.html para renderizar las tarjetas.
 * @returns {Array} Productos válidos para mostrar.
 */
function obtenerProductosDisponibles() {
  return productosSemana.filter(p =>
    p.nombre && p.nombre.trim() !== '' &&
    p.precio > 0 &&
    p.imagen && p.imagen.trim() !== ''
  );
}
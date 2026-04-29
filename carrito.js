/**
 * carrito.js
 * Lógica compartida del carrito para toda la aplicación.
 */

const CARRITO_KEY = 'carrito_postres';

function escHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCarrito() {
  try {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function addToCarrito({ id, nombre, precio, cantidad, descripcion }) {
  const carrito = getCarrito();
  const desc = (descripcion || '').trim();
  const idStr = String(id);

  const idx = carrito.findIndex(
    p => String(p.id) === idStr && (p.descripcion || '').trim() === desc
  );

  if (idx >= 0) {
    carrito[idx].cantidad += Number(cantidad);
  } else {
    carrito.push({
      id: idStr,
      nombre: nombre,
      precio: parseFloat(precio),
      cantidad: Number(cantidad),
      descripcion: desc
    });
  }
  saveCarrito(carrito);
}

function removeFromCarrito(id, descripcion) {
  const idStr = String(id);
  const desc = (descripcion || '').trim();
  let carrito = getCarrito();
  carrito = carrito.filter(
    p => !(String(p.id) === idStr && (p.descripcion || '').trim() === desc)
  );
  saveCarrito(carrito);
}

function clearCarrito() {
  localStorage.removeItem(CARRITO_KEY);
}

function getTotalCarrito(carrito) {
  return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function initPanelCarrito() {
  if (!document.getElementById('panel-carrito')) {
    const panel = document.createElement('div');
    panel.id = 'panel-carrito';
    panel.className = 'panel-carrito';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Tu pedido actual');

    panel.innerHTML = `
      <div class="panel-header">
        <h3 class="panel-titulo">Tu pedido actual</h3>
        <button class="btn-cancelar-todo" id="btn-cancelar-todo" title="Eliminar todo el pedido">✕ Cancelar todo</button>
      </div>
      <ul class="panel-lista" id="panel-lista" aria-live="polite"></ul>
      <div class="panel-footer">
        <span class="panel-total" id="panel-total">Total: $0.00</span>
        <button class="btn-pagar" id="btn-pagar">Pagar 💳</button>
      </div>
    `;

    document.body.appendChild(panel);

    document.getElementById('btn-cancelar-todo').addEventListener('click', () => {
      if (confirm('¿Seguro que quieres cancelar todo el pedido?')) {
        clearCarrito();
        actualizarPanel();
      }
    });

    document.getElementById('btn-pagar').addEventListener('click', () => {
      window.location.href = 'resumen_pedido.html';
    });
  }

  actualizarPanel();
  window.addEventListener('storage', (e) => {
    if (e.key === CARRITO_KEY) actualizarPanel();
  });
}

function actualizarPanel() {
  const panel = document.getElementById('panel-carrito');
  if (!panel) return;

  const carrito = getCarrito();

  if (!carrito || carrito.length === 0) {
    panel.style.display = 'none';
    document.body.style.paddingBottom = '';
    return;
  }

  panel.style.display = 'flex';
  document.body.style.paddingBottom = '260px';

  const lista = document.getElementById('panel-lista');
  lista.innerHTML = '';

  carrito.forEach((item, index) => {
    const subtotal = (item.precio * item.cantidad).toFixed(2);
    const li = document.createElement('li');
    li.className = 'panel-item';
    li.innerHTML = `
      <div class="panel-item-info">
        <span class="panel-item-nombre">${escHTML(item.nombre)}</span>
        ${item.descripcion ? `<span class="panel-item-nota">📝 ${escHTML(item.descripcion)}</span>` : ''}
        <span class="panel-item-detalle">${item.cantidad} × $${item.precio.toFixed(2)} = <strong>$${subtotal}</strong></span>
      </div>
      <button class="btn-eliminar-item" data-index="${index}" title="Eliminar ${escHTML(item.nombre)}">✕</button>
    `;
    lista.appendChild(li);
  });

  lista.querySelectorAll('.btn-eliminar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      const carritoActual = getCarrito();
      const item = carritoActual[idx];
      if (item) {
        removeFromCarrito(item.id, item.descripcion);
        actualizarPanel();
      }
    });
  });

  const total = getTotalCarrito(carrito);
  document.getElementById('panel-total').textContent = `Total: $${total.toFixed(2)}`;
}
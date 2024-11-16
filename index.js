console.log('hola mundo')
const form = document.getElementById('product-form')
const cartTableBody = document.querySelector('#cart-table tbody')
const cartTotal = document.getElementById('cart-total')
let products = []

// Funcion para renderizar los productos en la tabla
const renderCart = () => {
  cartTableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr')
    row.innerHTML =  `
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>$${(product.price * product.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-edit" data-index="${index}" >Editar</button>
        <button class="btn btn-delete" data-index="${index}" >Eliminar</button>
      </td>
    `;
    cartTableBody.appendChild(row)
  })
  updateTotal()
} 




// Función para agregar un producto
const addProduct = (event) => {
  event.preventDefault();
  const name = document.getElementById('product-name').value.trim()
  const price = parseFloat(document.getElementById('product-price').value)
  const quantity = parseFloat(document.getElementById('product-quantity').value)
  console.log(name && price > 0 && quantity > 0)
  if (name && price > 0 && quantity > 0) {
    products.push({ name, price, quantity })
    renderCart();
    form.reset(); //Limpiar formulario
  }
}

function updateTotal() {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// borrar producto

const deleteProduct = (index) => {
  console.log(index)
  products.splice(index, 1)
  renderCart()
}

// Función para editar un producto
function editProduct(index) {
  const product = products[index];
  const newName = prompt('Nuevo nombre:', product.name);
  const newPrice = parseFloat(prompt('Nuevo precio:', product.price));
  const newQuantity = parseInt(prompt('Nueva cantidad:', product.quantity));

  if (newName && newPrice > 0 && newQuantity > 0) {
    products[index] = { name: newName, price: newPrice, quantity: newQuantity };
    renderCart();
  }
}

form.addEventListener('submit', addProduct)

cartTableBody.addEventListener('click', (event) => {
  const index = event.target.dataset.index;

  if (event.target.classList.contains('btn-delete')) {
    deleteProduct(index);
  } else if (event.target.classList.contains('btn-edit')) {
    editProduct(index);
  }
});



// Inicializar
renderCart();
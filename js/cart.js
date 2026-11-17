
// Actualiza o muestra los productos del carrito de compras
function handleAddToCart() {

   const articles = JSON.parse(localStorage.getItem('shoppingCard')) || [];
   const counts = JSON.parse(localStorage.getItem('productCount')) || 0;
   let precioTotal = 0; // Tenia definido el precio total como const por eso era el error
   const carrito = document.getElementById('item-products');

   if (counts == 0) {
      carrito.innerHTML = '<p>El carrito está vacío</p>';
      return;
   }

   const tabla = document.createElement('table');

   tabla.classList.add('name-class');

   let encabezado = `
            <thead>
               <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>Precio</th>
               </tr>
            </thead>
   `;

   let cuerpo = '<tbody>';

   articles.forEach( article => {
      cuerpo += `
         <tr>
            <td>${article.count}</td>
            <td>${article.title}</td>
            <td>$${article.price}</td>
         </tr>
      `
      precioTotal += article.price * article.count;
   });

   cuerpo += '</tbody>';

   let pie = `
            <tfoot>
               <tr>
                  <th colspan="3">Total: $ ${precioTotal.toFixed(2)}</th>
               </tr>
            </tfoot>
   `;

   tabla.innerHTML = encabezado + cuerpo + pie;
   carrito.appendChild(tabla);
}


document.addEventListener('DOMContentLoaded', () => {
   handleAddToCart();
});















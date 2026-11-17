const articles = JSON.parse(localStorage.getItem('shoppingCard')) || [];
const counts = JSON.parse(localStorage.getItem('productCount')) || 0;
let countP = parseInt(counts);

function updateCount() {
   document.querySelector('#count').textContent = countP !== 0 ? countP : '';
}

updateCount();

const cardArticles = document.querySelectorAll('.product-card');

cardArticles.forEach(product => {

   const btnAdd = product.querySelector('.product-button');

   // Antes: product.addEventListener(...)  ->  ahora solo escucha el botón
   btnAdd.addEventListener('click', () => {

      const productTitle = product.querySelector('.product-title').textContent;
      const productPrice = product.querySelector('.product-price span:last-child').textContent;

      const productData = {
         title: productTitle,
         price: productPrice,
         count: 1
      };

      const existingItem = articles.find(item => item.title === productData.title);

      if (existingItem) {
         existingItem.count += 1;
      } else {
         articles.push(productData);
      }

      countP += 1;
      updateCount();
      localStorage.setItem('shoppingCard', JSON.stringify(articles));
      localStorage.setItem('productCount', JSON.stringify(countP));
   });

});



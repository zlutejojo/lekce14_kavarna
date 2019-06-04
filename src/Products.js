export default class Products {

  constructor(dataStore, order) {
    this.dataStore = dataStore;
    this.order = order;
  }

  render() {
    let html = '';

    this.dataStore.categories.forEach(category => {

      html += `<h2 class="products__category">${ category.name }</h2>`;

      html += `<div class="products__list">`;

      this.dataStore.products
        .filter(product => product.category_id === category.id)
        .forEach(product => {
          html += this.getProductHTML(product);
        });

      html += `</div>`;

    });

    document.querySelector('#products').innerHTML = html;

    const buttons = document.querySelectorAll('button[data-product]');

    for(let button of buttons) {
      button.addEventListener('click', (e) => {
        let id = e.target.dataset.product;
        this.order.add(id);
      });
    }


  }


  getProductHTML(product) {
    return `
      <div class="product">
        <div class="product__image">
          <img src="images/${ product.picture }" alt="${ product.name }">
        </div>
        <div class="product__body">
          <div class="product__content">
            <h3 class="product__name">${ product.name }</h3>
            <p class="product__desc">
            ${ product.description }
            </p>
          </div>
          <div class="product__order">
            <div class="product__price">
            ${ product.price } Kč
            </div>
            <div class="product__order-button">
              <button class="button button--primary" data-product="${ product.id }">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

}
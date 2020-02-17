export default class Order {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }


  add(id) {
    this.dataStore.order[id] = this.dataStore.order[id] + 1 || 1;
    this.update();
  }

  remove(id) {
    this.dataStore.order[id]--;
    if(this.dataStore.order[id] === 0) {
      delete this.dataStore.order[id]
    }
    this.update();
  }




  update() {
    let html = '';
    for(let id in this.dataStore.order) {
      let produkt = this.dataStore.getProductById(id);

      html += `<div class="order__item" data-id="${id}">
      <div class="order__item-name">${this.dataStore.order[id]}× ${produkt.name}</div>
      <button class="count-button count-button--plus">+</button>
      <button class="count-button count-button--minus">-</button>
    </div>`
      console.log( ' Produkt ' + produkt.name + ': ' + this.dataStore.order[id] + 'x');
    }

    

    if(html === '') {
      document.querySelector('#order').innerHTML = `<p class="order__empty">
      Vaše objednávka je zatím prázdná :(
      </p>`;
    document.querySelector('#order-btn').classList.add('hidden');

    }else {
      document.querySelector('#order').innerHTML = html;
      let plusBtn = document.querySelectorAll('.count-button--plus');
    // forEach nepoužijeme, protože ten querySelector nevrací list, ale 
    for (let button of plusBtn) {
      button.addEventListener('click', (e) => {
        //ja hledam rodiče toho buttonu, které ma ten dataset
        //let id = e.target.parentNode.dataset['id'];
        let id = e.target.closest('[data-id]').dataset['id'];
        console.log(id);
        this.add (id);
      })
    }

    let minusBtn = document.querySelectorAll('.count-button--minus');
    for (let button of minusBtn) {
      button.addEventListener('click', (e) => {
        //ja hledam rodiče toho buttonu, které ma ten dataset
        //let id = e.target.parentNode.dataset['id'];
        let id = e.target.closest('[data-id]').dataset['id'];
        console.log(id);
        this.remove(id);
      })
    }

    document.querySelector('#order-btn').classList.remove('hidden');
    }
  }

  send() {
    this.dataStore.sendOrder()
    .then(() => {
      alert('odeslana');
      this.dataStore.order ={};
      this.update();

    })
    .catch(() => {
      console.error('nepodarilo se');
    });
    
  }




}


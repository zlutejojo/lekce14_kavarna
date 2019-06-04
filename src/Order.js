export default class Order {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }


  add(id) {
    this.dataStore.order[id] = this.dataStore.order[id] + 1 || 1;
    this.update();
  }

  update() {
    for(let id in this.dataStore.order) {
      let produkt = this.dataStore.getProductById(id);
      console.log( ' Produkt ' + produkt.name + ': ' + this.dataStore.order[id] + 'x');
    }
  }
}


const API_NAME = 'XXXXX';
const API_BASE = `https://czechitas.twoways.cz/api/${API_NAME}`;

export default class DataStore {
  constructor() {
    this.categories = [];
    this.products = [];
    this.order = {};
  }

  async loadData() {
    await Promise.all([
      this.getCategories(),
      this.getProducts()
    ]);
  }

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const data = await response.json();
      this.categories = data;
    } catch {
      console.error('Nepovedlo se načíst kategorie');
    }
  }

  async getProducts() {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      this.products = data;
    } catch {
      console.error('Nepovedlo se načíst produkty');
    }
  }

  getProductById(id) {
    return this.products.find(product => product.id == id);
  }
}

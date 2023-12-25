import data from 'products.json' 

const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.lastId = 0;

    try {
      const data = fs.readFileSync(this.path, 'utf8');
      if (data) {
        this.products = JSON.parse(data);

        const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        this.lastId = maxId;
      }
    } catch (err) {
      
    }
  }

  addProduct(productData) {
    this.lastId += 1;
    const newProduct = {
      id: this.lastId,
      ...productData,
    };
    this.products.push(newProduct);
    this.saveToFile();
    return newProduct;
  }

  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }

  updateProduct(productId, updatedData) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedData };
      this.saveToFile();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveToFile();
      return true;
    }
    return false;
  }

  getAllProducts() {
    return this.products;
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }
}

const productManager = new ProductManager('products.json');

const newProduct = {
  title: 'Product 1',
  description: 'Description of Product 1',
  price: 19.99,
  thumbnail: 'path/to/image1.jpg',
  code: 'ABC123',
  stock: 10,
};

productManager.addProduct(newProduct);

const allProducts = productManager.getAllProducts();
console.log('All products:', allProducts);

const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log('Found product:', foundProduct);

const productIdToUpdate = 1;
const updatedData = {
  price: 24.99,
  stock: 15,
};
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedData);
console.log('Updated product:', updatedProduct);

const productIdToDelete = 1;
const isDeleted = productManager.deleteProduct(productIdToDelete);
console.log('Is product deleted?', isDeleted);
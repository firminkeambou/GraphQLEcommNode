// Sample data for products called model
// In a real application, this data would come from a database
//assuming products come from in-memory array or database
let products = [
  {
    id: 'redShoe',
    description: 'Red fancy shoe',
    price: 12.99,
    reviews: [],
  },
  {
    id: 'blueShoe',
    description: 'Blue fancy shoe',
    price: 15.99,
    reviews: [],
  },
];

const getAllProducts = async () => {
  //context can be used for authentication, information to pass down to other resolvers, info contains query details
  console.log('Getting products list...');
  //let simulate a promise to fetch data from a database
  const product = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 5000);
  });
  return product;
};

const getProductsByPrice = async (min, max) => {
  console.log(`Getting products with price between ${min} and ${max}...`);
  const product = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        products.filter(
          (product) => product.price >= min && product.price <= max
        )
      );
    }, 5000);
  });
  return product;
};
//find always returns the first match, bear that in mind in case of multiple products with same ID
const getProductByID = async (id) => {
  console.log(`Getting product with ID ${id}...`);
  const product = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products.find((product) => product.id === id));
    }, 1000);
  });
  return product;
};
const addNewProduct = (id, description, price) => {
  const newProduct = { id, description, price, reviews: [] };
  products.push(newProduct);
  console.log('lentgh of the model', products.length);
  return newProduct;
};

//first implementation by me that works with time O(n)
const addNewProductReview = (id, rating, comment) => {
  let newProduct;
  //const newReview = { rating, comment };
  //console.log('review to update', newReview);
  const updatedProducts = products.map((product) => {
    // Check for the object to update
    if (product.id === id) {
      // Return a *new* object with the updated property

      newProduct = {
        ...product,
        reviews: [...product.reviews, { rating, comment }],
      };
      console.log('new product detected', newProduct);
      return newProduct;
    }
    // Otherwise, return the original object
    return product;
  });
  products = updatedProducts;
  console.log('products', products);
  return newProduct;
};
//second implementation, mutation of the original array
// as find and filter does not create new references
const addNewProductReview2 = async (id, rating, comment) => {
  const matchedProduct = await getProductByID(id);
  if (matchedProduct) {
    matchedProduct.reviews.push({ rating, comment });
    return matchedProduct;
  }
};
// console.log('products', products);

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductByID,
  addNewProduct,
  addNewProductReview,
};

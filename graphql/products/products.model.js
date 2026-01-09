// Sample data for products called model
// In a real application, this data would come from a database
//assuming products come from in-memory array or database
const products = [
  {
    id: 'redShoe',
    description: 'Red fancy shoe',
    price: 12.99,
  },
  {
    id: 'blueShoe',
    description: 'Blue fancy shoe',
    price: 15.99,
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
    }, 5000);
  });
  return product;
};

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductByID,
};

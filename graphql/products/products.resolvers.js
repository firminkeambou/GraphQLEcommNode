const productsModel = require('./products.model');

module.exports = {
  Query: {
    products: () => productsModel.getAllProducts(),
    productsByPrice: (_, args) =>
      productsModel.getProductsByPrice(args.min, args.max), //args contains the arguments passed to the query, "_" is the parent which we don't use here, but we keep it for convention
    productByID: (_, args) => productsModel.getProductByID(args.id), //args contains the arguments passed to the query, "_" is the parent which we don't use here, but we keep it for convention
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productsModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (_, args) => {
      return productsModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
};

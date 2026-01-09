// Sample data for orders called model
const orders = [
  {
    id: 'order1',
    date: '2023-01-01',
    subtotal: 41.97,
    items: [
      {
        product: {
          id: 'redShoe',
          description: 'Red old fancy shoe',
        },
        quantity: 2,
        price: 12.99,
      },
      {
        product: { id: 'blueShoe', description: 'Blue old fancy shoe' },
        quantity: 1,
        price: 15.99,
      },
    ],
  },
];

const getAllOrders = () => {
  //context can be used for authentication, information to pass down to other resolvers, info contains query details
  console.log('Getting orders list...');
  return orders;
};

module.exports = {
  getAllOrders,
};

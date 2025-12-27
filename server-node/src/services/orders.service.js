const { elastic } = require('../config/elastic');

const ORDERS_INDEX = 'orders';

async function saveOrder(order) {
  const response = await elastic.index({
    index: ORDERS_INDEX,
    document: {
      ...order,
      createdAt: new Date().toISOString(),
    },
  });

  const id = response?._id || response?.body?._id; // תאימות לגרסאות שונות
  return { id };
}

module.exports = { saveOrder, ORDERS_INDEX };

const { saveOrder } = require('../services/orders.service');

async function createOrder(req, res) {
  try {
    const { fullName, address, email, cart } = req.body;

    if (!fullName || !address || !email || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).send({ error: 'Missing or invalid fields' });
    }

    const result = await saveOrder({ fullName, address, email, cart });

    return res.status(201).send({
      message: 'Order saved',
      id: result.id,
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).send({ error: 'Failed to save order', details: err.message });
  }
}

module.exports = { createOrder };

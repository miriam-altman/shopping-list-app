const express = require('express');
const cors = require('cors');

function createApp() {
  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }));

  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.status(200).send({ ok: true, service: 'order-api' });
  });

  const ordersRoutes = require('./routes/orders.routes');
app.use('/api', ordersRoutes);


  return app;
}

module.exports = { createApp };

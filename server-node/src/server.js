require('dotenv').config();
const { createApp } = require('./app');

const PORT = Number(process.env.PORT) || 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Order server running on port ${PORT}`);
});

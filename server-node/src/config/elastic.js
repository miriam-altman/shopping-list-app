const { Client } = require('@elastic/elasticsearch');

const elastic = new Client({
  node: process.env.ELASTIC_NODE || 'http://localhost:9200',
});

module.exports = { elastic };

exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    port: 8081,
    database: {
      name: process.env.NODE_API_DB_NAME_TEST
    }
  }
};

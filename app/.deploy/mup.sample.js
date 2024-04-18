module.exports = {
  servers: {
    one: {
      host: 'shop-manoa.com',
      username: 'root',
      password: '24shopManoa'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'Shop-Manoa',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://shop-manoa.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  mongo: { version: '5.0', servers: { one: {} }
  },
  proxy: {
    domains: 'shop-manoa.com',
    ssl: {
      letsEncryptEmail: 'latoyac@hawaii.edu',
      forceSSL: true
    }
  },
};

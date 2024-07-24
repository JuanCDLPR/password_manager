module.exports = {
  apps: [
    {
      name: "PMF",
      script: "./server.js",
      //watch: true, creo que es como un nodemodules para pm2
      env_prod: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      env_dev: {
        NODE_ENV: "development",
        PORT: 3021,
      },
    },
  ],
};

// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "start",
      cwd: "./apps/app",
      env: {
        NODE_ENV: "production",
        API_URL: "http://89.116.51.219:3333",
      },
    },
    {
      name: "api",
      script: "npm",
      args: "start",
      cwd: "./apps/api",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

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
        API_URL: "https://api.fantasycraft.io",
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

// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "start -H 0.0.0.0",
      cwd: "./apps/app",
      env: {
        NODE_ENV: "production",
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

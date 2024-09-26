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
        NEXTAUTH_URL: "https://fantasycraft.io",
        PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK: "true",
      },
    },
  ],
};

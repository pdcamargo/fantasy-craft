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
        NEXTAUTH_SECRET: "secret",
        DATABASE_URL:
          "postgresql://postgres:JJM2h33@@89.116.51.219:5432/fantasycraft",
        PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK: "true",
      },
    },
  ],
};

// PM2 process definition for the production server (`pm2 start ecosystem.config.cjs`).
module.exports = {
  apps: [
    {
      name: 'wedding-invitation',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      // A single process on purpose: the guestbook rate limiter lives in memory
      // and SQLite works best with one writer process.
      exec_mode: 'fork',
      instances: 1,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        // Outside the release directory so redeploys never wipe signatures.
        GUESTBOOK_DB_PATH: '/var/lib/wedding-invitation/guestbook.db'
      }
    }
  ]
};

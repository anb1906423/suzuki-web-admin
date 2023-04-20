module.exports = {
    apps : [{
      name: 'nextjs-app',
      script: 'npm',
      args: 'start -- --port 4000',
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  }
  
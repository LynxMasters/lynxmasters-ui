'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: '"http://localhost:8081/api/v1"',
  TWITTER_URL: '"http://localhost:8081/api/v1/auth/twitter?token="',
  TWITCH_URL: '"http://localhost:8081/api/v1/auth/twitch?token="',
  REDDIT_URL: '"http://localhost:8081/api/v1/auth/reddit?token="'

})

'use strict'

const fp = require('fastify-plugin')
const amqpClient = require('amqplib/callback_api')

function getTarget ({
  frameMax,
  heartbeat,
  hostname,
  locale,
  password,
  port,
  url,
  username,
  vhost
}) {
  if (url) {
    return url
  } else if (hostname) {
    return {
      frameMax,
      heartbeat,
      hostname,
      locale,
      password,
      port,
      username,
      vhost
    }
  } else {
    throw new Error('`url` parameter is mandatory if no hostname is provided')
  }
}

function fastifyAmqp (fastify, options, next) {
  amqpClient.connect(getTarget(options), options.socket, function (err, connection) {
    if (err) {
      next(err)
      return
    }
    fastify.addHook('onClose', () => connection.close())
    fastify.decorate('amqpConn', connection)

    connection.createChannel(function (err1, channel) {
      if (err1) {
        next(err1)
        return
      }

      fastify.decorate('amqpChannel', channel)
      next()
    })
  })
}

module.exports = fp(fastifyAmqp, {
  fastify: '>=1.0.0',
  name: 'fastify-amqp'
})

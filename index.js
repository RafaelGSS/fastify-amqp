'use strict'

const fp = require('fastify-plugin')
const amqpClient = require('amqplib')

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

async function fastifyAmqp (fastify, options) {
  const connection = await amqpClient.connect(getTarget(options), options.socket)
  fastify.addHook('onClose', () => connection.close())

  const channel = await connection.createChannel()

  fastify.decorate('amqp', {
    connection,
    channel
  })
}

module.exports = fp(fastifyAmqp, {
  fastify: '>=1.0.0',
  name: 'fastify-amqp'
})

'use strict'

const fp = require('fastify-plugin')
const amqpClient = require('amqplib/callback_api')

function fastifyAmqp (fastify, opts, next) {
  const host = opts.host

  if (!host) {
    next(new Error('`host` parameter is mandatory'))
    return
  }
  const protocol = opts.protocol || 'amqp'
  const port = opts.port || 5672
  const user = opts.user || 'guest'
  const pass = opts.pass || 'guest'
  const timeout = opts.timeout || 10000

  amqpClient.connect(`${protocol}://${user}:${pass}@${host}:${port}`, { timeout }, function (err, connection) {
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

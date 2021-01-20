const Fastify = require('fastify')

const app = Fastify({ logger: true })

app.register(require('../../index'), {
  hostname: 'localhost'
}).ready(function (err) {
  if (err) throw err

  if (!app.hasDecorator('amqp')) {
    throw new Error('Undefined error with connection.')
  }

  app.amqp.channel.assertQueue('')
})

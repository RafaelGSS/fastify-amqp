const Fastify = require('fastify')

const app = Fastify()

app.register(require('fastify-amqp'), {
  hostname: 'localhost'
}).after(function (err) {
  if (err) throw err

  if (!app.hasDecorator('amqp')) {
    throw new Error('Undefined error with connection.')
  }

  app.amqp.channel.assertQueue('')
})

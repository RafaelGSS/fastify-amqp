const { test } = require('tap')

const Fastify = require('fastify')
const fastifyAmqp = require('./index')

const PORT_OK = 5672
const HOST_OK = 'localhost'
const HOST_INVALID = '1234'
const PROTOCOL_OK = 'amqp'

test('undefined connection', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {}).ready(err => {
    t.equal(typeof err, typeof {})
    t.assert(err instanceof Error)

    t.notOk(app.amqp, 'Should not have amqp decorator')
  })
})

test('invalid connection', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_INVALID,
    socket: {
      timeout: 10000
    }
  }).ready(err => {
    t.equal(typeof err, typeof {})
    t.assert(err instanceof Error)

    t.notOk(app.amqp, 'Should not have amqp decorator')
  })
})

test('connection ok without send port', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_OK
  }).ready(err => {
    t.error(err)
    t.ok(app.amqp.connection)
    t.ok(app.amqp.channel)
  })
})

test('connection object', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_OK,
    port: PORT_OK
  }).ready(err => {
    t.error(err)
    t.ok(app.amqp.connection)
    t.ok(app.amqp.channel)
  })
})

test('connection url', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    url: `${PROTOCOL_OK}://${HOST_OK}:${PORT_OK}`
  }).ready(err => {
    t.error(err)
    t.ok(app.amqp.connection)
    t.ok(app.amqp.channel)
  })
})

test('connection with protocol ok', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_OK,
    protocol: PROTOCOL_OK
  }).ready(err => {
    t.error(err)
    t.ok(app.amqp.connection)
    t.ok(app.amqp.channel)
  })
})

function build (t) {
  const app = Fastify()

  t.teardown(app.close.bind(app))

  return app
}

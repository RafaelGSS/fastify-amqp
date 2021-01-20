const { test } = require('tap')

const Fastify = require('fastify')
const fastifyAmqp = require('./index')

const PORT_OK = 5672
const HOST_OK = 'localhost'
const HOST_INVALID = '1234'
const PROTOCOL_OK = 'amqp'

test('undefined connection', t => {
  t.plan(4)
  const app = build(t)

  app.register(fastifyAmqp, {}).ready(err => {
    t.equal(typeof err, typeof {})
    t.assert(err instanceof Error)

    t.notOk(app.amqpConn, 'Should not has amqpConn')
    t.notOk(app.amqpChannel, 'Should not has amqpChannel')
  })
})

test('invalid connection', t => {
  t.plan(4)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_INVALID
  }).ready(err => {
    t.equal(typeof err, typeof {})
    t.assert(err instanceof Error)

    t.notOk(app.amqpConn, 'Should not has amqpConn')
    t.notOk(app.amqpChannel, 'Should not has amqpChannel')
  })
})

test('connection ok without send port', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_OK
  }).ready(err => {
    t.error(err)
    t.ok(app.amqpConn)
    t.ok(app.amqpChannel)
  })
})

test('connection ok', t => {
  t.plan(3)
  const app = build(t)

  app.register(fastifyAmqp, {
    hostname: HOST_OK,
    port: PORT_OK
  }).ready(err => {
    t.error(err)
    t.ok(app.amqpConn)
    t.ok(app.amqpChannel)
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
    t.ok(app.amqpConn)
    t.ok(app.amqpChannel)
  })
})

function build (t) {
  const app = Fastify()

  t.teardown(app.close.bind(app))

  return app
}

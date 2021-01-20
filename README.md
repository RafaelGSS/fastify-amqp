# fastify-amqp
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
![CI workflow](https://github.com/RafaelGSS/fastify-amqp/workflows/CI%20workflow/badge.svg?branch=master)

Fastify AMQP connection plugin wrapper to amqplib, to use with RabbitMQ

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install fastify-amqp --save
```

## Tests

```sh
npm install
npm test
```

## Usage

```js
const fastify = require('fastify')()

fastify.register(require('fastify-amqp'), {
  // the default value is amqp
  protocol: 'amqp',
  hostname: 'localhost',
  // the default value is 5672
  port: 5672,
  // the default value is guest
  username: 'guest',
  // the default value is guest
  password: 'guest'
  // the default value is empty
  vhost: ''
})

fastify.get('/', function (request, reply) {
  const channel = this.amqp.channel

  const queue = 'hello'
  const msg = 'Hello world'

  channel.assertQueue(queue, {
    durable: false
  })
  
  channel.sendToQueue(queue, Buffer.from(msg))
  reply.send(' [x] Sent ' + msg)
})

fastify.listen(3000, err => {
  if (err) throw err
})
```

## Reference

This plugin is just a wrapper to [amqplib](https://github.com/squaremo/amqp.node).

Contains:

- `amqp.connection` API to [here](http://www.squaremobius.net/amqp.node/channel_api.html#api_reference)
- `amqp.channel` API to [here](http://www.squaremobius.net/amqp.node/channel_api.html#channel)

## Dependencies

- [amqplib](https://ghub.io/amqplib): An AMQP 0-9-1 (e.g., RabbitMQ) library and client.
- [fastify-plugin](https://ghub.io/fastify-plugin): Plugin helper for Fastify

## Dev Dependencies

- [fastify](https://ghub.io/fastify): Fast and low overhead web framework, for Node.js
- [pre-commit](https://ghub.io/pre-commit): Automatically install pre-commit hooks for your npm modules.
- [standard](https://ghub.io/standard): JavaScript Standard Style
- [tap](https://ghub.io/tap): A Test-Anything-Protocol library for JavaScript
- [typescript](https://ghub.io/typescript): TypeScript is a language for application scale JavaScript development

## License

MIT

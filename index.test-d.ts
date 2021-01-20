import fastify from 'fastify';
import fastifyAmqp from '../fastify-amqp';

const app = fastify();

app.register(fastifyAmqp, { hostname: 'localhost' }).after((_err) => {
  const amqp = app.amqp.connection;
  const amqpChannel = app.amqp.channel;
})
